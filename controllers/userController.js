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
      res.status(201).json({
        status: true,
        message: "sigin succesfully",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
}

//login handler
async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    // if (!email.length || !password.length) {
    //   return res
    //     .status(400)
    //     .json({ status: false, message: "Email or password cannot be empty" });
    // }
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

    res.status(201).json({
      status: true,
      message: "login successsfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
}

module.exports = { userRegister, userLogin };
