const logger = require("../../utilities/logger");

const userService = require("./userService");
const responses = require("../../config/serverResponses");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");
const commonService = require("../services/commonService");

async function updateUser(req, res) {
  const language = req.language;
  const isAdmin = commonService.userIsAdmin({ user: req.user });

  const userId = isAdmin ? req.id : req.user.id;

  const updateData = userService.destructureUpdateUserData({
    data: req.body,
    isAdmin,
  });

  try {
    await userService.updateUser({
      userId,
      data: updateData,
    });

    userService.clearUserCache({ userId });

    return handleSuccessResponse(
      res,
      responses.statusCodes.ok,
      responses.messages.updateSuccess[language]
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

module.exports = updateUser;
