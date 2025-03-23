const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");

const logger = require("../../utilities/logger");
const lessonReservationsService = require("./lessonReservationsService");
const responses = require("../../config/serverResponses");
const commonService = require("../services/commonService");
const config = require("../../config/config")[process.env.NODE_ENV];

async function updateLessonReservation(req, res) {
  const language = req.language;
  const user = req.user;
  const isAdmin = commonService.userIsAdmin({ user });
  const reservationId = req.id;
  const updateData = lessonReservationsService.destructureReservationData({
    data: req.body,
  });

  try {
    const reservation = await lessonReservationsService.getReservationById({
      id: reservationId,
    });

    // check if reservation exists ///////////////////////////////////////////////////////
    if (!reservation) {
      return handleErrorResponse(
        res,
        responses.statusCodes.notFound,
        responses.errors.lessonReservation.reservationNotFound[language]
      );
    }

    // check if reservation belongs to user or if admin is making changes ////////////////
    if (!isAdmin && reservation.userId !== user.id) {
      return handleErrorResponse(
        res,
        responses.statusCodes.forbidden,
        responses.errors.lessonReservation.notYourReservation[language]
      );
    }

    // check if reservation is rescheduled too far by user ///////////////////////////////

    if (
      !isAdmin &&
      lessonReservationsService.isRescheduleTimeTooFar({
        reservation,
        updateData,
      })
    ) {
      return handleErrorResponse(
        res,
        responses.statusCodes.conflict,
        responses.errors.lessonReservation.rescheduleTooFar[language]
      );
    }

    // prepare reservation update data ///////////////////////////////////////////////////

    const reservationUpdateData =
      lessonReservationsService.createReservationUpdateData({
        reservation,
        updateData,
        isAdmin,
      });

    // verify reservation and check if it doesn't conflict with existing reservations ////

    const { error, errorMsg } =
      !isAdmin &&
      (await lessonReservationsService.veryfyReservationData({
        reservationData: reservationUpdateData,
      }));
    if (error) {
      return handleErrorResponse(
        res,
        responses.statusCodes.conflict,
        errorMsg[language]
      );
    }

    // update reservation ////////////////////////////////////////////////////////////////

    await lessonReservationsService.updateReservation({
      reservationUpdateData,
    });

    // update user's rescheduled reservations count //////////////////////////////////////

    !isAdmin &&
      (await lessonReservationsService.updateRescheduledReservationsCount({
        userId: reservation.userId,
      }));

    return handleSuccessResponse(
      res,
      responses.statusCodes.ok,
      responses.messages.lessonReservation.reservationUpdated[language]
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

module.exports = updateLessonReservation;
