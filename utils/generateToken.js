const jwt = require("jsonwebtoken");

function getToken(id) {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "2h",
  });
}

module.exports = getToken;
