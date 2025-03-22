const { sequelize } = require("../../models");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const responses = require("../../config/serverResponses");
const userService = require("./userService");

async function deleteUser(req, res) {
  const language = req.language;
  const id = req.id;

  const transaction = await userService.getTransaction();

  try {

    await userService.deletePlanInfo({ userId: id, transaction });

    await userService.deleteAllTokensForUser({ userId: id, transaction });

    // await userService.deleteUserReservations(id, transaction);

    // await userService.deleteUserTasks(id, transaction);

    await userService.deleteUser({ userId: id, transaction });

    await transaction.commit();

    return handleSuccessResponse(
      res,
      responses.statusCodes.noContent,
      responses.messages.user.userDeleted[language]
    );
  } catch (error) {
    await transaction.rollback();
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = deleteUser;
