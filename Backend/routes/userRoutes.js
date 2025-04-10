const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController"); // Import controllers
const {sendOTP,verifyOTP} = require("../controllers/OtpController2");
const {createUser,updateUser,deleteUser,searchUser} = require('../controllers/profileController');



router.get("/search", searchUser);
router.delete("/deleteuser/:userid", deleteUser);
router.put("/updateuser/:userid", updateUser);
router.post("/signup", createUser);
router.post("/login", login);
router.post('/sendOTP',sendOTP);
router.post('/verifyOTP',verifyOTP);
module.exports = router;