const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  if (token) {
    try {
      //token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);

      const user = await User.findById(decode.id).select("-password");
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ status: false, message: "Not authorized" });
    }
  }
  if (!token) {
    return res.status(401).json({ status: false, message: "No token" });
  }
};

module.exports = auth;
