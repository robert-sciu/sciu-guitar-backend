const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const tasksService = require("./tasksService");
const commonService = require("../services/commonService");
const responses = require("../../config/serverResponses");

async function createTask(req, res) {
  const language = req.language;
  let data = tasksService.destructureTaskData({
    data: JSON.parse(req.body.JSON),
  });

  const transaction = await commonService.getTransaction();

  try {
    const { taskData, file } = tasksService.prepareTaskAndFileData({
      data,
      file: req.file,
    });

    if (await tasksService.isTaskTitleInDatabase({ task: data })) {
      await transaction.rollback();
      return handleErrorResponse(
        res,
        responses.statusCodes.conflict,
        responses.errors.task.taskAlreadyExists[language]
      );
    }

    await tasksService.createTask({
      data: taskData,
      transaction,
    });

    await tasksService.uploadFileToS3({ file });

    await transaction.commit();

    return handleSuccessResponse(
      res,
      responses.statusCodes.created,
      responses.messages.task.taskCreated[language]
    );
  } catch (error) {
    await transaction.rollback();
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError
    );
  }
}

module.exports = createTask;
