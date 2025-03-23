module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tagName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "tag_name",
      },
    },
    {
      timestamps: false,
    }
  );

  // Tag.associate = (models) => {
  //   Tag.belongsToMany(models.Task, {
  //     through: models.TaskTag,
  //     foreignKey: "tag_id",
  //     otherKey: "task_id",
  //     allowNull: false,
  //   });
  // };
  return Tag;
};
