const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const userService = require("./userService");
const responses = require("../../config/serverResponses");

async function activateUser(req, res) {
  const language = req.language;
  const token = userService.destructureUserActivationData({
    data: req.body,
  });

  try {
    // Verify token //////////////////////////////////////////////////////////////////////////////////////////////////

    const decoded = userService.verifyUserActivationToken({ token });

    if (!(await userService.isActivationTokenValid(token, decoded.id))) {
      return handleErrorResponse(
        res,
        responses.statusCodes.unauthorized,
        responses.errors.authentication.invalidToken[language]
      );
    }
    // Update user activation status ////////////////////////////////////////////////////////////////////////////////

    await userService.updateUserActivationStatus({ userId: decoded.id });

    // Clean up ////////////////////////////////////////////////////////////////////////////////////////////////////

    await userService.deleteUserToken({
      token,
      userId: decoded.id,
      type: "activation",
    });

    return handleSuccessResponse(
      res,
      responses.statusCodes.ok,
      responses.messages.user.userActivated[language]
    );
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = activateUser;
