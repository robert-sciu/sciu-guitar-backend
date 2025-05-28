const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");

const tagService = require("./tagService");
const responses = require("../../config/serverResponses");
const logger = require("../../utilities/logger");

async function getTags(req, res) {
  try {
    const tags = await tagService.getAllTags();
    return handleSuccessResponse(res, responses.statusCodes.ok, tags);
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError
    );
  }
}

module.exports = getTags;
