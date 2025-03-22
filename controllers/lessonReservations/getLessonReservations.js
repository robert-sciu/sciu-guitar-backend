const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const responses = require("../../config/serverResponses");
const lessonReservationsService = require("./lessonReservationsService");

async function getLessonReservations(req, res) {
  const language = req.language;
  try {
    const lessonReservations =
      await lessonReservationsService.getAllReservations();

    return handleSuccessResponse(
      res,
      responses.statusCodes.ok,
      lessonReservations
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

module.exports = getLessonReservations;
