const { body } = require("express-validator");

const updateUserTaskNotesValidator = [
  body("userNotes")
    .notEmpty()
    .withMessage("You must provide user notes")
    .isString()
    .withMessage("User notes must be a string"),
];

const updateUserTaskValidator = [
  body("isCompleted")
    .notEmpty()
    .withMessage("You must provide isCompleted")
    .isBoolean()
    .withMessage("isCompleted must be a boolean")
    .not()
    .isNumeric()
    .withMessage("isCompleted must be a boolean"),
];

module.exports = {
  updateUserTaskNotesValidator,
  updateUserTaskValidator,
};
