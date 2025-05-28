const express = require("express");
const youTubeVideosController = require("../controllers/youTubeVideos");
const { attachIdParam } = require("../middleware/commonMiddleware");
const {
  createYoutubeVideoValidator,
} = require("../validators/youtubeVideoValidator");
const { validate } = require("../middleware/validator");
const { idValidator } = require("../validators/commonValidator");

const youTubeVideoRouterOpen = () => {
  const router = express.Router();
  router.route("/").get(youTubeVideosController.getYouTubeVideos);
  return router;
};

const youTubeVideoRouterAdmin = () => {
  const router = express.Router();
  router
    .route("/")
    .post(
      createYoutubeVideoValidator,
      validate,
      youTubeVideosController.createYouTubeVideo
    );
  router
    .route("/:id")
    .delete(
      idValidator,
      validate,
      attachIdParam,
      youTubeVideosController.deleteYouTubeVideo
    );
  return router;
};

module.exports = {
  youTubeVideoRouterOpen,
  youTubeVideoRouterAdmin,
};
