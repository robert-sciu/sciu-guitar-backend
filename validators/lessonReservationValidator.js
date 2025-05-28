const { body } = require("express-validator");
const { customIsIsoString } = require("./customValidators");

const reservationDataValidator = [
  body("startUtc")
    .notEmpty()
    .withMessage("Start date is required")
    .custom(customIsIsoString())
    .withMessage("Start date must be an ISO UTC date string"),
  body("endUtc")
    .notEmpty()
    .withMessage("End date is required")
    .custom(customIsIsoString())
    .withMessage("End date must be an ISO UTC date string"),
];

module.exports = {
  createLessonReservationValidator: reservationDataValidator,
  updateLessonReservationValidator: reservationDataValidator,
};
