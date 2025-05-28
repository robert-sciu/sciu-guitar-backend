const logger = require("../../utilities/logger");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const pageTextsService = require("./pageTextsService");
const responses = require("../../config/serverResponses");

async function updatePageText(req, res) {
  const language = req.language;
  const data = pageTextsService.destructureUpdatePageTextData({
    data: req.body,
  });
  if (!pageTextsService.isTextRoleValid({ role: data.role })) {
    return handleErrorResponse(
      res,
      responses.statusCodes.conflict,
      responses.errors.pageTexts.invalidRole[language]
    );
  }
  try {
    const pageTexts = pageTextsService.getPageTexts();
    const textsUpdate = pageTextsService.formatTextsUpdate({ data });
    const updatedTexts = pageTextsService.mergeUpdateWithCurrentTexts({
      pageTexts,
      textsUpdate,
    });
    pageTextsService.updatePageTexts({ data: updatedTexts });
    return handleSuccessResponse(
      res,
      responses.statusCodes.ok,
      responses.messages.pageTexts.pageTextsUpdated[language]
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

module.exports = updatePageText;
