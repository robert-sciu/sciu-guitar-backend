const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");

const logger = require("../../utilities/logger");
const lessonReservationsService = require("./lessonReservationsService");
const responses = require("../../config/serverResponses");
const commonService = require("../services/commonService");

async function updateLessonReservation(req, res) {
  const language = req.language;
  const user = req.user;
  // const userId = user.id;
  const isAdmin = commonService.userIsAdmin({ user });
  const reservationId = req.id;
  const updateData = lessonReservationsService.destructureReservationData({
    data: req.body,
  });

  try {
    const reservation = await lessonReservationsService.getReservationById({
      id: reservationId,
    });

    if (!reservation) {
      return handleErrorResponse(
        res,
        responses.statusCodes.notFound,
        responses.errors.lessonReservation.reservationNotFound[language]
      );
    }
    if (!isAdmin && reservation.userId !== user.id) {
      return handleErrorResponse(
        res,
        responses.statusCodes.forbidden,
        responses.errors.lessonReservation.notYourReservation[language]
      );
    }

    const userId = isAdmin ? reservation.userId : user.id;

    const updateData = {
      id: reservation_id,
      ...updateTimeData,
      userId,
      username: user.username,
      rescheduledByUser: commonService.userIsUser({ user }),
      rescheduledByAdmin: commonService.userIsAdmin({ user }),
    };

    const { error, errorMsg } =
      await lessonReservationsService.veryfyReservationData(updateData);
    if (error) {
      return handleErrorResponse(res, 409, errorMsg[language]);
    }

    await lessonReservationsService.rescheduleReservation(
      updateData,
      reservation_id
    );

    await lessonReservationsService.updateRescheduledReservationsCount(user_id);

    return handleSuccessResponse(
      res,
      200,
      responses.commonMessages.updateSuccess[language]
    );
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      500,
      responses.commonMessages.serverError[language]
    );
  }
}

module.exports = updateLessonReservation;
