// const s3Manager = require("../../utilities/s3Manager");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const responses = require("../../config/serverResponses");

async function getTaskDownload(req, res) {
  const language = req.language;
  const filename = req.query.filename;
  const bucketName = process.env.BUCKET_NAME;
  const tasksPath = process.env.BUCKET_TASKS_PATH;

  console.log(filename, tasksPath, bucketName);

  try {
    const filePath = `${tasksPath}/${filename}`;
    const url = await s3Manager.getSignedUrlFromS3(bucketName, filePath);
    console.log(url);
    return handleSuccessResponse(res, 200, { presignedUrl: url });
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      500,
      responses.commonMessages.serverError[language]
    );
  }
}

module.exports = getTaskDownload;
