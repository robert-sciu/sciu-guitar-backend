module.exports = (sequelize, DataTypes) => {
  const PageImage = sequelize.define(
    "PageImage",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      imageName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "image_name",
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filepathDesktop: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "filepath_desktop",
      },
      filepathMobile: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "filepath_mobile",
      },
      filepathLazy: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "filepath_lazy",
      },
    },
    {
      timestamps: false,
      createAt: false,
    }
  );

  return PageImage;
};
