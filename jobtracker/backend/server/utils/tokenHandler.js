var nJwt = require("njwt");
const signingKey = process.env.TOKEN_SECRET;
const { handleError } = require("./errors");

const claims = (userId, isDefaultUser) => {
  let scope = "user";
  if (isDefaultUser) scope = "testUser";
  return {
    iss: `${BACKEND_URL}`,
    sub: userId,
    scope,
  };
};

const generateToken = (userId, isDefaultUser) => {
  const tokenClaim = claims(userId, isDefaultUser);
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
        console.log(err); // Token has expired, has been tampered with, etc
        handleError(res, 404, "Token could be validated. Please login again.");
      } else {
        const { scope, sub } = verifiedJwt.body;
        req.body.scope = scope;
        req.body.userId = sub;
        console.log(verifiedJwt); // Will contain the header and body
        next();
      }
    });
  } else {
    return handleError(res, 404, "Token not found in header.");
  }
};

module.exports = {
  generateToken,
  verifyToken,
  getTokenFromHeader,
};
