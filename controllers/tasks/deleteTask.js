const responses = require("../../config/serverResponses");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const commonService = require("../services/commonService");
const tasksService = require("./tasksService");

async function deleteTask(req, res) {
  const language = req.language;
  const id = req.id;

  const transaction = await commonService.getTransaction();
  try {
    // need to find task to get filepath from it
    const task = (await tasksService.findTaskById({ id })).dataValues;

    if (!task) {
      return handleErrorResponse(
        res,
        responses.statusCodes.notFound,
        responses.errors.task.taskNotFound[language]
      );
    }

    await tasksService.deleteTask({ id, transaction });
    await tasksService.deleteFileFromS3({ filepath: task.filepath });

    await transaction.commit();

    return handleSuccessResponse(
      res,
      responses.statusCodes.noContent,
      responses.messages.task.taskDeleted[language]
    );
  } catch (error) {
    await transaction.rollback();
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = deleteTask;
