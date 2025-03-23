const { Op } = require("sequelize");
const { Task, User, Tag, UserTask } = require("../../models").sequelize.models;
const { findRecordByPk } = require("../../utilities/sequelizeUtilities");
const { destructureData } = require("../../utilities/serviceUtilities");

class TasksService {
  async getTasks({ user }) {
    return await Task.findAll({
      where: {
        difficultyLevel: {
          [Op.lte]: user.difficultyClearanceLevel,
          [Op.gte]: user.minimumTaskLevelToDisplay,
        },
      },
    });
  }
  async findUser({ id }) {
    return await findRecordByPk({ model: User, id });
  }

  destructureTaskData({ data }) {
    return destructureData({
      data,
      keys: [
        "titlePl",
        "titleEn",
        "artist",
        "author",
        "url",
        "youtubeUrl",
        "descriptionPl",
        "descriptionEn",
        "difficultyLevel",
      ],
    });
  }
}

const tasksService = new TasksService();

module.exports = tasksService;
