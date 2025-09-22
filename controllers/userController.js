async function userRegister(req, res) {
  try {
    res.send("User Registered");
  } catch (error) {
    console.log(error);
  }
}

async function userLogin(req, res) {
  try {
    res.send("User Login");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { userRegister, userLogin };
