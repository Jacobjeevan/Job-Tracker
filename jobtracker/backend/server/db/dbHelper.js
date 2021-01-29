const dbConnection = require("./connection");

const connectDB = () => {
  try {
    dbConnection.authenticate().then(() => {
      console.log("Succesfully connected to Database.");
      const syncDB = async () => {
        await dbConnection.sync({ alter: true });
        console.log("Synchronized DB");
      };
      syncDB();
    });
  } catch (error) {
    console.log("Unable to connect to Database.");
  }
};

module.exports = connectDB;
