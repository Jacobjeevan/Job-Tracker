const dbConnection = require("../../db/connection"),
  Job = require("./JobModel"),
  { getUserById } = require("../User/UserRepo"),
  { getLocation } = require("../Location/LocationRepo");

async function getAllJobs(userId) {
  try {
    const allJobs = await Job.findAll({
      where: {
        author: userId,
      },
    });
    return allJobs;
  } catch (error) {
    throw new Error(`Could not get all Jobs - ${error}`);
  }
}

async function getJobById(jobId) {
  try {
    const job = await Job.findOne({
      where: {
        id: jobId,
      },
    });
    return job ? job : null;
  } catch (error) {
    throw new Error(`Could not get Job By Id - ${error}`);
  }
}

async function getJobsByLocation(params) {
  const { city, state, userId } = params;
  try {
    const job = await Job.findOne({
      where: {
        author: userId,
        city,
        state,
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
      const newLocation = await getLocation({ city, state });
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

async function deleteJobById(jobId) {
  try {
    await Job.destroy({
      where: {
        id: jobId,
      },
    });
    return true;
  } catch (error) {
    throw new Error(`Could not get Job By Id - ${error}`);
  }
}

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  deleteJobById,
};
