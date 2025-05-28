const responses = require("../../config/serverResponses");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const pageTextsService = require("./pageTextsService");

async function getPageTexts(req, res) {
  const language = req.language;
  try {
    const pageTexts = pageTextsService.getPageTexts();
    return handleSuccessResponse(
      res,
      responses.statusCodes.ok,
      pageTexts[language]
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

module.exports = getPageTexts;
