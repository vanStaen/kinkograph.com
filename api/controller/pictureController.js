const router = require('express').Router()

const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const { pictureService } = require('../service/pictureService')
const resizeImage = require('../../helpers/resizeImage')
const uploadFileFromUrlToS3 = require('../../helpers/uploadFileFromUrlToS3')
const deleteLocalFile = require('../../helpers/deleteLocalFile')
const createFingerPrintImage = require('../../helpers/createFingerPrintImage')

// Limits size of 10MB
const sizeLimits = { fileSize: 1024 * 1024 * 10 }

// Allow only JPG and PNG
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    //console.log("Wrong format!");
    callback(null, false)
  }
}

// Setup the AWS
AWS.config.region = 'eu-west-1'
AWS.config.signatureVersion = 'v4'

// Define s3 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID
})

// Define upload function as Single upload of 'file' to s3
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_ID,
    acl: 'public-read'
  }),
  limits: sizeLimits,
  fileFilter: fileFilter
}).single('file')

// POST single file object to s3
router.post('/', (req, res) => {
  if (!req.isAdmin) {
    res.status(401).json({
      error: 'You do not have administrator rights.'
    })
    return
  }
  if (!req.isAuth) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return
  }
  uploadS3(req, res, async error => {
    if (error) {
      console.log('Upload s3, error: ', error)
      res.json({ error: error })
    } else {
      // If File not found
      if (req.file === undefined) {
        res.json({ Error: 'No File Selected' })
      } else {
        const imageOriginalName = req.file.originalname.split('.')[0]
        const imageOriginalType = req.file.originalname.split('.')[1]
        const imageUrl = req.file.location
        const nameImageThumb = 't_' + req.file.key
        const nameImageMedium = 'm_' + req.file.key
        const key = req.file.key
        // If file, upload to S3
        try {
          const [thumbUrlLocal, mediumUrlLocal] = await Promise.all([
            resizeImage(imageUrl, nameImageThumb, 240, 60),
            resizeImage(imageUrl, nameImageMedium, 750, 60)
          ])
          const [UrlThumbS3, UrlMediumbS3] = await Promise.all([
            uploadFileFromUrlToS3(thumbUrlLocal, nameImageThumb),
            uploadFileFromUrlToS3(mediumUrlLocal, nameImageMedium)
          ])
          // Delete locally stored files
          await Promise.all([
            deleteLocalFile(nameImageMedium),
            deleteLocalFile(nameImageThumb)
          ])

          // Add picture to db:
          await pictureService.addPicture(
            imageUrl,
            UrlThumbS3,
            UrlMediumbS3,
            imageOriginalName,
            imageOriginalType,
            key
          )

          // Return file name and file url to client
          return res.status(200).json({
            message: 'Upload success!',
            key: key,
            imageOriginalName: imageOriginalName,
            imageOriginalType: imageOriginalType,
            imageUrl: imageUrl,
            thumbUrl: UrlThumbS3,
            mediumUrl: UrlMediumbS3
          })
        } catch (err) {
          console.log(err)
          return res.status(400).json({ error: err })
        }
      }
    }
  })
})

// DELETE single file object from s3 (based on key)
router.delete('/:key', async (req, res) => {
  if (!req.isAdmin) {
    res.status(401).json({
      error: 'You do not have administrator rights.'
    })
    return
  }
  if (!req.isAuth) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return
  }
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: req.params.key
    }
    const paramsThumb = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: 't_' + req.params.key
    }
    const paramsMedium = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: 'm_' + req.params.key
    }
    await Promise.all([
      s3.deleteObject(params, function (err, data) {
        //if (err) console.log(err, err.stack);  // error
        //else     console.log(data);            // deleted
      }),
      s3.deleteObject(paramsThumb, function (err, data) {
        //if (err) console.log(err, err.stack);  // error
        //else     console.log(data);            // deleted
      }),
      s3.deleteObject(paramsMedium, function (err, data) {
        //if (err) console.log(err, err.stack);  // error
        //else     console.log(data);            // deleted
      })
    ])

    // Delete picture from DB
    await pictureService.deletePicture(req.params.key)

    // Response
    res
      .status(200)
      .json({ success: `Picture with key #${req.params.key} was deleted.` })
  } catch (err) {
    res.status(400).json({
      error: `${err}`
    })
  }
})

