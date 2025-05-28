const {
  findRecordByPk,
  createRecord,
  deleteRecord,
  updateRecord,
  findRecordByValue,
} = require("../../utilities/sequelizeUtilities");
const { destructureData } = require("../../utilities/serviceUtilities");

const { Task, User, Tag, UserTask } = require("../../models").sequelize.models;

class UserTaskService {
  constructor() {}
  async getUserTasks({ userId, language, showCompleted = false }) {
    const userTasks = await UserTask.findAll({
      where: { userId, isCompleted: showCompleted },
      include: [
        {
          model: Task,
          attributes: [
            "id",
            [`title_${language}`, "title"],
            "artist",
            "author",
            "url",
            "youtubeUrl",
            "filename",
            "filepath",
            [`description_${language}`, "description"],
            "difficultyLevel",
          ],
        },
      ],
      attributes: {
        exclude: ["userId", "taskId", "isCompleted"],
      },
    });

    return userTasks;
  }

  async createUserTask({ data }) {
    return await createRecord({ model: UserTask, data });
  }
  async findTaskById({ taskId }) {
    return await findRecordByPk({ model: Task, id: taskId });
  }
  async findUserTask({ userId, taskId }) {
    return await findRecordByValue({
      model: UserTask,
      value: { userId, taskId },
    });
  }
  async findUserTaskById({ userTaskId }) {
    return await findRecordByPk({ model: UserTask, id: userTaskId });
  }
  async updateUserTask({ userTaskId, updateData }) {
    return await updateRecord({
      model: UserTask,
      updateData,
      id: userTaskId,
    });
  }
  async deleteUserTask({ userTaskId }) {
    return await deleteRecord({ model: UserTask, id: userTaskId });
  }
  // destrucureCreateUserTaskData({ data }) {
  //   return destructureData({ data, keys: ["taskId"] });
  // }
  destructureUpdateUserTaskNotesData({ data }) {
    return destructureData({ data, keys: ["userNotes"] });
  }
  destructureUpdateUserTaskCompletedData({ data }) {
    return destructureData({ data, keys: ["isCompleted"] });
  }
}

const userTaskService = new UserTaskService();

module.exports = userTaskService;
