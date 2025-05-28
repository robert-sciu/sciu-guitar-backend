const express = require("express");
const tagsController = require("../controllers/tags");
const { attachIdParam } = require("../middleware/commonMiddleware");
const {
  createTagValidator,
  updateTagValidator,
} = require("../validators/tagValidator");
const { validate } = require("../middleware/validator");
const { idValidator } = require("../validators/commonValidator");

const tagsRouterProtected = () => {
  const router = express.Router();

  router.route("/").get(tagsController.getTags);

  return router;
};

const tagsRouterAdmin = () => {
  const router = express.Router();

  router
    .route("/")
    .post(createTagValidator, validate, tagsController.createTag);

  router
    .route("/:id")
    .patch(
      idValidator,
      updateTagValidator,
      validate,
      attachIdParam,
      tagsController.updateTag
    )
    .delete(idValidator, validate, attachIdParam, tagsController.deleteTag);

  return router;
};

module.exports = {
  tagsRouterProtected,
  tagsRouterAdmin,
};
