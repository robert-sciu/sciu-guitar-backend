const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");

const logger = require("../../utilities/logger");
const userTaskService = require("./userTaskService");
const responses = require("../../config/serverResponses");

async function getUserTasks(req, res) {
  const language = req.language;
  const userId = req.user.id;
  try {
    const completedTasks = await userTaskService.getUserTasks({
      userId,
      language,
      showCompleted: true,
    });

    return handleSuccessResponse(res, responses.statusCodes.ok, completedTasks);
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = getUserTasks;
