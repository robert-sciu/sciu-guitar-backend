const responses = require("../../config/serverResponses");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const youtubeVideosService = require("./youTubeVideosService");

async function deleteYouTubeVideo(req, res) {
  const language = req.language;
  const id = req.id;
  try {
    await youtubeVideosService.deleteYouTubeVideoLink({ id });
    return handleSuccessResponse(
      res,
      responses.statusCodes.noContent,
      responses.messages.youTubeVideos.youTubeVideoDeleted[language]
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

module.exports = deleteYouTubeVideo;
