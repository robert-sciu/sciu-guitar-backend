const { body } = require("express-validator");
const { customIsJson } = require("./customValidators");

const createPageImageValidator = [
  body("JSON").custom(customIsJson()).withMessage("Invalid JSON"),
  body("JSON").custom((jsonInput) => {
    const json = JSON.parse(jsonInput);
    if (!json.imageName || !json.role) {
      throw new Error("Image name and role are required");
    }
    if (typeof json?.imageName !== "string" || typeof json?.role !== "string") {
      throw new Error("Invalid data type");
    }
    return true;
  }),
];

module.exports = {
  createPageImageValidator,
};
