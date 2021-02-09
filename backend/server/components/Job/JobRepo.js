const dbConnection = require("../../db/connection"),
  Job = require("./JobModel"),
  Location = require("../Location/LocationModel"),
  { getLocation } = require("../Location/LocationRepo");

async function getAllJobs(UserId) {
  try {
    const Jobs = await Job.findAll({
      where: {
        UserId,
      },
      attributes: ["title", "employer", "city", "state", "id"],
      include: {
        model: Location,
        as: "Location",
        attributes: ["latitude", "longitude"],
      },
    });
    return Jobs;
  } catch (error) {
    throw new Error(`Could not get all Jobs - ${error}`);
  }
}

async function getJobById(jobId) {
  try {
    const job = await Job.findByPk(jobId, {
      attributes: [
        "title",
        "employer",
        "description",
        "apply_date",
        "city",
        "state",
      ],
      include: {
        model: Location,
        as: "Location",
        attributes: ["latitude", "longitude"],
      },
    });
    return job ? job : null;
  } catch (error) {
    throw new Error(`Could not get Job By Id - ${error}`);
  }
}

async function getJobsByLocation(params) {
  const { city, state, UserId } = params;
  try {
    const job = await Job.findOne({
      where: {
        UserId,
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
    const { city, state } = params;
    const job = await dbConnection.transaction(async (t) => {
      const newLocation = await getLocation({ city, state });
      const newJob = await Job.create(params, { transaction: t });
      await newJob.setLocation(newLocation, { transaction: t });
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
