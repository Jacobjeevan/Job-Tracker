const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/app");
const should = chai.should();
chai.use(chaiHttp);

const agent = chai.request.agent(server);
const Users = require("../server/components/User/UserModel");
const UserRepo = require("../server/components/User/UserRepo");
const dbConnection = require("../server/db/connection");

const userReq = {
  email: "doom@doom.net",
  password: "d00mTest12",
  passwordConfirm: "d00mTest12",
};

beforeEach(async () => {
  await Users.destroy({
    where: {},
  });
});

describe("Users", () => {
  it("Register route - Should return a token", (done) => {
    agent
      .post("/auth/register")
      .send(userReq)
      .end((_registerErr, registerRes) => {
        registerRes.should.have.status(200);
        registerRes.body.should.have.property("token");
        done();
      });
  });

  describe("Authenticated User", () => {
    beforeEach(async () => {
      const hashedPass = await UserRepo.hashPassword(userReq.password);
      await UserRepo.createNewUser({
        email: userReq.email.toLowerCase(),
        password: hashedPass,
      });
    });

    afterEach((done) => {
      agent.get("/auth/logout").end((_loginErr, logoutRes) => {
        logoutRes.should.have.status(200);
        done();
      });
    });

    it("Login route - Should return a token", (done) => {
      agent
        .post("/auth/login")
        .send({ email: userReq.email, password: userReq.password })
        .end((_loginErr, loginRes) => {
          loginRes.should.have.status(200);
          loginRes.body.should.have.property("token");
          done();
        });
    });

    it("Token should return a User", (done) => {
      agent
        .post("/auth/login")
        .send({ email: userReq.email, password: userReq.password })
        .end((_loginErr, loginRes) => {
          loginRes.should.have.status(200);
          loginRes.body.should.have.property("token");
          const token = loginRes.body.token;

          agent
            .get("/auth/user")
            .set("authorization", `Token ${token}`)
            .end((_getUserErr, getUserRes) => {
              getUserRes.should.have.status(200);
              getUserRes.body.should.have.property("user");
              getUserRes.body.should.have.property("token");
              getUserRes.body.token.should.be.equal(token);
              done();
            });
        });
    });
  });

  //it("Auth route - Token should return user account", (done) => {});
});
