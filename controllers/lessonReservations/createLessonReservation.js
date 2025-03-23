const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const lessonReservationsService = require("./lessonReservationsService");
const responses = require("../../config/serverResponses");
const logger = require("../../utilities/logger");
const commonService = require("../services/commonService");

async function createLessonReservation(req, res) {
  const language = req.language;
  const user = req.user;
  const isAdmin = commonService.userIsAdmin({ user });
  const data = lessonReservationsService.destructureReservationData({
    data: req.body,
  });

  // Check if the user is active ////////////////////////////////////////////////////////////////

  if (!user.isActive) {
    return handleErrorResponse(
      res,
      responses.statusCodes.forbidden,
      responses.errors.user.userNotActivated[language]
    );
  }

  // prepare data ////////////////////////////////////////////////////////////////////////////

  const reservationData = lessonReservationsService.createReservationData({
    data,
    user,
  });

  // verify reservation and check if it doesn't conflict with existing reservations //////////

  const { error, errorMsg } =
    !isAdmin &&
    (await lessonReservationsService.veryfyReservationData({
      reservationData,
    }));
  if (error) {
    return handleErrorResponse(
      res,
      responses.statusCodes.conflict,
      errorMsg[language]
    );
  }

  try {
    // create reservation ////////////////////////////////////////////////////////////////////
    const reservation = await lessonReservationsService.createReservation({
      data: reservationData,
    });
    return handleSuccessResponse(
      res,
      responses.statusCodes.created,
      reservation
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

module.exports = createLessonReservation;
