const express = require("express");
const tagsController = require("../controllers/tags");
const { attachIdParam } = require("../middleware/commonMiddleware");

const tagsRouterProtected = () => {
  const router = express.Router();

  router.route("/").get(tagsController.getTags);

  return router;
};

const tagsRouterAdmin = () => {
  const router = express.Router();

  router.route("/").post(tagsController.createTag);

  router
    .route("/:id")
    .patch(attachIdParam, tagsController.updateTag)
    .delete(attachIdParam, tagsController.deleteTag);

  return router;
};

module.exports = {
  tagsRouterProtected,
  tagsRouterAdmin,
};
