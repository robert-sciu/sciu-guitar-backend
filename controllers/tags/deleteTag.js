const responses = require("../../config/serverResponses");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");

const tagService = require("./tagService");

async function deleteTag(req, res) {
  const language = req.language;
  const id = req.id;
  try {
    await tagService.deleteTag({ id });

    return handleSuccessResponse(
      res,
      responses.statusCodes.noContent,
      responses.messages.tag.tagDeleted[language]
    );
  } catch (error) {
    logger.error(error);
    handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = deleteTag;
