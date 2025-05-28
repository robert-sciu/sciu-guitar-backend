const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const authenticationService = require("./authenticationService");
const responses = require("../../config/serverResponses");

async function login(req, res) {
  const language = req.language;
  const loginData = authenticationService.destrucureLoginCredentials({
    data: req.body,
  });

  try {
    // Check if user exists and is verified and if not return error message //////////////

    const user = await authenticationService.findUserByEmail({
      email: loginData.email,
    });
    if (!user) {
      return handleErrorResponse(
        res,
        responses.statusCodes.notFound,
        responses.errors.user.userNotFound[language]
      );
    }
    if (!user.isVerified) {
      return handleErrorResponse(
        res,
        responses.statusCodes.unauthorized,
        responses.errors.user.userNotVerified[language]
      );
    }
    //////////////////////////////////////////////////////////////////////////////////////

    // Check if password is correct and if not return error message ////////////////////
    // if password is correct generate jwt and attach cookies //////////////////////////

    if (
      !(await authenticationService.verifyPassword({
        hash: user.password,
        password: loginData.password,
      }))
    ) {
      return handleErrorResponse(
        res,
        responses.statusCodes.unauthorized,
        responses.errors.authentication.wrongCredentials[language]
      );
    }
    const accessToken = authenticationService.getLoginJWT({ user });
    const refreshToken = authenticationService.getRefreshJWT({ user });

    await authenticationService.saveRefreshToken({
      refreshToken,
      userId: user.id,
    });

    authenticationService.attachCookies({ res, refreshToken });

    ///////////////////////////////////////////////////////////////////////////////////

    return handleSuccessResponse(res, responses.statusCodes.ok, {
      token: accessToken,
    });
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = login;