// GET all pictures
router.get('/all/:limit/:showMissing', async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return
  }
  try {
    const pictures = await pictureService.getPictures(
      req.params.showMissing,
      req.params.limit,
      0,
      null,
      'DESC'
    )

    // Generate and Store fingerprint if missing
    /* pictures.forEach(async (picture) => {
      if (picture.fingerprint === null) {
        const fingerprint = await createFingerPrintImage(picture.url_original);
        await pictureService.patchPictureFingerprintById(
          picture.id,
          fingerprint
        );
      }
    }); */

    res.status(201).json(pictures)
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// POST all pictures, with pagination and filter
router.post('/page/', async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return
  }
  try {
    const pageNumber = req.body.pageNumber
    const pageSize = req.body.pageSize
    const offSet = pageSize * (pageNumber - 1)
    let filters = ''
    if (req.body.filter) {
      const array = req.body.filter
      array.forEach(
        filter => (filters = filters + `AND tags LIKE '%"${filter}"%' `)
      )
    }
    const pictures = await pictureService.getPictures(
      false,
      pageSize,
      offSet,
      req.body.filter,
      'DESC'
    )
    res.status(201).json(pictures)
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// POST: Get Total of pictures, with filter
router.post('/total/', async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return
  }
  try {
    let filters = ''
    if (req.body.filter) {
      const array = req.body.filter
      array.forEach(
        filter => (filters = filters + `AND tags LIKE '%"${filter}"%' `)
      )
    }
    const count = await pictureService.countPictures(false, null)
    res.status(201).json(count)
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// POST, check if a picture is already in db
router.post('/duplicate/', async (req, res) => {
  if (!req.isAdmin) {
    res.status(401).json({
      error: 'You do not have administrator rights.'
    })
    return
  }
  try {
    const picture = await pictureService.getPictureByName(req.body.name)
    if (picture) {
      res.status(201).json(picture)
    } else {
      res.status(201).json([])
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// POST duplicate of an image based on its fingerprint
router.post('/duplicate/fingerprint/', async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return
  }
  try {
    const fingerprint = await pictureService.getPicturesByFingerPrint(
      req.body.id,
      req.body.fingerprint
    )
    res.status(201).json(fingerprint)
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// POST duplicate of an image based on its fingerprint
router.post('/similar/fingerprint/', async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return
  }
  try {
    const result = await pictureService.getSimilarPicturesByFingerPrint(
      req.body.id,
      req.body.fingerprint,
      req.body.threshold,
    )
    res.status(201).json(result)
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// GET all pictures with missing tag
router.get('/tagsmissing/:limit', async (req, res) => {
  if (!req.isAdmin) {
    res.status(401).json({
      error: 'You do not have administrator rights.'
    })
    return
  }
  try {
    const pictures = await pictureService.getPictures(
      true,
      req.params.limit,
      null,
      null,
      'DESC'
    )
    res.status(201).json(pictures)
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// GET COUNT all pictures with missing tag
router.get('/tagsmissingcount/', async (req, res) => {
  if (!req.isAdmin) {
    res.status(401).json({
      error: 'You do not have administrator rights.'
    })
    return
  }
  try {
    const count = await pictureService.countPictures(true, null)
    res.status(201).json(count)
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// PATCH picture based on ID
router.patch('/:id', async (req, res) => {
  if (!req.isAdmin) {
    res.status(401).json({
      error: 'You do not have administrator rights.'
    })
    return
  }
  try {
    await pictureService.patchPictureById(req.params.id, req.body.tags)
    res.status(201).json(`Picture with id #${req.params.id} was udpated`)
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// PATCH picture based on ID
router.patch('/isAdult/:id', async (req, res) => {
  if (!req.isAdmin) {
    res.status(401).json({
      error: 'You do not have administrator rights.'
    })
    return
  }
  try {
    await pictureService.patchPictureAdultContentById(
      req.params.id,
      req.body.isAdult
    )
    res.status(201).json(`Picture with id #${req.params.id} was udpated`)
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// GET picture based on key
router.get('/:key', async (req, res) => {
  try {
    const picture = await pictureService.getPictureByKey(req.params.key)
    if (picture) {
      res.status(201).json(picture)
    } else {
      res.status(400).json({
        error: `No picture found with key ${req.params.key}!`
      })
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// GET picture based on id
router.get('/id/:id', async (req, res) => {
  try {
    const picture = await pictureService.getPictureById(req.params.id)
    if (picture) {
      res.status(201).json(picture)
    } else {
      res.status(400).json({
        error: `No picture found with key ${req.params.id}!`
      })
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// POST: Get all of favorites pictures
router.post('/favorites/', async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return
  }
  try {
    const pictures = await pictureService.getFavoritePictureById(
      req.body.favorites
    )
    res.status(201).json(pictures)
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

// Post fingerprint of an image based on its URL
router.post('/fingerprint/', async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return
  }
  try {
    const fingerprint = await createFingerPrintImage(req.body.url)
    res.status(201).json(fingerprint)
  } catch (err) {
    res.status(400).json({
      error: `${err})`
    })
  }
})

module.exports = router
