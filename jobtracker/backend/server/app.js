const express = require("express"),
  cors = require("cors"),
  helmet = require("helmet"),
  dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

if (process.env.NODE_ENV === "PRODUCTION") {
  dotenv.config({ path: "./.env.prod" });
} else if (process.env.NODE_ENV === "TEST") {
  dotenv.config({ path: "./.env.test" });
}

const dbConnection = require("./db/connection");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

try {
  dbConnection.authenticate().then(() => {
    console.log("Succesfully connected to Database.");
  });
} catch (error) {
  console.log("Unable to connect to Database.");
}

const UserRouter = require("./components/User/UserRoute");
const JobRouter = require("./components/Job/JobRoute");

app.use("/api/", JobRouter);
app.use("/auth/", UserRouter);

app.listen(port, () => {
  console.log(`Server is currently running on port: ${port}`);
});

module.exports = app;
