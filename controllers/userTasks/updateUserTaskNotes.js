const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const userTaskService = require("./userTaskService");
const responses = require("../../config/serverResponses");

async function updateUserTaskNotes(req, res) {
  const language = req.language;
  userId = req.user.id;
  const userTaskId = req.id;

  const updateData = userTaskService.destructureUpdateUserTaskNotesData({
    data: req.body,
  });
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
    await userTaskService.updateUserTask({
      userTaskId,
      updateData,
    });

    return handleSuccessResponse(
      res,
      responses.statusCodes.ok,
      responses.messages.userTasks.userTasksUpdated[language]
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

module.exports = updateUserTaskNotes;
