module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      titlePl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "title_pl",
      },
      titleEn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "title_en",
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      youtubeUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "youtube_url",
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descriptionPl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "description_pl",
      },
      descriptionEn: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "description_en",
      },
      difficultyLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "difficulty_level",
      },
    },
    {
      timestamps: false,
    }
  );

  // Task.associate = (models) => {
  //   Task.belongsToMany(models.User, {
  //     through: models.UserTask,
  //     foreignKey: "taskId",
  //     otherKey: "userId",
  //   });
  //   Task.belongsTo(models.UserTask, {
  //     foreignKey: "id",
  //     targetKey: "taskId",
  //     as: "userTask",
  //   });
  //   Task.belongsToMany(models.Tag, {
  //     through: models.TaskTag,
  //     foreignKey: "taskId",
  //     otherKey: "tagId",
  //   });
  // };

  return Task;
};
