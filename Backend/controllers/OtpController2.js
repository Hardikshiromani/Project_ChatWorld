const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Load your service account credentials
  });
}

// Request OTP API
const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone)
      return res.status(400).json({ message: "Phone number required" });

    // Firebase sends OTP automatically when using Firebase Authentication in frontend
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Verify OTP API
const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp)
      return res.status(400).json({ message: "Phone and OTP required" });

    // Verify OTP using Firebase
    const decodedToken = await admin.auth().verifyIdToken(otp);

    if (!decodedToken) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP verified, create user entry in DB if not exists
    // (You will later update this user with username/password)

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Invalid or expired OTP" });
  }
};

module.exports = { sendOTP, verifyOTP };
