const logger = require("../utils/logger");
const dbConnection = require("./connection");

const connectDB = () => {
  try {
    dbConnection.authenticate().then(() => {
      logger.info("Succesfully connected to Database.");
      const syncDB = async () => {
        await dbConnection.sync({ alter: true });
        logger.info("Synchronized DB");
      };
      syncDB();
    });
  } catch (error) {
    logger.error("Unable to connect to Database.");
  }
};

module.exports = connectDB;
