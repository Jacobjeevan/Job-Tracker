const logger = require("../utils/logger");
const dbConnection = require("./connection");

const connectDB = async () => {
  try {
    await dbConnection.authenticate();
    logger.info(
      `Succesfully connected to Database on port: ${process.env.POSTGRES_PORT}`
    );
    if (process.env.NODE_ENV !== "TEST") {
      await dbConnection.sync({ alter: true });
      logger.info("Synchronized DB");
    }
  } catch (error) {
    logger.error("Unable to connect to Database.");
  }
};

module.exports = connectDB;
