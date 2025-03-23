const responses = require("../../config/serverResponses");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");

const tagService = require("./tagService");

async function createTag(req, res) {
  const language = req.language;
  const data = tagService.destructureTagData({ data: req.body });

  try {
    const existingTag = await tagService.findTagByTagName({
      tagName: data.tagName,
    });

    if (existingTag) {
      return handleErrorResponse(
        res,
        responses.statusCodes.conflict,
        responses.errors.tag.tagAlreadyExists[language]
      );
    }

    await tagService.createTag({ data });

    return handleSuccessResponse(
      res,
      responses.statusCodes.created,
      responses.messages.tag.tagCreated[language]
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

module.exports = createTag;
