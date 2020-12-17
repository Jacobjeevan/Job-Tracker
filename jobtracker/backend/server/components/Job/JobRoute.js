const { defaultUser } = require("./JobHelper");

const router = require("express").Router(),
  Job = require("./JobModel"),
  Location = require("../Location/LocationModel"),
  { addDefaultUser, validateToken } = require("./JobHelper");

// Get all Jobs
router.get("/api/jobs", addDefaultUser, validateToken, async (req, res) => {});

// Get Job By Id
router.get("/api/jobs/:jobId", validateToken, async (req, res) => {});

// Create a new Job
router.post("/api/jobs", validateToken, async (req, res) => {});

// Delete Job By Id
router.delete("/api/jobs/:jobId", validateToken, async (req, res) => {});
