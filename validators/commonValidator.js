const { param } = require("express-validator");

const idValidator = [
  param("id")
    .notEmpty()
    .withMessage("Id is required")
    .isInt()
    .withMessage("Id must be an integer"),
];

module.exports = {
  idValidator,
};
