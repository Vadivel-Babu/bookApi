const jwt = require("jsonwebtoken");

function getToken(id) {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
}

module.exports = getToken;
