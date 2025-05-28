const logger = require("../../utilities/logger");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");
const responses = require("../../config/serverResponses");
const authenticationService = require("./authenticationService");

async function refreshToken(req, res) {
  const language = req.language;
  const refreshToken = req.cookies.refreshToken;

  // if (!refreshToken) {
  //   return handleErrorResponse(
  //     res,
  //     responses.statusCodes.unauthorized,
  //     responses.errors.authentication.missingToken[language]
  //   );
  // }

  try {
    const storedToken = await authenticationService.findStoredToken({
      token: refreshToken,
    });
    if (!storedToken) {
      return handleErrorResponse(
        res,
        responses.statusCodes.unauthorized,
        responses.errors.authentication.invalidToken[language]
      );
    }

    const accessToken = authenticationService.getLoginJWTUsingRefreshJWT({
      refreshToken,
    });
    return handleSuccessResponse(res, responses.statusCodes.ok, {
      token: accessToken,
    });
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.commonMessages.serverError[language]
    );
  }
}

module.exports = refreshToken;
