const { Sequelize } = require("sequelize");

const dbConnection = new Sequelize(`${process.env.DATABASE_URL}`, {
  dialect: "postgres",
  logging: false,
});

module.exports = dbConnection;
