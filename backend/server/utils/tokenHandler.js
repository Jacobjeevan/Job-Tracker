var nJwt = require("njwt");
const signingKey = process.env.TOKEN_SECRET;
const { handleError } = require("./errors");
const logger = require("./logger");

const claims = (UserId, isDefaultUser) => {
  let scope = "user";
  if (isDefaultUser) scope = "testUser";
  return {
    iss: `${process.env.BACKEND_URL}`,
    sub: UserId,
    scope,
  };
};

const generateToken = (UserId, isDefaultUser) => {
  const tokenClaim = claims(UserId, isDefaultUser);
  var jwt = nJwt.create(tokenClaim, signingKey);
  var token = jwt.compact();
  return token;
};

const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Token"
  ) {
    let token = req.headers.authorization.split(" ")[1];
    return token ? token : null;
  }
};

const verifyToken = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (token) {
    nJwt.verify(token, signingKey, function (err, verifiedJwt) {
      if (err) {
        logger.error(err); // Token has expired, has been tampered with, etc
        handleError(
          res,
          404,
          "Token could not be validated. Please login again."
        );
      } else {
        const { scope, sub } = verifiedJwt.body;
        req.body.scope = scope;
        req.body.UserId = sub;
        logger.debug(verifiedJwt); // Will contain the header and body
        next();
      }
    });
  } else {
    return handleError(res, 404, "Token not found in header.");
  }
};

const checkPermissions = (req, res, next) => {
  const { scope } = req.body;
  if (scope === "user") {
    next();
  } else {
    return handleError(
      res,
      404,
      "Unauthorized operation - You don't have permission to do that!"
    );
  }
};

module.exports = {
  generateToken,
  verifyToken,
  getTokenFromHeader,
  checkPermissions,
};
