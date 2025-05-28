const { validationResult } = require("express-validator");
const { handleErrorResponse } = require("../utilities/controllerUtilities");
const logger = require("../utilities/logger");

function formatValidationErrors(errors, language = "pl") {
  const firstError = errors.map((error) => {
    return `${error.msg}`;
  })[0];
  return firstError;
}

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleErrorResponse(
      res,
      403,
      formatValidationErrors(errors.array())
    );
    // return res.status(403).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validate,
};
