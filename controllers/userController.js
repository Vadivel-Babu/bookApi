const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const getToken = require("../utils/generateToken");

//handle registeration
async function userRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ name, email });
    if (user) {
      return res.status(409).json({
        status: false,
        message: "User already exsist",
      });
    }

    if (!user) {
      const hashpassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashpassword });
      await newUser.save();
      return res.status(201).json({
        status: true,
        message: "sigin succesfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
}

//login handler
async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not exisist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Incorrect Password" });
    }

    const token = getToken(user._id);

    return res.status(201).json({
      status: true,
      message: "login successsfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
}

module.exports = { userRegister, userLogin };
