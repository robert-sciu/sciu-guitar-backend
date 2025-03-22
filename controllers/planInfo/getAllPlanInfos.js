const logger = require("../../utilities/logger");
const responses = require("../../config/serverResponses");
const planInfoService = require("./planInfoService");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");

async function getAllPlanInfos(req, res) {
  const language = req.language;
  try {
    const planInfos = await planInfoService.getAllPlanInfos();
    return handleSuccessResponse(res, responses.statusCodes.ok, planInfos);
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = getAllPlanInfos;
