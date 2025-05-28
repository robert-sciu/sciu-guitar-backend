const logger = require("../utilities/logger");

module.exports = {
  development: {
    postgres: {
      options: {
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        dialect: "postgres",
        logging: (msg) => {
          if (msg.includes("ERROR")) {
            logger.error(msg);
          }
        },
      },
    },
  },
  test: {
    postgres: {
      options: {
        port: process.env.DB_PORT,
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_DATABASE,
        dialect: "postgres",
        logging: (msg) => {
          if (msg.includes("ERROR")) {
            logger.error(msg);
          }
        },
      },
    },
  },
};
