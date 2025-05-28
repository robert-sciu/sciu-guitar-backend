const responses = require("../../config/serverResponses");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const pageImagesService = require("./pageImagesService");

async function deletePageImage(req, res) {
  const language = req.language;
  const id = req.id;
  try {
    const pageImage = await pageImagesService.findPageImageById({ id });

    await pageImagesService.deletePageImage({ id });

    await pageImagesService.deletePageImageFiles({ pageImage });

    return handleSuccessResponse(
      res,
      responses.statusCodes.noContent,
      responses.messages.pageImage.pageImageDeleted[language]
    );
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = deletePageImage;
