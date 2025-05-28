const responses = require("../../config/serverResponses");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const youtubeVideosService = require("./youTubeVideosService");

async function createYouTubeVideo(req, res) {
  const language = req.language;
  const data = youtubeVideosService.destructureYouTubeVideoData({
    data: req.body,
  });
  try {
    if (!(await youtubeVideosService.isVideoUnique({ data }))) {
      return handleErrorResponse(
        res,
        responses.statusCodes.conflict,
        responses.errors.youTubeVideos.youTubeVideoAlreadyExists[language]
      );
    }
    if (!youtubeVideosService.isRoleAllowed({ data })) {
      return handleErrorResponse(
        res,
        responses.statusCodes.forbidden,
        responses.errors.youTubeVideos.roleNotAllowed[language]
      );
    }
    await youtubeVideosService.createYouTubeVideoLink({ data });
    return handleSuccessResponse(
      res,
      responses.statusCodes.created,
      responses.messages.youTubeVideos.youTubeVideoCreated[language]
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

module.exports = createYouTubeVideo;
