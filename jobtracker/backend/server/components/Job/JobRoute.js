const { handleError } = require("../../utils/errors");
const JobRepo = require("./JobRepo");
const router = require("express").Router(),
  { verifyToken, checkPermissions } = require("../../utils/tokenHandler");

// Get all Jobs
router.get("/api/jobs", verifyToken, async (req, res) => {
  try {
    const { userId } = req.body;
    const allJobs = await JobRepo.getAllJobs(userId);
    return res.status(200).json({ jobs: allJobs });
  } catch (error) {
    handleError(res, 400, error);
  }
});

// Get Job By Id
router.get("/api/jobs/:jobId", verifyToken, async (req, res) => {
  const { jobId } = req.params;
  try {
    const foundJob = await JobRepo.getJobById(jobId);
    return res.status(200).json({ job: foundJob });
  } catch (error) {
    handleError(res, 400, error);
  }
});

// Create a new Job
router.post("/api/jobs", verifyToken, checkPermissions, async (req, res) => {
  try {
    const newJob = await JobRepo.createJob(req.body);
    return res.status(200).json({ job: newJob });
  } catch (error) {
    handleError(res, 400, error);
  }
});

// Delete Job By Id
router.delete(
  "/api/jobs/:jobId",
  verifyToken,
  checkPermissions,
  async (req, res) => {}
);

module.exports = router;