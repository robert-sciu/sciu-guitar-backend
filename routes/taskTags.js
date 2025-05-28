const express = require("express");
const taskTagsController = require("../controllers/taskTags");
const { attachIdParam } = require("../middleware/commonMiddleware");
const { createTaskTagValidator } = require("../validators/taskTagValidator");
const { validate } = require("../middleware/validator");
const { idValidator } = require("../validators/commonValidator");

const taskTagsRouterProtected = () => {
  const router = express.Router();

  router.route("/").get(taskTagsController.getTaskTags);

  return router;
};

const taskTagsRouterAdmin = () => {
  const router = express.Router();

  router
    .route("/")
    .post(createTaskTagValidator, validate, taskTagsController.createTaskTag);

  router
    .route("/:id")
    .delete(
      idValidator,
      validate,
      attachIdParam,
      taskTagsController.deleteTaskTag
    );
  return router;
};

module.exports = {
  taskTagsRouterProtected,
  taskTagsRouterAdmin,
};
