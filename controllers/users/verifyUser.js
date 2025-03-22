const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const userService = require("./userService");
const responses = require("../../config/serverResponses");

async function verifyUser(req, res) {
  const language = req.language;
  const token = userService.destructureUserVerificationData({
    data: req.body,
  });
  try {
    // Verify token //////////////////////////////////////////////////////////////////////////////////////////////////

    const decoded = userService.verifyUserVerificationToken({ token });

    if (
      !(await userService.isVerificationTokenValid({
        token,
        userId: decoded.id,
      }))
    ) {
      return handleErrorResponse(
        res,
        responses.statusCodes.unauthorized,
        responses.common.error.invalidToken[language]
      );
    }

    // Update user verification status /////////////////////////////////////////////////////////////////////////////

    await userService.updateUserVerificationStatus({ userId: decoded.id });

    // Clean up ////////////////////////////////////////////////////////////////////////////////////////////////////

    await userService.deleteUserToken({
      token,
      userId: decoded.id,
      type: "verification",
    });

    // Send activation email to admin //////////////////////////////////////////////////////////////////////////////

    const activationToken =
      await userService.generateAndSaveUserActivationToken({
        userId: user.id,
      });

    await userService.sendMailToMyselfAboutUserVerification({
      userId: decoded.id,
      activationToken,
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return handleSuccessResponse(
      res,
      responses.statusCodes.ok,
      responses.commonMessages.updateSuccess[language]
    );
  } catch (error) {
    logger.error(error);
    if (error.message === "invalid signature") {
      return handleErrorResponse(
        res,
        responses.statusCodes.unauthorized,
        responses.errors.authentication.invalidToken[language]
      );
    }
    if (error.message === "jwt expired") {
      return handleErrorResponse(
        res,
        responses.statusCodes.unauthorized,
        responses.errors.authentication.tokenExExpired[language]
      );
    }
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = verifyUser;
