const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const userTaskService = require("./userTaskService");
const responses = require("../../config/serverResponses");

async function createUserTask(req, res) {
  const language = req.language;
  const userId = req.user.id;
  const taskId = req.id;
  const data = { taskId, userId };
  try {
    if (!(await userTaskService.findTaskById({ taskId }))) {
      return handleErrorResponse(
        res,
        responses.statusCodes.notFound,
        responses.errors.task.taskNotFound[language]
      );
    }
    if (
      await userTaskService.findUserTask({
        userId,
        taskId,
      })
    ) {
      return handleErrorResponse(
        res,
        responses.statusCodes.conflict,
        responses.errors.userTasks.userTaskAlreadyExists[language]
      );
    }

    await userTaskService.createUserTask({ data });

    return handleSuccessResponse(
      res,
      responses.statusCodes.created,
      responses.messages.userTasks.userTasksCreated[language]
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

module.exports = createUserTask;
