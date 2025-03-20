const logger = require("../../utilities/logger");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/responseHandlers");
const userService = require("../users/userService");
const responses = require("../../responses");

async function resetPassword(req, res) {
  const language = req.language;
  const data = userService.destructurePasswordResetData(req.body);
  const { email, password, reset_password_token } = data;
  try {
    const { resetPasswordToken, userId } =
      userService.getResetPasswordToken(email);
    if (!resetPasswordToken) {
      return handleErrorResponse(
        res,
        404,
        responses.usersMessages.userNotFound[language]
      );
    }
    if (resetPasswordToken !== reset_password_token) {
      return handleErrorResponse(
        res,
        400,
        responses.commonMessages.invalidToken[language]
      );
    }
    const hashedPassword = await userService.hashPassword(password);
    const updatedRecordCount = await userService.updateUserPassword(
      userId,
      hashedPassword
    );

    if (updatedRecordCount === 0) {
      return handleErrorResponse(
        res,
        409,
        responses.commonMessages.updateError[language]
      );
    }
    return handleSuccessResponse(
      res,
      200,
      responses.commonMessages.updateSuccess[language]
    );
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      500,
      responses.commonMessages.serverError[language]
    );
  }
}

module.exports = resetPassword;
