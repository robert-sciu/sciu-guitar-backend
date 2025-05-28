const sharp = require("sharp");
const compressionTypesConfig =
  require("../config/config")[process.env.NODE_ENV].pageImagesCompressionTypes;

class ImageCompressor {
  constructor(sharp) {
    this.sharp = sharp;
  }

  async compressImage({ image, compressionParams }) {
    const imageBuffer = image.buffer;
    const compressedImageBuffer = await this.sharp(imageBuffer)
      .resize(compressionParams)
      .webp()
      .toBuffer();
    const compressedImage = { ...image, buffer: compressedImageBuffer };
    return compressedImage;
  }
}

const imageCompressor = new ImageCompressor(sharp);

module.exports = imageCompressor;
