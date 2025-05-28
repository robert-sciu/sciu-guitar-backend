const { body } = require("express-validator");

const updatePlanInfoValidator = [
  body("lessonBalance").isInt(),
  body("discount").isFloat(),
];

module.exports = {
  updatePlanInfoValidator,
};
