const responses = require("../../config/serverResponses");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const tagService = require("./tagService");

async function updateTag(req, res) {
  const language = req.language;
  const id = req.id;
  const updateData = tagService.destructureTagData({ data: req.body });
  try {
    const tag = await tagService.findTagById({ id });
    if (!tag) {
      return handleErrorResponse(
        res,
        responses.statusCodes.notFound,
        responses.errors.tag.tagNotFound[language]
      );
    }

    await tagService.updateTag({ id, updateData });
    return handleSuccessResponse(
      res,
      responses.statusCodes.ok,
      responses.messages.tag.tagUpdated[language]
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

module.exports = updateTag;
