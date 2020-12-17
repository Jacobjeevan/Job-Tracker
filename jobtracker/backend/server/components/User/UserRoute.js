const router = require("express").router(),
  bcrypt = require("bcrypt"),
  { handleError } = require("../../utils/errors"),
  { getUserByEmail, hashPassword, createNewUser } = require("./UserRepo"),
  { generateToken } = require("../../utils/tokenHandler");

// If there is no user, create new token with default/test user (limited scope)
router.get("/user", async (req, res) => {});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await getUserByEmail(email.toLowerCase());
    if (user) {
      handleError(res, 403, "Email is taken - User already exists");
    } else {
      const hashedPass = await hashPassword(password);
      user = await createNewUser({
        email: email.toLowerCase(),
        password: hashedPass,
      });
      return res.status(200).json({ token: generateToken(user.id, false) });
    }
  } catch (error) {
    handleError(res, 400, error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email.toLowerCase());
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return res.status(200).json({ token: generateToken(user.id, false) });
      }
    }
    handleError(res, 403, "Username/password incorrect");
  } catch (error) {
    handleError(res, 400, error);
  }
});

router.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = router;
