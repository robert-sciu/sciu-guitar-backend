module.exports = (sequelize, DataTypes) => {
  const PlanInfo = sequelize.define(
    "PlanInfo",
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
      //to keep track of the balance of paid/unpaid lessons
      lessonBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "lesson_balance",
      },
      lessonCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "lesson_count",
      },
      cancelledLessonCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "cancelled_lesson_count",
      },
      rescheduledLessonCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "rescheduled_lesson_count",
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  PlanInfo.associate = (models) => {
    PlanInfo.belongsTo(models.User, {
      foreignKey: "userId",
      allowNull: false,
    });
  };

  return PlanInfo;
};
