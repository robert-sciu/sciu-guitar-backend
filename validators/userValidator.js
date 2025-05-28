const { body } = require("express-validator");

const createUserValidator = [
  body("username")
    .notEmpty()
    .withMessage("You must provide a username")
    .isString()
    .withMessage("Username must be a string"),
  body("email")
    .notEmpty()
    .withMessage("You must provide an email")
    .isEmail()
    .withMessage("Email must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("You must provide a password")
    .isString()
    .withMessage("Password must be a string"),
  body("role")
    .notEmpty()
    .withMessage("You must provide a role")
    .isString()
    .withMessage("Role must be a string"),
  body("token").optional().isString().withMessage("Token must be a string"),
];

const updateUserValidator = [
  body("difficultyClearanceLevel")
    .optional()
    .isInt()
    .withMessage("Difficulty clearance level must be an integer"),
  body("isVerified")
    .optional()
    .isBoolean()
    .withMessage("isVerified must be a boolean"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  body("notes").optional().isString().withMessage("Notes must be a string"),
  body("minimumTaskLevelToDisplay")
    .optional()
    .isInt()
    .withMessage("Minimum task level to display must be an integer"),
  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string"),
];

const resetPasswordValidator = [
  body("email")
    .notEmpty()
    .withMessage("You must provide an email")
    .isEmail()
    .withMessage("Email must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("You must provide a password")
    .isString()
    .withMessage("Password must be a string"),
  body("resetPasswordToken")
    .notEmpty()
    .withMessage("You must provide a reset password token")
    .isString()
    .withMessage("Reset password token must be a string"),
];

const userTokenValidator = [
  body("token")
    .notEmpty()
    .withMessage("You must provide a token")
    .isString()
    .withMessage("Token must be a string"),
];

module.exports = {
  createUserValidator,
  updateUserValidator,
  resetPasswordValidator,
  userTokenValidator,
};
