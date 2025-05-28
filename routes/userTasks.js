const express = require("express");
const userTasksController = require("../controllers/userTasks");
const { attachIdParam } = require("../middleware/commonMiddleware");
const attachUserSelectedWithId = require("../middleware/attachUserSelectedWithId");
const {
  updateUserTaskNotesValidator,
  updateUserTaskValidator,
} = require("../validators/userTaskValidator");
const { validate } = require("../middleware/validator");
const { idValidator } = require("../validators/commonValidator");

const userTasksRouterProtected = () => {
  const router = express.Router();

  router.route("/").get(userTasksController.getUserTasks);
  router.route("/completed").get(userTasksController.getCompletedUserTasks);

  router
    //userTask id
    .route("/userNotes/:id")
    .patch(
      idValidator,
      updateUserTaskNotesValidator,
      validate,
      attachIdParam,
      userTasksController.updateUserTaskNotes
    );

  router
    //task id
    .route("/create/:id")
    .post(
      idValidator,
      validate,
      attachIdParam,
      userTasksController.createUserTask
    );

  router
    // userTask id
    .route("/delete/:id")
    .delete(
      idValidator,
      validate,
      attachIdParam,
      userTasksController.deleteUserTask
    );

  return router;
};

const userTasksRouterAdmin = () => {
  const router = express.Router();

  router;
  //userTask id
  // .route("/update/:id")
  // .patch(
  //   attachIdParam,
  //   idValidator,
  //   updateUserTaskValidator,
  //   validate,
  //   userTasksController.updateUserTask
  // );

  router
    .route("/userNotes/:id")
    .patch(
      idValidator,
      updateUserTaskNotesValidator,
      validate,
      userTasksController.updateUserTaskNotes
    );

  router
    .route("/:id")
    .all(idValidator, validate, attachIdParam)
    .get(userTasksController.getUserTasks)
    .post(userTasksController.createUserTask)
    .patch(
      updateUserTaskValidator,
      validate,
      userTasksController.updateUserTask
    );

  return router;
};

module.exports = {
  userTasksRouterProtected,
  userTasksRouterAdmin,
};
