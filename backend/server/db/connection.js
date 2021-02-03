const { Sequelize } = require("sequelize");
const logger = require("../utils/logger");

if (process.env.NODE_ENV !== "PRODUCTION") {
  logger.debug(process.env.DATABASE_URL);
  logger.debug(process.env.MAP_URL);
}

const dbConnection = new Sequelize(`${process.env.DATABASE_URL}`, {
  dialect: "postgres",
  logging: false,
});

module.exports = dbConnection;
