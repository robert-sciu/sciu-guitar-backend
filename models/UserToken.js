module.exports = (sequelize, DataTypes) => {
  const UserToken = sequelize.define(
    "UserToken",
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
      type: {
        type: DataTypes.ENUM(
          "refresh",
          "verification",
          "activation",
          "password_reset"
        ),
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "expires_at",
      },
      revoked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
  UserToken.associate = (models) => {
    UserToken.belongsTo(models.User, {
      foreignKey: "userId",
      allowNull: false,
    });
  };

  return UserToken;
};
