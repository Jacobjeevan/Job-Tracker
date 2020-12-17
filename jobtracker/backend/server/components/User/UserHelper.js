const {
  generateToken,
  getTokenFromHeader,
} = require("../../utils/tokenHandler");
const { getUserByEmail } = require("./UserRepo");

const addDefaultUser = async (req, res, next) => {
  // Check if token exists, if not get default User, generate token and attach
  let token = getTokenFromHeader(req);
  if (token) {
    next();
  } else {
    try {
      const user = await getUserByEmail("testUser@test.com");
      req.headers.authorization = `Token ${generateToken(user.id, true)}`;
      next();
    } catch (error) {
      throw new Error(`Could not add Default user - ${error}`);
    }
  }
};

module.exports = {
  addDefaultUser,
};
