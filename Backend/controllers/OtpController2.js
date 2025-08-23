const admin = require("../firebaseconfig"); // Import Firebase configuration
const { User } = require("../models"); // Import User model (adjust path if needed)

// **Send OTP to User's Phone Number**
const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body; // Extract phone number from request body
    if (!phone) return res.status(400).json({ message: "Phone number required" });

    // OTP is sent from frontend using Firebase SDK (handled client-side)
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// **Verify OTP and Authenticate User**
const verifyOTP = async (req, res) => {
  const { tokenId } = req.body; // Extract token ID from request body

  if (!tokenId) {
    return res.status(400).json({ message: "ID token required" });
  }

  try {
    // Verify OTP using Firebase authentication
    const decodedToken = await admin.auth().verifyIdToken(tokenId);
    const phone = decodedToken.phone_number || decodedToken.phoneNumber; // Extract phone number from token

    if (!phone) {
      return res.status(400).json({ message: "Invalid OTP or phone number missing" });
    }

    // Find or create user based on phone number
    const [user, created] = await User.findOrCreate({
      where: { phoneNumber: phone },
    });

    res.status(200).json({
      message: "OTP verified and user stored",
      user,
      created, // Returns true if user was newly created, false if existing
    });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Export functions for use in authentication routes
module.exports = { sendOTP, verifyOTP };