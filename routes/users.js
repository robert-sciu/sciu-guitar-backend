const usersController = require("../controllers/users");

const { attachIdParam } = require("../middleware/commonMiddleware");

const express = require("express");
const {
  createUserValidator,
  userTokenValidator,
  resetPasswordValidator,
  updateUserValidator,
} = require("../validators/userValidator");
const { validate } = require("../middleware/validator");
const { idValidator } = require("../validators/commonValidator");

const userRouterOpen = () => {
  const router = express.Router();

  router
    .route("/")
    .post(createUserValidator, validate, usersController.createUser);

  router
    .route("/verifyUser")
    .post(userTokenValidator, validate, usersController.verifyUser);

  router
    .route("/activateUser")
    .post(userTokenValidator, validate, usersController.activateUser);

  router
    .route("/resetPassword")
    .post(usersController.resetPasswordRequest)
    .patch(resetPasswordValidator, validate, usersController.resetPassword);

  return router;
};

const userRouterProtected = () => {
  const router = express.Router();

  router
    .route("/")
    .get(usersController.getUser)
    .patch(updateUserValidator, validate, usersController.updateUser);

  //TODO: add change password route validators
  router
    .route("/changeEmailAddress")
    .post(usersController.changeEmailRequest)
    .patch(usersController.changeEmail);

  return router;
};
const userRouterAdmin = () => {
  const router = express.Router();

  router.route("/").get(usersController.getAllUsers);

  router
    // user id
    .route("/:id")
    .all(attachIdParam, idValidator, validate)
    .patch(updateUserValidator, validate, usersController.updateUser)
    .delete(usersController.deleteUser);

  return router;
};

module.exports = {
  userRouterProtected,
  userRouterAdmin,
  userRouterOpen,
};
