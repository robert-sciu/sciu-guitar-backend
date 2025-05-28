const express = require("express");
const uploadFile = require("../middleware/multerFileUpload");
const pageImagesController = require("../controllers/pageImages");
const { attachIdParam } = require("../middleware/commonMiddleware");
const {
  createPageImageValidator,
} = require("../validators/pageImageValidator");
const { validate } = require("../middleware/validator");
const { idValidator } = require("../validators/commonValidator");

const pageImagesRouterOpen = () => {
  const router = express.Router();
  router.route("/").get(pageImagesController.getPageImages);
  return router;
};

const pageImagesRouterAdmin = () => {
  const router = express.Router();
  router
    .route("/")
    .post(
      uploadFile,
      createPageImageValidator,
      validate,
      pageImagesController.createPageImage
    );

  router
    .route("/:id")
    .delete(
      idValidator,
      validate,
      attachIdParam,
      pageImagesController.deletePageImage
    );
  return router;
};

module.exports = {
  pageImagesRouterOpen,
  pageImagesRouterAdmin,
};
