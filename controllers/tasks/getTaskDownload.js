// const s3Manager = require("../../utilities/s3Manager");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const responses = require("../../config/serverResponses");
const tasksService = require("./tasksService");

async function getTaskDownload(req, res) {
  const language = req.language;
  const taskId = req.id;
  try {
    const task = (await tasksService.findTaskById({ id: taskId })).dataValues;
    const url = await tasksService.getSignedUrlFromS3({
      filepath: task.filepath,
    });
    return handleSuccessResponse(res, 200, { presignedUrl: url });
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = getTaskDownload;
