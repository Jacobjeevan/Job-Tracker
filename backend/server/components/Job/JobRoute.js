const { handleError } = require("../../utils/errors");
const JobRepo = require("./JobRepo");
const router = require("express").Router(),
  { verifyToken, checkPermissions } = require("../../utils/tokenHandler");

// Get all Jobs
router.get("/jobs", verifyToken, async (req, res) => {
  try {
    const { UserId } = req.body;
    const allJobs = await JobRepo.getAllJobs(UserId);
    return res.status(200).json({ success: true, jobs: allJobs });
  } catch (error) {
    handleError(res, 400, error);
  }
});

// Get Job By Id
router.get("/jobs/:jobId", verifyToken, async (req, res) => {
  const { jobId } = req.params;
  try {
    const foundJob = await JobRepo.getJobById(jobId);
    return res.status(200).json({ success: true, job: foundJob });
  } catch (error) {
    handleError(res, 400, error);
  }
});

// Create a new Job
router.post("/jobs/", verifyToken, checkPermissions, async (req, res) => {
  const { UserId } = req.body;
  try {
    const newJob = await JobRepo.createJob({ ...req.body, UserId });
    return res.status(200).json({ success: true, job: newJob });
  } catch (error) {
    handleError(res, 400, error);
  }
});

// Delete Job By Id
router.delete(
  "/jobs/:jobId",
  verifyToken,
  checkPermissions,
  async (req, res) => {
    const { jobId } = req.params;
    try {
      await JobRepo.deleteJobById(jobId);
      return res.status(200).json({ success: true });
    } catch (error) {
      handleError(res, 400, error);
    }
  }
);

module.exports = router;
