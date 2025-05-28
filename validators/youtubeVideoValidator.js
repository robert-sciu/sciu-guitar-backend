const { body } = require("express-validator");
const config = require("../config/config")[process.env.NODE_ENV];

const createYoutubeVideoValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("role")
    .notEmpty()
    .withMessage("Video role is required")
    .isString()
    .withMessage("Video role must be a string")
    .isIn(config.youTubeVideosRoles)
    .withMessage("Invalid video role"),
  body("url")
    .notEmpty()
    .withMessage("Url is required")
    .isURL()
    .withMessage("Url must be a string"),
];

module.exports = {
  createYoutubeVideoValidator,
};
