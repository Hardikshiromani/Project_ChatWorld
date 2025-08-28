

const express = require("express");
const { uploadMedia } = require("../controllers/mediaController"); // Import file upload configuration
const router = express.Router();
const multer = require("multer");
const path =require("path");


// ✅ Configure multer for file uploads
const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null,"uploads/");
  },
  filename:(req, file, cb)=>{
    cb(null, `file-${Date.now()}-${file.originalname}`);
  },
});
const uploadFile = multer({ storage });

// **File Upload Route**
// router.post("/upload/file", uploadFile.single("file"), (req, res) => {
//   // Validate file upload
//   if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//   // Return success response with file path
//   res.json({ message: "File uploaded successfully!", path: req.file.path });
// });
// ✅ Route uses multer middleware + cloudinary handler
router.post("/upload/", uploadFile.single("media"), uploadMedia);
// Export router configuration
module.exports = router;