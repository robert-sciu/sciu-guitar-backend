const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const responses = require("../../config/serverResponses");
const authenticationService = require("./authenticationService");

async function logout(req, res) {
  const language = req.language;
  const refreshToken = req.cookies.refreshToken;
  try {
    await authenticationService.revokeToken({ token: refreshToken });
    authenticationService.clearCookies({ res });

    return handleSuccessResponse(
      res,
      responses.statusCodes.ok,
      responses.messages.authentication.logoutSuccessful[language]
    );
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError[language],
      responses.errors.serverError[language]
    );
  }
}

module.exports = logout;
