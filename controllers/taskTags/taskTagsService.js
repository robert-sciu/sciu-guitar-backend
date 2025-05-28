const {
  findRecordByPk,
  createRecord,
  deleteRecord,
  findRecordByValue,
} = require("../../utilities/sequelizeUtilities");
const { destructureData } = require("../../utilities/serviceUtilities");
const { Task, Tag, TaskTag } = require("../../models").sequelize.models;

class TaskTagService {
  async findTaskById({ taksId }) {
    return await findRecordByPk({ model: Task, id: taksId });
  }
  async findTagById({ tagId }) {
    return await findRecordByPk({ model: Tag, id: tagId });
  }
  async findTaskTag({ taskId, tagId }) {
    return await findRecordByValue({
      model: TaskTag,
      value: { taskId, tagId },
    });
  }

  async createTaskTag({ taskId, tagId }) {
    return await createRecord({ model: TaskTag, data: { taskId, tagId } });
  }

  async deleteTaskTag({ taskTagId }) {
    return await deleteRecord({ model: TaskTag, id: taskTagId });
  }

  destructureTaskTagCreateData({ data }) {
    return destructureData({ data, keys: ["taskId", "tagId"] });
  }
}

const taskTagService = new TaskTagService();

module.exports = taskTagService;
