const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/app");
const should = chai.should();
chai.use(chaiHttp);

const agent = chai.request.agent(server);
const Users = require("../server/components/User/UserModel");
const UserRepo = require("../server/components/User/UserRepo");
const Job = require("../server/components/Job/JobModel");
const JobRepo = require("../server/components/Job/JobRepo");
const Location = require("../server/components/Location/LocationModel");
const dbConnection = require("../server/db/connection");
const logger = require("../server/utils/logger");

const jobReq = {
  title: "Job 1",
  employer: "Test Employer 1",
  description: "Apply today for Job 1 @ Test Employer 1",
  city: "Atlanta",
  state: "GA",
};

const sampleJobs = [
  {
    title: "Job A",
    employer: "Test Employer 1",
    description: "Apply today for Job A @ Test Employer 1",
    city: "Atlanta",
    state: "GA",
  },
  {
    title: "Job B",
    employer: "Test Employer 1",
    description: "Apply today for Job B @ Test Employer 1",
    city: "Austin",
    state: "TX",
  },
  {
    title: "Job C",
    employer: "Test Employer 2",
    description: "Apply today for Job C @ Test Employer 2",
    city: "Houston",
    state: "TX",
  },
  {
    title: "Job D",
    employer: "Test Employer 3",
    description: "Apply today for Job D @ Test Employer 3",
    city: "Austin",
    state: "TX",
  },
];

const userReq = {
  email: "doom@doom.net",
  password: "d00mTest12",
  passwordConfirm: "d00mTest12",
};

let newJob;

before((done) => {
  dbConnection
    .sync({ alter: true, force: true })
    .then(() => {
      logger.info("Successfully synced the DB");
      done();
    })
    .catch((err) => {
      logger.error("Error syncing the DB");
      logger.error(err);
      done(false);
    });
});

