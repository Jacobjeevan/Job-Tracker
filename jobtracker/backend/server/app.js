const express = require("express"),
  cors = require("cors"),
  helmet = require("helmet"),
  dotenv = require("dotenv"),
  log4js = require("log4js"),
  logger = require("./utils/logger"),
  morgan = require("morgan");

dotenv.config({ path: "./.env" });

if (process.env.NODE_ENV === "PRODUCTION") {
  dotenv.config({ path: "./.env.prod" });
} else if (process.env.NODE_ENV === "TEST") {
  dotenv.config({ path: "./.env.test" });
}

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}
app.use(log4js.connectLogger(logger, { level: "info" }));

const connectDB = require("./db/dbHelper");

app.use(express.json());

connectDB();

const UserRouter = require("./components/User/UserRoute");
const JobRouter = require("./components/Job/JobRoute");

app.use("/api/", JobRouter);
app.use("/auth/", UserRouter);

app.listen(port, () => {
  logger.info(`Server is currently running on port: ${port}`);
});

module.exports = app;
