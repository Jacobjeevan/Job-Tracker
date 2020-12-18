const dbConnection = require("../../db/connection"),
  Job = require("./JobModel"),
  { getUserById } = require("../User/UserRepo"),
  { getLocation } = require("../Location/LocationRepo");


async function getAllJobs(userId) {
  try {
    const user = await getUserById(userId);
    const allJobs = await user.getJobs();
    return allJobs;
  } catch (error) {
    throw new Error(`Could not get all Jobs - ${error}`);
  }
}

async function getJobById(jobId) {
  try {
    const job = Job.findOne({
      where: {
        id: jobId,
      },
    });
    return job ? job : null;
  } catch (error) {
    throw new Error(`Could not get Job By Id - ${error}`);
  }
}

async function createJob(params) {
  try {
    const { city, state, userId } = params;
    const job = await dbConnection.transaction(async (t) => {
      const newLocation = await getLocation(city, state);
      const author = await getUserById(userId);
      const newJob = await Job.create(params, { transaction: t });
      await newJob.setLocation(newLocation, { transaction: t });
      await newJob.setAuthor(author, { transaction: t });

      return newJob;
    });
    return job;
  } catch (error) {
    throw new Error(`Could not create new Job - ${error}`);
  }
}

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
};
