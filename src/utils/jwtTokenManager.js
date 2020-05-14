const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

exports.userTokenGenerator = (email = "") => {
  const token = jwt.sign({ sub: "user", email }, jwtKey, {
    expiresIn: "3 hours"
  });
  return token;
};

exports.userTokenValidator = (token = "") => {
  try {
    return jwt.verify(token, jwtKey);
  } catch (e) {
    console.error(e);
  }
};
