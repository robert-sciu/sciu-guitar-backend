const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");
const responses = require("../../config/serverResponses");
const logger = require("../../utilities/logger");
const taskTagService = require("./taskTagsService");

async function deleteTaskTag(req, res) {
  const language = req.language;
  const id = req.id;
  try {
    await taskTagService.deleteTaskTag({ taskTagId: id });
    return handleSuccessResponse(
      res,
      responses.statusCodes.noContent,
      responses.messages.taskTag.taskTagDeleted[language]
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

module.exports = deleteTaskTag;