describe("Jobs", () => {
  before(async () => {
    await Users.destroy({
      where: {},
    });
    await Job.destroy({
      where: {},
    });
    await Location.destroy({
      where: {},
    });
    const hashedPass = await UserRepo.hashPassword(userReq.password);
    const newUser = await UserRepo.createNewUser({
      email: userReq.email.toLowerCase(),
      password: hashedPass,
    });
    newJob = await JobRepo.createJob({ ...jobReq, UserId: newUser.id });
    const testUser = await UserRepo.createNewUser({
      email: "testuser@test.com",
      password: hashedPass,
    });
    sampleJobs.forEach(async (job) => {
      await JobRepo.createJob({ ...job, UserId: testUser.id });
    });
  });

  describe("Unauthenticated User", () => {
    it("Get all Jobs - Return error", (done) => {
      agent.get("/api/jobs").end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("success");
        res.body.success.should.equal(false);
        res.body.should.have.property("error");
        res.body.error.should.equal("Token not found in header.");
        done();
      });
    });

    it("Create new job - Return error", (done) => {
      agent
        .post("/api/jobs/")
        .send({ ...jobReq, title: "Job 2" })
        .end((_createErr, resCreate) => {
          resCreate.should.have.status(404);
          resCreate.body.should.have.property("success");
          resCreate.body.success.should.equal(false);
          resCreate.body.should.have.property("error");
          resCreate.body.error.should.equal("Token not found in header.");
          done();
        });
    });

    it("Get Job By Id - Return Error", (done) => {
      agent.get(`/api/jobs/${newJob.id}`).end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("success");
        res.body.success.should.equal(false);
        res.body.should.have.property("error");
        res.body.error.should.equal("Token not found in header.");
        done();
      });
    });
  });

  describe("Guest User", () => {
    it("Create new job - Return error", (done) => {
      agent.get("/auth/defaultUser").end((_loginErr, getUserRes) => {
        getUserRes.should.have.status(200);
        getUserRes.body.should.have.property("token");
        getUserRes.body.should.have.property("success");
        getUserRes.body.success.should.equal(true);
        const token = getUserRes.body.token;

        agent
          .post("/api/jobs/")
          .send({ ...jobReq, title: "Job 2" })
          .set("authorization", `Token ${token}`)
          .end((_createErr, resCreate) => {
            resCreate.should.have.status(404);
            resCreate.body.should.have.property("success");
            resCreate.body.success.should.equal(false);
            resCreate.body.should.have.property("error");
            resCreate.body.error.should.contain("Unauthorized operation");
            done();
          });
      });
    });

    it("Get all Jobs - Return user's jobs", (done) => {
      agent.get("/auth/defaultUser").end((_loginErr, getUserRes) => {
        getUserRes.should.have.status(200);
        getUserRes.body.should.have.property("token");
        getUserRes.body.should.have.property("success");
        getUserRes.body.success.should.equal(true);
        const token = getUserRes.body.token;
        agent
          .get("/api/jobs/")
          .set("authorization", `Token ${token}`)
          .end((_getErr, resGet) => {
            resGet.body.should.have.property("success");
            resGet.body.success.should.equal(true);
            resGet.body.should.have.property("jobs");
            resGet.body.jobs.length.should.equal(1);
            resGet.body.jobs[0].description.should.contain("Test Employer");
            done();
          });
      });
    });

    it("Get Job By Id - Return job", (done) => {
      agent.get("/auth/defaultUser").end((_loginErr, getUserRes) => {
        getUserRes.should.have.status(200);
        getUserRes.body.should.have.property("token");
        getUserRes.body.should.have.property("success");
        getUserRes.body.success.should.equal(true);
        const token = getUserRes.body.token;

        agent
          .get(`/api/jobs/${newJob.id}`)
          .set("authorization", `Token ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("success");
            res.body.success.should.equal(true);
            res.body.should.have.property("job");
            res.body.job.id.should.equal(newJob.id);
            done();
          });
      });
    });
  });

  describe("Authenticated User", () => {
    before(async () => {
      const hashedPass = await UserRepo.hashPassword(userReq.password);
      await UserRepo.createNewUser({
        email: userReq.email.toLowerCase(),
        password: hashedPass,
      });
    });

    it("Create new job - Return job", (done) => {
      agent
        .post("/auth/login")
        .send({ email: userReq.email, password: userReq.password })
        .end((_loginErr, loginRes) => {
          loginRes.should.have.status(200);
          loginRes.body.should.have.property("success");
          loginRes.body.success.should.equal(true);
          loginRes.body.should.have.property("token");
          const token = loginRes.body.token;
          agent
            .post("/api/jobs/")
            .set("authorization", `Token ${token}`)
            .send({ ...jobReq, title: "Job 2" })
            .end((_createErr, resCreate) => {
              resCreate.should.have.status(200);
              resCreate.body.should.have.property("success");
              resCreate.body.success.should.equal(true);
              resCreate.body.success.should.equal(true);
              resCreate.body.should.have.property("job");
              resCreate.body.job.title.should.equal("Job 2");
              done();
            });
        });
    });

    it("Get all Jobs - Return user's jobs", (done) => {
      agent
        .post("/auth/login")
        .send({ email: userReq.email, password: userReq.password })
        .end((_loginErr, loginRes) => {
          loginRes.should.have.status(200);
          loginRes.body.should.have.property("token");
          loginRes.body.should.have.property("success");
          loginRes.body.success.should.equal(true);
          const token = loginRes.body.token;
          agent
            .get("/api/jobs/")
            .set("authorization", `Token ${token}`)
            .end((_getErr, resGet) => {
              resGet.body.should.have.property("success");
              resGet.body.success.should.equal(true);
              resGet.body.should.have.property("jobs");
              resGet.body.jobs[0].description.should.contain("Test Employer");
              done();
            });
        });
    });

    it("Get Job By Id - Return job", (done) => {
      agent
        .post("/auth/login")
        .send({ email: userReq.email, password: userReq.password })
        .end((_loginErr, loginRes) => {
          loginRes.should.have.status(200);
          loginRes.body.should.have.property("success");
          loginRes.body.success.should.equal(true);
          loginRes.body.should.have.property("token");
          const token = loginRes.body.token;

          agent
            .get(`/api/jobs/${newJob.id}`)
            .set("authorization", `Token ${token}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property("success");
              res.body.success.should.equal(true);
              res.body.should.have.property("job");
              res.body.job.id.should.equal(newJob.id);
              done();
            });
        });
    });
  });
});
