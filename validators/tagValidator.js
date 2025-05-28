const { body } = require("express-validator");

const tagDataValidator = [
  body("tagName")
    .notEmpty()
    .withMessage("No data")
    .isString("Tag name must be a string"),
];

module.exports = {
  createTagValidator: tagDataValidator,
  updateTagValidator: tagDataValidator,
};
