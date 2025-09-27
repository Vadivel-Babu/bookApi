const router = require("express").Router();
const { userRegister, userLogin } = require("../controllers/userController");
const validateUser = require("../middleware/userValidator");
router.post("/register", validateUser, userRegister);
router.post("/login", validateUser, userLogin);
module.exports = router;
