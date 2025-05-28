const responses = require("../../config/serverResponses");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const commonService = require("../services/commonService");
const tasksService = require("./tasksService");

async function updateTask(req, res) {
  const language = req.language;
  const id = req.id;
  let updateData = tasksService.destructureTaskData({
    data: JSON.parse(req.body.JSON),
  });

  const transaction = await commonService.getTransaction();

  try {
    const { taskData: updateDataFormatted, file } =
      tasksService.prepareTaskAndFileData({
        data: updateData,
        file: req.file,
      });

    const previousTaskData = (await tasksService.findTaskById({ id }))
      .dataValues;

    if (
      await tasksService.isTitleConflict({
        previousTaskData: previousTaskData,
        updateData: updateDataFormatted,
      })
    ) {
      await transaction.rollback();
      return handleErrorResponse(
        res,
        responses.statusCodes.conflict,
        responses.errors.task.taskAlreadyExists[language]
      );
    }

    if (file) {
      await tasksService.deleteFileFromS3({
        filepath: previousTaskData.filepath,
      });
    }

    await tasksService.updateTask({
      updateData: updateDataFormatted,
      id,
      transaction,
    });

    if (file) {
      await tasksService.uploadFileToS3({
        file,
      });
    }

    transaction.commit();

    handleSuccessResponse(
      res,
      responses.statusCodes.ok,
      responses.messages.task.taskUpdated[language]
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

module.exports = updateTask;
