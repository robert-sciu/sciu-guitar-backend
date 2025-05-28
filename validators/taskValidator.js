const { body } = require("express-validator");
const { customIsJson } = require("./customValidators");

const taskDataValidator = [
  body("JSON").custom(customIsJson()).withMessage("Invalid JSON"),
  body("JSON").custom((jsonInput) => {
    const json = JSON.parse(jsonInput);
    if (!json.titlePl || !json.titleEn || !json.difficultyLevel) {
      throw new Error("Title pl and en and difficulty level are required");
    }

    if (
      typeof json?.titlePl !== "string" ||
      typeof json?.titleEn !== "string" ||
      typeof json?.difficultyLevel !== "number" ||
      (json.artist && typeof json?.artist !== "string") ||
      (json.author && typeof json?.author !== "string") ||
      (json.url && typeof json?.url !== "string") ||
      (json.youtubeUrl && typeof json?.youtubeUrl !== "string") ||
      (json.descriptionPl && typeof json?.descriptionPl !== "string") ||
      (json.descriptionEn && typeof json?.descriptionEn !== "string")
    ) {
      throw new Error("Invalid data type");
    }
    return true;
  }),
];

module.exports = {
  createTaskValidator: taskDataValidator,
  updateTaskValidator: taskDataValidator,
};
