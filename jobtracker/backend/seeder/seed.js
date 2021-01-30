const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

if (process.env.NODE_ENV === "PRODUCTION") {
  dotenv.config({ path: "./.env.prod" });
} else if (process.env.NODE_ENV === "TEST") {
  dotenv.config({ path: "./.env.test" });
}

const connectDB = require("../server/db/dbHelper");

const Job = require("../server/components/Job/JobModel");
const Users = require("../server/components/User/UserModel");
const JobRepo = require("../server/components/Job/JobRepo");
const UserRepo = require("../server/components/User/UserRepo");
const Location = require("../server/components/Location/LocationModel");
const { sampleJobs, userReq } = require("./seedData");
const logger = require("../server/utils/logger");

const destroyData = async (exit) => {
  try {
    await Location.destroy({ where: {} });
    await Job.destroy({ where: {} });
    await Users.destroy({ where: {} });
    logger.info("Everything is deleted");
    if (exit) {
      process.exit(1);
    }
    return;
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

const seedData = async (exit) => {
  try {
    const hashedPass = await UserRepo.hashPassword(userReq.password);
    const newUser = await UserRepo.createNewUser({
      email: userReq.email.toLowerCase(),
      password: hashedPass,
    });

    await Promise.all(
      sampleJobs.map(async (job) => {
        await JobRepo.createJob({ ...job, userId: newUser.id });
      })
    );
    const foundJob = await Job.findOne({
      where: {
        title: "Software Engineer",
        employer: "Google",
      },
    });

    logger.info("Seeder completed", {
      type: "seeder_completed",
      jobId: foundJob.id,
      title: foundJob.title,
      employer: foundJob.employer,
    });

    if (exit) {
      process.exit(1);
    }
    return;
  } catch (error) {
    logger.error(`Seeder error - ${error}`);
    process.exit(1);
  }
};

if (process.env.NODE_ENV === "dev") {
  connectDB();

  if (process.argv[2] === "-d") {
    destroyData(true);
  } else if (process.argv[2] === "-i") {
    seedData(true);
  } else {
    destroyData(false);
    seedData(true);
  }
}
