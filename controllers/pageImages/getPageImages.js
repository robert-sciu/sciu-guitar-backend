const { PageImage } = require("../../models").sequelize.models;
const logger = require("../../utilities/logger");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");
const responses = require("../../config/serverResponses");
const pageImagesService = require("./pageImagesService");

async function getPageImages(req, res) {
  const language = req.language;
  try {
    const pageImages = await pageImagesService.getAllPageImages();
    return handleSuccessResponse(res, responses.statusCodes.ok, pageImages);
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = getPageImages;
