const responses = require("../../config/serverResponses");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const youtubeVideosService = require("./youTubeVideosService");

async function getYouTubeVideos(req, res) {
  const language = req.language;
  try {
    const youTubeVideos = await youtubeVideosService.getAllYouTubeVideos();
    return handleSuccessResponse(res, responses.statusCodes.ok, youTubeVideos);
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = getYouTubeVideos;
