const { PageImage } = require("../../models").sequelize.models;
const {
  findAllRecords,
  createRecord,
  findRecordByPk,
  deleteRecord,
  findRecordByValue,
} = require("../../utilities/sequelizeUtilities");
const s3Manager = require("../../services/s3Manager");
const imageCompressor = require("../../services/imageCompressor");
const { destructureData } = require("../../utilities/serviceUtilities");
const config = require("../../config/config")[process.env.NODE_ENV];

class PageImagesService {
  constructor() {
    this._pageImagesPaths = {
      desktop: config.s3Paths.dektopQualityImgPath,
      mobile: config.s3Paths.mobileQualityImgPath,
      lazy: config.s3Paths.lazyQualityImgPath,
    };
  }

  get pageImagesPaths() {
    return this._pageImagesPaths;
  }

  async preparePageImageData({ data, file }) {
    const getFilepathForQuality = (quality, filename) => {
      return `${this.pageImagesPaths[quality]}/${filename}`;
    };
    const uniqueFilename = `${data.role}-${data.imageName}-${new Date()
      .toISOString()
      .slice(0, -5)}`;
    const fileUpdated = { ...file, originalname: uniqueFilename };

    const filepathDesktop = getFilepathForQuality("desktop", uniqueFilename);
    const filepathMobile = getFilepathForQuality("mobile", uniqueFilename);
    const filepathLazy = getFilepathForQuality("lazy", uniqueFilename);

    const pageImageData = {
      imageName: data.imageName,
      role: data.role,
      filepathDesktop,
      filepathMobile,
      filepathLazy,
    };

    const compressionConfig =
      config.imageCompressionParams[
        config.imageCompressionParamsMappingsForRole[data.role]
      ];

    if (!compressionConfig) {
      throw new Error("Compression config not found");
    }

    const files = {
      desktopFile: {
        ...(await imageCompressor.compressImage({
          image: fileUpdated,
          compressionParams: compressionConfig.desktop,
        })),
        filepath: filepathDesktop,
      },

      mobileFile: {
        ...(await imageCompressor.compressImage({
          image: fileUpdated,
          compressionParams: compressionConfig.mobile,
        })),
        filepath: filepathMobile,
      },
      lazyFile: {
        ...(await imageCompressor.compressImage({
          image: fileUpdated,
          compressionParams: compressionConfig.lazy,
        })),
        filepath: filepathLazy,
      },
    };
    return { pageImageData, files };
  }

  async createPageImage({ data, transaction }) {
    return await createRecord({ model: PageImage, data, transaction });
  }

  async uploadCompressedImagesToS3({ files }) {
    const { desktopFile, mobileFile, lazyFile } = files;
    return await Promise.all(
      [desktopFile, mobileFile, lazyFile].map(async (file) => {
        await s3Manager.uploadFileToS3({
          file: file,
        });
      })
    );
  }

  async findPageImageById({ id }) {
    return await findRecordByPk({ model: PageImage, id });
  }

  async deletePageImage({ id }) {
    return await deleteRecord({ model: PageImage, id });
  }

  async findPageImageByName({ imageName, transaction }) {
    return await findRecordByValue({
      model: PageImage,
      imageName,
      transaction,
    });
  }

  async getAllPageImages() {
    const pageImages = await findAllRecords({ model: PageImage });
    await Promise.all(
      pageImages.map(async (image) => {
        [image.filepathDesktop, image.filepathMobile, image.filepathLazy] =
          await Promise.all([
            s3Manager.getSignedUrlFromS3({ filepath: image.filepathDesktop }),
            s3Manager.getSignedUrlFromS3({ filepath: image.filepathMobile }),
            s3Manager.getSignedUrlFromS3({ filepath: image.filepathLazy }),
          ]);
      })
    );
    return pageImages;
  }

  async deletePageImageFiles({ pageImage }) {
    const { filepathDesktop, filepathMobile, filepathLazy } = pageImage;
    await Promise.all([
      s3Manager.deleteFileFromS3({ filepath: filepathDesktop }),
      s3Manager.deleteFileFromS3({ filepath: filepathMobile }),
      s3Manager.deleteFileFromS3({ filepath: filepathLazy }),
    ]);
  }

  destructurePageImageData({ data }) {
    return destructureData({ data, keys: ["imageName", "role"] });
  }
}

const pageImagesService = new PageImagesService();

module.exports = pageImagesService;
