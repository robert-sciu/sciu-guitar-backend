const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const userTaskService = require("./userTaskService");
const responses = require("../../config/serverResponses");

async function deleteUserTask(req, res, next) {
  const language = req.language;
  const userTaskId = req.id;
  const userId = req.user.id;

  try {
    const userTask = await userTaskService.findUserTaskById({
      userTaskId,
    });
    if (!userTask || userTask.userId !== userId) {
      return handleErrorResponse(
        res,
        responses.statusCodes.notFound,
        responses.errors.userTasks.userTaskNotFound[language]
      );
    }
    await userTaskService.deleteUserTask({ userTaskId });
    return handleSuccessResponse(
      res,
      responses.statusCodes.noContent,
      responses.messages.userTasks.userTasksDeleted[language]
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

module.exports = deleteUserTask;
