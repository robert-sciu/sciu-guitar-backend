const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const logger = require("../../utilities/logger");
const userService = require("./userService");
const responses = require("../../config/serverResponses");
const commonService = require("../services/commonService");

async function createUser(req, res) {
  const language = req.language;

  const userData = userService.destructureCreateUserData({
    data: req.body,
  });

  // Check if admin user creation is allowed if role is admin ////////////////////////////////////////////////////////

  const adminUserCreationEnabled = userService.checkIfAdminCreationIsAllowed({
    userData,
  });

  if (userData.role === "admin" && !adminUserCreationEnabled) {
    return handleErrorResponse(
      res,
      responses.statusCodes.forbidden,
      responses.errors.user.adminCreationNotAllowed[language]
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const transaction = await commonService.getTransaction();

  try {
    // Check if user with the same email already exists //////////////////////////////////////////////////////////////

    if (
      await userService.findUserByEmail({ email: userData.email, transaction })
    ) {
      await transaction.rollback();
      return handleErrorResponse(
        res,
        responses.statusCodes.conflict,
        responses.errors.user.mailAlreadyExists[language]
      );
    }

    // Create user //////////////////////////////////////////////////////////////////////////////////////////////////

    const newUser = await userService.createUser({
      data: userData,
      isAdmin: adminUserCreationEnabled,
      transaction,
    });

    // Create plan info ////////////////////////////////////////////////////////////////////////////////////////////

    await userService.createPlanInfo({ userId: newUser.id, transaction });

    // create and save verification token to db/////////////////////////////////////////////////////////////////////

    const verificationToken =
      await userService.generateAndSaveUserVerificationToken({
        userId: newUser.id,
        transaction,
      });

    // send email to user with verification link and email to admin about new user /////////////////////////////////

    await userService.sendEmailsConcerningNewUser({
      userEmail: newUser.email,
      username: newUser.username,
      verificationToken,
      language,
    });

    await transaction.commit();

    return handleSuccessResponse(
      res,
      responses.statusCodes.created,
      responses.messages.user.userCreated[language]
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

module.exports = createUser;
