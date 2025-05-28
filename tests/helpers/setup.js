require("dotenv").config();
const { sequelize } = require("../../models");

module.exports = async () => {
  await sequelize.sync({ force: true });
  // const insertSampleData = require("../../data/init");
  // await insertSampleData();
};
