const { body } = require("express-validator");

const updatePricingValidator = [
  body("lessonPricePln")
    .optional()
    .isInt()
    .withMessage("Invalid lesson price PLN"),
  body("lessonPriceEur")
    .optional()
    .isInt()
    .withMessage("Invalid lesson price EUR"),
  body("lessonPriceUsd")
    .optional()
    .isInt()
    .withMessage("Invalid lesson price USD"),
];

module.exports = {
  updatePricingValidator,
};
