const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");
const pageImagesService = require("./pageImagesService");
const commonService = require("../services/commonService");
const logger = require("../../utilities/logger");
const responses = require("../../config/serverResponses");

async function createPageImage(req, res) {
  const language = req.language;
  const transaction = await commonService.getTransaction();
  const data = pageImagesService.destructurePageImageData({
    data: JSON.parse(req.body.JSON),
  });

  try {
    if (
      await pageImagesService.findPageImageByName({
        imageName: data.imageName,
        transaction,
      })
    ) {
      await transaction.rollback();
      return handleErrorResponse(
        res,
        responses.statusCodes.conflict,
        responses.errors.pageImages.pageImageAlreadyExists[language]
      );
    }
    const { pageImageData, files } =
      await pageImagesService.preparePageImageData({
        data,
        file: req.file,
      });

    await pageImagesService.createPageImage({
      data: pageImageData,
      transaction,
    });

    await pageImagesService.uploadCompressedImagesToS3({
      files,
    });

    await transaction.commit();
    return handleSuccessResponse(
      res,
      responses.statusCodes.created,
      responses.messages.pageImage.pageImageCreated[language]
    );
  } catch (error) {
    await transaction.rollback();
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = createPageImage;
