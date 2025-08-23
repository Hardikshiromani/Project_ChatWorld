const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController"); // Import authentication controller
const { sendOTP, verifyOTP } = require("../controllers/OtpController2"); // Import OTP controllers
const { createUser, updateUser, deleteUser, searchUser, searchByUsername, uploadPic } = require("../controllers/profileController"); // Import profile controllers
const multer = require("multer");
// **User Management Routes**

// Search user by ID
router.get("/search/:userId", searchUser);

// Delete user account
router.delete("/deleteuser/:userid", deleteUser);

// Update user profile (Includes profile photo upload)
// router.put("/updateuser/:userid",updateUser);
router.put("/update/:userid", uploadPic.single("profilePhoto"), updateUser);


// **Authentication Routes**

// User signup (Includes profile photo upload)
// router.post("/signup", createUser);
router.post("/create", uploadPic.single("profilePhoto"), createUser);


// User login
router.post("/login", login);

// **OTP Management Routes**

// Send OTP for verification
router.post("/sendOTP", sendOTP);

// Verify OTP
router.post("/verifyOTP", verifyOTP);


router.get("/Users",searchByUsername);
// Export router configuration
module.exports = router;