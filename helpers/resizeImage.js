const Jimp = require('jimp');

const resizeImage = async (originalImageUrl, randomName, size, quality) => {

    const tempPath = './public/uploads/';
    const tempURL = tempPath + randomName;

    const url = await Jimp.read(originalImageUrl)
        .then(image => {
            if (image.bitmap.width > image.bitmap.length) {image.rotate(270)}
            image
                .resize(size, Jimp.AUTO, Jimp.RESIZE_BILINEAR)
                .quality(quality)
                .writeAsync(tempURL)
            return tempURL;
        })
        .catch(err => {
            console.error(err);
        });

    return url;
}

module.exports = resizeImage;