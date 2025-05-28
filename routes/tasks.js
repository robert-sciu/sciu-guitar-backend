const express = require("express");
const uploadFile = require("../middleware/multerFileUpload");
const tasksController = require("../controllers/tasks");
const { attachIdParam } = require("../middleware/commonMiddleware");
const {
  createTaskValidator,
  updateTaskValidator,
} = require("../validators/taskValidator");
const { validate } = require("../middleware/validator");
const { idValidator } = require("../validators/commonValidator");

const tasksRouterProtected = () => {
  const router = express.Router();

  router.route("/").get(tasksController.getTasks);

  //id is the task id. The controller wil look up the task by id and extract filepath
  router
    .route("/download/:id")
    .get(idValidator, validate, attachIdParam, tasksController.getTaskDownload);

  return router;
};

const tasksRouterAdmin = () => {
  const router = express.Router();

  router
    .route("/")
    .post(
      uploadFile,
      createTaskValidator,
      validate,
      tasksController.createTask
    );

  router
    .route("/:id")
    .get(idValidator, validate, attachIdParam, tasksController.getTasks)
    .patch(
      uploadFile,
      idValidator,
      updateTaskValidator,
      validate,
      attachIdParam,
      tasksController.updateTask
    )
    .delete(idValidator, validate, attachIdParam, tasksController.deleteTask);
  return router;
};

module.exports = {
  tasksRouterProtected,
  tasksRouterAdmin,
};
