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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      has_permanent_reservation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      permanent_reservation_enable_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      permanent_reservation_disable_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      permanent_reservation_weekday: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      permanent_reservation_start_hour_UTC: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      permanent_reservation_end_hour_UTC: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      permanent_reservation_lesson_duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      payment_balance: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      special_discount: {
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
      foreignKey: "user_id",
      allowNull: false,
    });
  };

  return PlanInfo;
};
