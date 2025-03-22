module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_verified",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_active",
      },
      difficultyClearanceLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "difficulty_clearance_level",
      },
      minimumTaskLevelToDisplay: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "minimum_task_level_to_display",
      },
      notes: {
        type: DataTypes.STRING(1500),
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  User.associate = (models) => {
    // User.belongsToMany(models.Task, {
    //   through: models.UserTask,
    //   foreignKey: "user_id",
    //   otherKey: "task_id",
    // });
    User.hasOne(models.PlanInfo, {
      foreignKey: "userId",
      allowNull: false,
    });
    // User.hasMany(models.LessonReservation, {
    //   foreignKey: "user_id",
    //   allowNull: false,
    // });
  };

  return User;
};
