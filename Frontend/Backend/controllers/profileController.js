const { profile } = require("console"); // Import console profile (not used here)
const Users = require("../models/userModel"); // Import user model
const multer = require("multer"); // Import Multer for handling file uploads
const path = require("path"); // Import path module for file operations
const fs = require("fs");
require("dotenv").config(); // Load environment variables from .env file
// const {upload}= require("../controllers/uploadController")
const { v2: cloudinary } = require("cloudinary");

// **Profile Photo Upload Configuration**
const dpStorage = multer.diskStorage({
  destination: "./uploads/dp/", // Folder where profile pictures are stored
  filename: (req, file, cb) => {
    cb(null, `dp-${Date.now()}-${file.originalname}`); // Generate unique filename
  },
});
const uploadPic= multer({ storage: dpStorage }); // Configure Multer for profile photo uploads

// **Create New User**
const createUser = async (req, res) => {
  try {
    const { username, password, bio, DOB } = req.body; // Extract user details from request body
    let profilePhoto = null;

    // Check if profile picture is uploaded
    // if (req.file) {
    //   profilePhoto = `/uploads/dp/${req.file.filename}`;
    // }

    if (req.file) {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "chatApp/dp",
  });
  fs.unlinkSync(req.file.path); // delete local temp file
  profilePhoto = result.secure_url;
}

    // Create new user with provided details
    const newUser = await Users.create({
      username,
      password,
      bio,
      DOB,
      // phoneNumber,
      profilePhoto,
    });

    await newUser.save(); // Save user data to database
    res.status(200).json({ message: "User Created Successfully", data: newUser });
  } 
  // catch (error) {
  //   res.status(500).json({ message: "Internal server error", error: error.message });
  // }
   catch (error) {
  console.error("User creation failed:", error); // Full error object
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }
  res.status(500).json({ message: "Internal server error", error: error.message });
}

};

// **Update Existing User Profile**
const updateUser = async (req, res) => {
  try {
    const { userid } = req.params; // Get user ID from URL parameters
    const { username, password, bio, DOB, phoneNumber } = req.body; // Extract user details from request body

    // Find user by ID
    const user = await Users.findByPk(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided in request
    if (username) user.username = username;
    if (password) user.password = password;
    if (bio) user.bio = bio;
    if (DOB) user.DOB = DOB;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    // if (req.file) {
    //   user.profilePhoto = `/uploads/dp/${req.file.filename}`; // Update profile photo path
    // }

       if (req.file) {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "chatApp/dp",
  });
  fs.unlinkSync(req.file.path); // delete local temp file
  profilePhoto = result.secure_url;
}
    await user.save(); // Save updated user data
    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

// **Delete User**
const deleteUser = async (req, res) => {
  try {
    const { userid } = req.params; // Get user ID from URL parameters

    // Find user by ID
    const user = await Users.findOne({ where: { userid } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy(); // Delete user from database
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// **Search for a User**
const searchUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get user ID from URL parameters

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find user by ID
    const user = await Users.findAll({ where: { userid: userId } });
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found. Please try again." });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const searchByUsername=async (req,res)=>{
    try{
      const {username} = req.query;

      
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Find all users whose username contains the search term (case-insensitive)
       const user = await Users.findAll({
      where: {
        username: {
          [require("sequelize").Op.like]: `%${username}%`,
        },
      },
    });

      if(!user || user.length===0){
        return res.status(404).json({message:"User not found"});
    }
     
   res.status(200).json({ data: user });
    }
   catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }

};

// Export functions for use in other parts of the application
module.exports = { createUser, uploadPic,updateUser, searchByUsername,deleteUser, searchUser};