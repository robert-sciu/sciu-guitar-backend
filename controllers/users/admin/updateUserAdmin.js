const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../../utilities/responseHandlers");
const userService = require("../userService");
const logger = require("../../../utilities/logger");
const responses = require("../../../responses");

async function updateUserAdmin(req, res) {
  const language = req.language;
  const user_id = req.id;

  const updateData = userService.destructureUpdateUserDataAdmin(req.body);

  try {
    if (Number(req.user.id) === Number(user_id)) {
      return handleErrorResponse(res, 403, "Just don't do this");
    }
    await userService.updateUser(user_id, updateData);
    return handleSuccessResponse(res, 200, updateData);
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      409,
      responses.commonMessages.updateError[language]
    );
  }
}

module.exports = updateUserAdmin;
