
// const admin = require("../firebaseConfig"); // Adjust the path as needed
// const { User } = require("../models"); // Assuming you have a User model defined

// // Request OTP API
// const sendOTP = async (req, res) => {
//   try {
//     const { phone } = req.body;
//     if (!phone)
//       return res.status(400).json({ message: "Phone number required" });

//     // Firebase sends OTP automatically when using Firebase Authentication in frontend
//     res.status(200).json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Verify OTP API
// const verifyOTP = async (req, res) => {
//   const { idToken } = req.body;
//   if (!idToken){
//     return res.status(400).json({ message: "ID token required" });
//     }
//   try {
  

//     // Verify OTP using Firebase
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const phone = decodedToken.phonenumber;
//     if (!phone) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     const [user, created] = await User.findOrCreate({
//       where: { phoneNumber: phone }
//       // defaults: { mobile: phoneNumber },
//     });

//     res.status(200).json({ message: "OTP verified and user stored", user });
//     // res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     console.error("OTP Verification Error:", error);
//     res.status(500).json({ message: "Invalid or expired OTP" });
//   }
// };

// module.exports = { sendOTP, verifyOTP };
// const admin = require("../firebaseConfig"); // Adjust the path as needed
// const { User } = require("../models");

// const sendOTP = async (req, res) => {
//   try {
//     const { phone } = req.body;
//     if (!phone)
//       return res.status(400).json({ message: "Phone number required" });

//     // Firebase sends OTP automatically when using Firebase Authentication in frontend
//     res.status(200).json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// const verifyOTP = async (req, res) => {
//   const { tokenId } = req.body;
//   if (!tokenId) {
//     return res.status(400).json({ message: "ID token required" });
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(tokenId);
//     const phone = decodedToken.phoneNumber; // ✅ CORRECTED HERE

//     if (!phone) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     const [user, created] = await User.findOrCreate({
//       where: { phoneNumber: phone }
//     });

//     res.status(200).json({ message: "OTP verified and user stored", user });
//   } catch (error) {
//     console.error("OTP Verification Error:", error);
//     res.status(500).json({ message: "Invalid or expired OTP" });
//   }
// };
//  module.exports = { sendOTP, verifyOTP };
// const admin = require("../firebaseConfig"); // Adjust path to your Firebase Admin config
// const { User } = require("../models");

// This is optional since OTP is handled by Firebase on the frontend
// const sendOTP = async (req, res) => {
//   try {
//     const { phone } = req.body;
//     if (!phone)
//       return res.status(400).json({ message: "Phone number required" });

//     // Firebase Authentication handles OTP sending on the frontend
//     res.status(200).json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const verifyOTP = async (req, res) => {

 
//   const { tokenId } = req.body;
//   // const tokenId = authHeader.split(" ")[1]; // Extract token from Bearer token
//   if (!tokenId) {
//     return res.status(400).json({ message: "ID token required" });
//   }

//   try {
//     // ✅ Verify token using Firebase Admin SDK
//     const decodedToken = await admin.auth().verifyIdToken(tokenId);
//     const phone = decodedToken.phone_number || decodedToken.phoneNumber;

//     if (!phone) {
//       return res.status(400).json({ message: "Invalid OTP or phone number missing" });
//     }

//     // ✅ Create or fetch user by phone number
//     const [user, created] = await User.findOrCreate({
//       where: { phoneNumber: phone }
//     });

//     res.status(200).json({
//       message: "OTP verified and user stored",
//       user,
//       created
//     });
//   } catch (error) {
//     console.error("OTP Verification Error:", error);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = { sendOTP, verifyOTP };

const admin = require("../firebaseconfig");
const { User } = require("../models"); // adjust path as per your structure

const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone)
      return res.status(400).json({ message: "Phone number required" });

    // OTP is sent from frontend using Firebase SDK
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyOTP = async (req, res) => {
  const { tokenId } = req.body;

  if (!tokenId) {
    return res.status(400).json({ message: "ID token required" });
  }
  // console.log("Token ID:", tokenId); // Debugging line
  try {
    const decodedToken = await admin.auth().verifyIdToken(tokenId);
    const phone = decodedToken.phone_number || decodedToken.phoneNumber;

    if (!phone) {
      return res.status(400).json({ message: "Invalid OTP or phone number missing" });
    }

    const [user, created] = await User.findOrCreate({
      where: { phoneNumber: phone },
    });

    res.status(200).json({
      message: "OTP verified and user stored",
      user,
      created,
    });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { sendOTP, verifyOTP };
