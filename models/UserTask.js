module.exports = (sequelize, DataTypes) => {
  const UserTask = sequelize.define(
    "UserTask",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "task_id",
      },
      userNotes: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "user_notes",
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_completed",
      },
    },
    {
      timestamps: false,
    }
  );

  UserTask.associate = (models) => {
    UserTask.belongsTo(models.User, {
      foreignKey: "userId",
    });
    UserTask.belongsTo(models.Task, {
      foreignKey: "taskId",
    });
  };

  return UserTask;
};
