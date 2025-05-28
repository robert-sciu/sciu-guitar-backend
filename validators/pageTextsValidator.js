const { body } = require("express-validator");
const config = require("../config/config")[process.env.NODE_ENV];

const updatePageTextsValidator = [
  body("role")
    .notEmpty()
    .withMessage("Role can not be empty")
    .isString()
    .withMessage("Invalid role")
    .isIn(config.pageTextRoles)
    .withMessage("Role does not exist"),
  body("contentPl")
    .notEmpty()
    .withMessage("Role can not be empty")
    .isString()
    .withMessage("Invalid content pl"),
  body("contentEn")
    .notEmpty()
    .withMessage("Role can not be empty")
    .isString()
    .withMessage("Invalid content en"),
];

module.exports = { updatePageTextsValidator };
