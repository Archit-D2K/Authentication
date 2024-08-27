const { signup, login } = require("../controllers/authController");
const { signupvalidation, loginvalidation } = require("../middlewares/AuthValidation");

const router = require("express").Router()




router.post("/signup",signupvalidation,signup);
router.post("/login",loginvalidation,login);
module.exports = router

