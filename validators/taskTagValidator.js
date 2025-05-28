const { body } = require("express-validator");

const createTaskTagValidator = [
  body("taskId").isInt().withMessage("Task id must be an integer"),
  body("tagId").isInt().withMessage("Tag id must be an integer"),
];

module.exports = {
  createTaskTagValidator,
};
