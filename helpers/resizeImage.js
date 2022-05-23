const Jimp = require("jimp");

const resizeImage = async (originalImageUrl, randomName, size, quality) => {
  const tempPath = "./public/uploads/";
  const tempURL = tempPath + randomName;

  try {
    const image = await Jimp.read(originalImageUrl);
    if (image.bitmap.width > image.bitmap.length) {
      await image.rotate(270);
    }
    await image
      .resize(size, Jimp.AUTO, Jimp.RESIZE_BILINEAR)
      .quality(quality)
      .writeAsync(tempURL);
  } catch (err) {
    console.error(err);
  }

  return tempURL;
};

module.exports = resizeImage;
