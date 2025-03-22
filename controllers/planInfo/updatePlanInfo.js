const logger = require("../../utilities/logger");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");

const planInfoService = require("./planInfoService");
const responses = require("../../config/serverResponses");

async function updatePlanInfo(req, res) {
  const language = req.language;
  const userId = req.id;
  let updateData = planInfoService.destructurePlanInfoUpdateData({
    data: req.body,
  });

  try {
    const planInfo = await planInfoService.getPlanInfo({ userId });

    if (updateData.lessonBalance !== undefined) {
      updateData.lessonBalance =
        Number(planInfo.lessonBalance) + Number(updateData.lessonBalance);
    }

    await planInfoService.updatePlanInfo({
      userId,
      updateData,
    });

    return handleSuccessResponse(
      res,
      responses.statusCodes.ok,
      responses.messages.updateSuccess[language]
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

module.exports = updatePlanInfo;
