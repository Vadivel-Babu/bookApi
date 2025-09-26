const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const getToken = require("../utils/generateToken");

//handle registeration
async function userRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!email.length || !password.length || !name.length) {
      return res
        .status(400)
        .json({ message: "Email or password or name cannot be empty" });
    }
    const isValidmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!isValidmail.test(email)) {
      return res.status(400).json({ message: "Invalid Email Format" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        message: "Email already exsist",
      });
    }

    if (!user) {
      const hashpassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashpassword });
      await newUser.save();
      return res.status(201).json({
        message: "sigin succesfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "An internal server error occurred.",
    });
  }
}

//login handler
async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email.length || !password.length) {
      return res
        .status(400)
        .json({ message: "Email or password cannot be empty" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not exisist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = getToken(user._id);

    res.status(201).json({
      message: "login successsfully",
      token,
    });
  } catch (error) {
    res.status(404).json({
      message: "An internal server error occurred.",
    });
  }
}

module.exports = { userRegister, userLogin };
