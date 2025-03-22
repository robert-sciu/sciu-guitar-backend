const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const responses = require("../../config/serverResponses");

async function getUser(req, res) {
  const language = req.language;
  const user = req.user;

  if (user) {
    return handleSuccessResponse(res, responses.statusCodes.ok, user);
  } else if (user === null) {
    return handleErrorResponse(
      res,
      responses.statusCodes.notFound,
      responses.errors.user.userNotFound[language]
    );
  }

  return handleErrorResponse(res, 500, responses.errors.serverError[language]);
}

module.exports = getUser;
