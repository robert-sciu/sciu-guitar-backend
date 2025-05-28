const { Op } = require("sequelize");
const { Task, User, Tag } = require("../../models").sequelize.models;
const {
  findRecordByPk,
  findRecordByValue,
  createRecord,
  deleteRecord,
  updateRecord,
} = require("../../utilities/sequelizeUtilities");
const { destructureData } = require("../../utilities/serviceUtilities");
const { filterUrl } = require("../../utilities/filterUrl");
const s3Manager = require("../../services/s3Manager");
const config = require("../../config/config")[process.env.NODE_ENV];

class TasksService {
  constructor() {
    this._taskFilesPath = config.s3Paths.taskFilesPath;
  }

  get taskFilesPath() {
    return this._taskFilesPath;
  }

  async getTasks({ user, language }) {
    const capitalizedLanguage =
      language.charAt(0).toUpperCase() + language.slice(1);
    return await Task.findAll({
      where: {
        difficultyLevel: {
          [Op.lte]: user.difficultyClearanceLevel,
          [Op.gte]: user.minimumTaskLevelToDisplay,
        },
      },

      attributes: [
        "id",
        `title${capitalizedLanguage}`,
        "artist",
        "youtubeUrl",
        "difficultyLevel",
      ],
      include: [
        {
          model: Tag,
          attributes: ["id", ["tag_name", "tag"]], // Adjust attributes as needed
          through: { attributes: [] }, // Exclude join table attributes
        },
      ],
    });
  }

  async findTaskById({ id }) {
    return await findRecordByPk({ model: Task, id });
  }

  async findUser({ id }) {
    return await findRecordByPk({ model: User, id });
  }

  async isTaskTitleInDatabase({ task }) {
    const existingTask =
      (await findRecordByValue({
        model: Task,
        value: { titlePl: task.titlePl },
      })) ||
      (await findRecordByValue({
        model: Task,
        value: { titleEn: task.titleEn },
      }));
    return !!existingTask;
  }

  async createTask({ data, transaction }) {
    return await createRecord({ model: Task, data, transaction });
  }

  async updateTask({ id, updateData, transaction }) {
    return await updateRecord({ model: Task, updateData, id, transaction });
  }

  async deleteTask({ id, transaction }) {
    return await deleteRecord({ model: Task, id, transaction });
  }

  async isTitleConflict({ previousTaskData, updateData }) {
    if (
      ["titlePl", "titleEn"].every(
        (key) => previousTaskData[key] === updateData[key]
      )
    ) {
      return false;
    }
    return await this.isTaskTitleInDatabase({ task: updateData });
  }

  prepareTaskAndFileData({ data, file }) {
    const uniqueFilename =
      file &&
      `${data.titleEn}-${new Date().toISOString().slice(0, -5)}-${
        file.originalname
      }`;
    const filepath = file && `${this.taskFilesPath}/${uniqueFilename}`;
    if (file) {
      file.filepath = filepath;
    }

    data.titlePl = data.titlePl;
    data.titleEn = data.titleEn;
    data.artist = data.artist;
    data.author = data.author;
    data.url = data.url && filterUrl({ url: data.url });
    data.youtubeUrl = data.youtubeUrl && filterUrl({ url: data.youtubeUrl });
    data.descriptionPl = data.descriptionPl;
    data.descriptionEn = data.descriptionEn;
    data.difficultyLevel = data.difficultyLevel;
    data.filepath = file && filepath;
    data.filename = file && file.originalname;
    return { taskData: data, file };
  }

  async uploadFileToS3({ file }) {
    if (!file) return;
    return await s3Manager.uploadFileToS3({ file });
  }

  async getSignedUrlFromS3({ filepath }) {
    if (!filepath) return;
    return await s3Manager.getSignedUrlFromS3({ filepath });
  }

  async deleteFileFromS3({ filepath }) {
    if (!filepath) return;
    return await s3Manager.deleteFileFromS3({ filepath });
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
