const Users = require("../models/userModel");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
require("dotenv").config();

const createUser = async (req, res) => {
  // try {
  //   const { username, password, bio, DOB } = req.body;

  //     // const phone= phoneNumber||null;
  //   // if user exists already
  //   const existingUser = await Users.findOne({ where: { username } });

  //   if (existingUser) {
  //     return res.status(400).json({ message: "User already exists" });
  //   }

  //   const newUser = await Users.create({
  //     username,
  //     password,
  //     bio,
  //     DOB,
  //     // phoneNumber:phone,
  //   });

  //   res
  //     .status(201)
  //     .json({ message: "User created successfully", data: newUser });
  // }
  try {
    // const { userid } = req.params; //get userId from URL params
    const { username, password, bio, DOB, phoneNumber } = req.body;

    //find the user by userID

    const user = await Users.findOne({where:{phoneNumber}});
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    //update feilds if provivded in the request

     user.username = username;
    user.password = password;
     user.bio = bio;
     user.DOB = DOB;
    // user.phoneNumber = phoneNumber;

    //save the updated user
    await user.save();
    res.status(200).json({ message: "User Created Successfully", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userid } = req.params; //get userId from URL params
    const { username, password, bio, DOB, phoneNumber } = req.body;

    //find the user by userID

    const user = await Users.findByPk(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //update feilds if provivded in the request

    if (username) user.username = username;
    if (password) user.password = password;
    if (bio) user.bio = bio;
    if (DOB) user.DOB = DOB;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    //save the updated user
    await user.save();
    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userid } = req.params;
    // console.log('requested id',id);
    const user = await Users.findOne({ where: { userid: userid } });
    //check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //delete the user
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};


const searchUser= async(req,res)=>{

  try{
  const {UserName}= req.query;


  if (!UserName) {
    return res.status(400).json({ message: 'Username is required' });
}
  const user= await Users.findAll({where:{username:UserName}});
  if(!user){
    return res.status(404).json({message:'User not Found Search Again'});
  }
  res.status(200).json({data:user});
  }
  catch(error){
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}


module.exports = { createUser, updateUser, deleteUser,searchUser };
