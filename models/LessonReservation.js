module.exports = (sequelize, DataTypes) => {
  const LessonReservation = sequelize.define(
    "LessonReservation",
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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startUtc: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "start_utc",
      },
      endUtc: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "end_utc",
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rescheduledByUser: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        field: "rescheduled_by_user",
      },
      rescheduledByTeacher: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        field: "rescheduled_by_teacher",
      },
      freeEditExpiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "free_edit_expiry_date",
      },
    },
    {
      timestamps: false,
    }
  );

  LessonReservation.associate = (models) => {
    LessonReservation.belongsTo(models.User, {
      foreignKey: "userId",
      allowNull: false,
    });
  };

  return LessonReservation;
};
