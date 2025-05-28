const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const planInfoService = require("./planInfoService");
const responses = require("../../config/serverResponses");

async function getPlanInfo(req, res) {
  const language = req.language;
  const userId = req.user.id;
  try {
    const planInfo = await planInfoService.getPlanInfo({ userId });

    return handleSuccessResponse(res, responses.statusCodes.ok, planInfo);
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = getPlanInfo;
