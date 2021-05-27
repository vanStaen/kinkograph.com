const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const router = express.Router();
const { Client } = require("pg");

const resizeImage = require("../helpers/resizeImage");
const uploadFileFromUrlToS3 = require("../helpers/uploadFileFromUrlToS3");
const deleteLocalFile = require("../helpers/deleteLocalFile");


// Init Postgres
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres 
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  }
})

// Limits size of 10MB
const sizeLimits = { fileSize: 1024 * 1024 * 10 };

// Allow only JPG and PNG
const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    console.log("Wrong format!");
    callback(null, true);
  }
};

// Setup the AWS
AWS.config.region = "eu-west-1";
AWS.config.signatureVersion = "v4";

// Define s3 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID,
});

// Define upload function as Single upload of 'file' to s3
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_ID,
    acl: "public-read",
  }),
  limits: sizeLimits,
  fileFilter: fileFilter,
}).single("file");

// POST single file object to s3
router.post(
  "/",
  (req, res) => {
    uploadS3(req, res, async (error) => {
      if (error) {
        console.log("Upload s3, error: ", error);
        res.json({ error: error });
      } else {
        // If File not found
        if (req.file === undefined) {
          res.json({ Error: "No File Selected" });
        } else {
          const imageOriginalName = req.file.originalname.split('.')[0];
          const imageOriginalType = req.file.originalname.split('.')[1];
          const imageUrl = req.file.location;
          const nameImageThumb = "t_" + req.file.key;
          const nameImageMedium = "m_" + req.file.key;
          // If file, upload to S3
          try {
            const [thumbUrlLocal, mediumUrlLocal] = await Promise.all([
              resizeImage(imageUrl, nameImageThumb, 240, 60),
              resizeImage(imageUrl, nameImageMedium, 750, 60),
            ]);
            const [UrlThumbS3, UrlMediumbS3] = await Promise.all([
              uploadFileFromUrlToS3(thumbUrlLocal, nameImageThumb),
              uploadFileFromUrlToS3(mediumUrlLocal, nameImageMedium),
            ]);
            // Delete locally stored files
            await Promise.all([
              deleteLocalFile(nameImageMedium),
              deleteLocalFile(nameImageThumb),
            ]);

            // Add picture to db: 
            const createQuery = `INSERT INTO pictures (url_original, url_thumb, url_med, original_name, original_type) VALUES ('${imageUrl}', '${UrlThumbS3}', '${UrlMediumbS3}', '${imageOriginalName}', '${imageOriginalType}');`;
            await client.query(createQuery);

            // Return file name and file url to client
            return res.status(200).json({
              message: "Upload success!",
              imageOriginalName: imageOriginalName,
              imageOriginalType: imageOriginalType,
              imageUrl: imageUrl,
              thumbUrl: UrlThumbS3,
              mediumUrl: UrlMediumbS3,
            });
          }
          catch (err) {
            console.log(err);
            return res.status(400).json({ error: err });
          };
        }
      }
    });
  }
);

// DELETE single file object from s3 (based on key)
router.delete("/:id", async (req, res) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: req.params.id
    };
    const paramsThumb = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: "t_" + req.params.id,
    };
    await Promise.all([
      s3.deleteObject(params, function (err, data) { }),
      s3.deleteObject(paramsThumb, function (err, data) { }),
    ]);
    const deleteUser = `DELETE FROM pictures WHERE id='${req.picId}';`;
    await client.query(deleteUser);
    res.status(200).json({ success: `User with id #${req.userId} was deleted.` });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});


// GET all pictures
router.get("/all/", async (req, res) => {
  try {
    const pictures = await client.query(`SELECT * FROM pictures`);
    res.status(201).json(pictures.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});


// POST, check if a picture is already in db
router.post("/duplicate/", async (req, res) => {
  const filter = `WHERE original_name='${req.body.name}'`;
  try {
    const pictures = await client.query(`SELECT * FROM pictures ${filter}`);
    res.status(201).json(pictures.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// GET all pictures
router.get("/tagsmissing/:limit", async (req, res) => {
  try {
    const pictures = await client.query(`SELECT * FROM pictures WHERE tags_missing=true LIMIT ${req.params.limit} `);
    res.status(201).json(pictures.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});


module.exports = router;
