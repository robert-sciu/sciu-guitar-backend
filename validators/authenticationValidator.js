const { body, cookie } = require("express-validator");

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),
];

const refreshTokenValidator = [
  cookie("refreshToken")
    .notEmpty()
    .withMessage("Refresh token is required")
    .isString()
    .withMessage("Refresh token must be a string"),
];

const logoutTokenValidator = [
  cookie("refreshToken")
    .optional()
    .isString()
    .withMessage("Refresh token must be a string"),
];

module.exports = {
  loginValidator,
  refreshTokenValidator,
  logoutTokenValidator,
};
