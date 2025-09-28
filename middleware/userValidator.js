function validateUser(req, res, next) {
  const { name, email, password } = req.body;

  if (name !== undefined && !name.trim().length) {
    return res.status(400).json({
      status: false,
      message: "name cannot be empty",
    });
  }

  if (!email.trim().length || !password.trim().length) {
    return res.status(400).json({
      status: false,
      message: "Email or password cannot be empty",
    });
  }
  const isValidmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
  if (!isValidmail.test(email)) {
    return res
      .status(400)
      .json({ status: false, message: "Invalid Email Format" });
  }
  next();
}

module.exports = validateUser;
