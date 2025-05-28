const loginController = require("../controllers/authentication");

const express = require("express");
const {
  loginValidator,
  refreshTokenValidator,
  logoutTokenValidator,
} = require("../validators/authenticationValidator");
const { validate } = require("../middleware/validator");

const authRouterOpen = () => {
  const router = express.Router();

  router.route("/login").post(loginValidator, validate, loginController.login);

  router
    .route("/refreshToken")
    .post(refreshTokenValidator, validate, loginController.refreshToken);

  router
    .route("/logout")
    .post(logoutTokenValidator, validate, loginController.logout);

  return router;
};

const authRouterProtected = () => {
  const router = express.Router();

  router.route("/verifyToken").post(loginController.verifyToken);

  return router;
};

const authRouterAdmin = () => {
  const router = express.Router();

  router.route("/verifyToken").post(loginController.verifyToken);

  return router;
};

module.exports = {
  authRouterOpen,
  authRouterProtected,
  authRouterAdmin,
};
