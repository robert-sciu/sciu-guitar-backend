const logger = require("../../utilities/logger");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const tasksService = require("./tasksService");

const responses = require("../../config/serverResponses");

async function getTasks(req, res) {
  const language = req.language;
  const user = req.user;

  try {
    const tasks = await tasksService.getTasks({ user });
    return handleSuccessResponse(res, responses.statusCodes.ok, tasks);
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = getTasks;
