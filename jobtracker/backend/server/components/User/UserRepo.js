const User = require("./UserModel"),
  bcrypt = require("bcrypt");

async function getUserByEmail(emailId) {
  try {
    let user = await User.findOne({
      where: {
        email: emailId,
      },
    });
    return user ? user : null;
  } catch (error) {
    throw new Error(`Could not find if user exists - ${error}`);
  }
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function createNewUser(params) {
  try {
    const user = await User.create(params);
    return user ? user : null;
  } catch (error) {
    throw new Error(`Could not create new user - ${error}`);
  }
}

async function getUserById(Id) {
    try {
      let user = await User.findOne({
        where: {
          Id,
        },
      });
      return user ? user : null;
    } catch (error) {
      throw new Error(`Could not find if user exists - ${error}`);
    }
  }

module.exports = {
  getUserByEmail,
  hashPassword,
  createNewUser,
  getUserById
};
