const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const lessonReservationsService = require("./lessonReservationsService");
const responses = require("../../config/serverResponses");
const commonService = require("../services/commonService");

async function deleteLessonReservation(req, res) {
  const language = req.language;
  const reservationId = req.id;
  const user = req.user;
  const isAdmin = commonService.userIsAdmin({ user });
  const userId = user.id;

  try {
    // check if reservation exists and if it belongs to the user if not admin ///////////////////////

    const lessonReservation =
      await lessonReservationsService.getReservationById({ id: reservationId });
    console.log(lessonReservation);

    if (!lessonReservation) {
      return handleErrorResponse(
        res,
        responses.statusCodes.notFound,
        responses.errors.lessonReservation.reservationNotFound[language]
      );
    }

    if (!isAdmin && lessonReservation.userId !== userId) {
      return handleErrorResponse(
        res,
        responses.statusCodes.forbidden,
        responses.errors.lessonReservation.notYourReservation[language]
      );
    }

    // update cancelled reservation cound for user planInfo if reservation is deleted by user ///////

    !isAdmin &&
      (await lessonReservationsService.updateCancelledReservationsCount({
        userId,
        isAdmin,
      }));

    // delete reservation ////////////////////////////////////////////////////////////////////////

    await lessonReservationsService.deleteReservation({ id: reservationId });

    return handleSuccessResponse(
      res,
      responses.statusCodes.noContent,
      responses.messages.lessonReservation.reservationDeleted[language]
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

module.exports = deleteLessonReservation;
