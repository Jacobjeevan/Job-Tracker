const router = require("express").Router(),
  bcrypt = require("bcrypt"),
  UserRepo = require("./UserRepo"),
  { handleError } = require("../../utils/errors"),
  {
    generateToken,
    verifyToken,
    getTokenFromHeader,
  } = require("../../utils/tokenHandler"),
  { addDefaultUser } = require("./UserHelper");

router.get(
  ["/user/", "/defaultUser"],
  addDefaultUser,
  verifyToken,
  async (req, res) => {
    try {
      const { UserId } = req.body;
      const user = await UserRepo.getUserById(UserId);
      const token = getTokenFromHeader(req);
      return res.status(200).json({ success: true, user: user, token: token });
    } catch (error) {
      handleError(res, 403, "Could not get user");
    }
  }
);

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserRepo.getUserByEmail(email.toLowerCase());
    if (user) {
      handleError(res, 403, "Email is taken - User already exists");
    } else {
      const hashedPass = await UserRepo.hashPassword(password);
      user = await UserRepo.createNewUser({
        email: email.toLowerCase(),
        password: hashedPass,
      });
      return res
        .status(200)
        .json({ success: true, token: generateToken(user.id, false) });
    }
  } catch (error) {
    handleError(res, 400, error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserRepo.getUserByEmail(email.toLowerCase());
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return res
          .status(200)
          .json({ success: true, token: generateToken(user.id, false) });
      }
    }
    handleError(res, 403, "Email/password incorrect");
  } catch (error) {
    handleError(res, 400, error);
  }
});

router.get("/logout", (req, res) => {
  res.status(200).json("Logout successful");
});

module.exports = router;
