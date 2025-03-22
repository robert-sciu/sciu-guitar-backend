const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");
const userService = require("./userService");
const logger = require("../../utilities/logger");
const responses = require("../../config/serverResponses");

async function getUsersAdmin(req, res) {
  const language = req.language;
  try {
    const users = await userService.getAllUsers();
    return handleSuccessResponse(res, responses.statusCodes.ok, users);
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = getUsersAdmin;
