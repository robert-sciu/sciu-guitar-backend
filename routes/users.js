const usersController = require("../controllers/users");

const { attachIdParam } = require("../middleware/commonMiddleware");

const express = require("express");

const userRouterOpen = () => {
  const router = express.Router();

  router.route("/").post(usersController.createUser);

  // router.route("/create_admin").post(usersController.createUser);

  router.route("/verify_user").post(usersController.verifyUser);

  router.route("/activate_user").post(usersController.activateUser);

  router
    .route("/reset_password")
    .post(usersController.resetPasswordRequest)
    .patch(usersController.resetPassword);

  return router;
};

const userRouterProtected = () => {
  const router = express.Router();

  router
    .route("/")
    .get(usersController.getUser)
    .patch(usersController.updateUser);

  router
    .route("/change_email_address")
    .post(usersController.changeEmailRequest)
    .patch(usersController.changeEmail);

  return router;
};

const userRouterAdmin = () => {
  const router = express.Router();

  router.route("/").get(usersController.getAllUsers);

  router
    .route("/:id")
    .all(attachIdParam)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser);

  return router;
};

module.exports = {
  userRouterProtected,
  userRouterAdmin,
  userRouterOpen,
};
