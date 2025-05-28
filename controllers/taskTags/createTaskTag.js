const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const responses = require("../../config/serverResponses");
const logger = require("../../utilities/logger");
const taskTagService = require("./taskTagsService");

async function createTaskTag(req, res) {
  const language = req.language;
  const data = taskTagService.destructureTaskTagCreateData({ data: req.body });
  const { taskId, tagId } = data;
  try {
    if (!(await taskTagService.findTaskById({ taskId }))) {
      return handleErrorResponse(
        res,
        responses.statusCodes.notFound,
        responses.errors.task.taskNotFound[language]
      );
    }
    if (!(await taskTagService.findTagById({ tagId }))) {
      return handleErrorResponse(
        res,
        responses.statusCodes.notFound,
        responses.errors.tag.tagNotFound[language]
      );
    }

    if (
      await taskTagService.findTaskTag({
        taskId,
        tagId,
      })
    ) {
      return handleErrorResponse(
        res,
        responses.statusCodes.conflict,
        responses.errors.taskTag.taskTagAlreadyExists[language]
      );
    }
    await taskTagService.createTaskTag({
      taskId,
      tagId,
    });
    return handleSuccessResponse(
      res,
      responses.statusCodes.created,
      responses.messages.taskTag.taskTagCreated[language]
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

module.exports = createTaskTag;
