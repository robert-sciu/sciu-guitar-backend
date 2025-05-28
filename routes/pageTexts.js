const express = require("express");
const pageTextsController = require("../controllers/pageTexts");
const {
  updatePageTextsValidator,
} = require("../validators/pageTextsValidator");
const { validate } = require("../middleware/validator");

const pageTextsRouterOpen = () => {
  const router = express.Router();
  router.route("/").get(pageTextsController.getPageTexts);
  return router;
};

const pageTextsRouterAdmin = () => {
  const router = express.Router();
  router
    .route("/")
    .patch(
      updatePageTextsValidator,
      validate,
      pageTextsController.updatePageText
    );
  return router;
};

module.exports = {
  pageTextsRouterOpen,
  pageTextsRouterAdmin,
};
