module.exports = (sequelize, DataTypes) => {
  const TaskTag = sequelize.define(
    "TaskTag",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "task_id",
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "tag_id",
      },
    },
    {
      timestamps: false,
    }
  );

  TaskTag.associate = (models) => {
    TaskTag.belongsTo(models.Task, {
      foreignKey: "taskId",
      allowNull: false,
    });
    TaskTag.belongsTo(models.Tag, {
      foreignKey: "tagId",
      allowNull: false,
    });
  };
  return TaskTag;
};
