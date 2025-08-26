const Media = require("../models/mediaModel");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");


  cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
    });
    
const uploadMedia = async (req, res) => {
  try {
    const { messageId, uploadedBy, Filesize } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No media file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "chatApp/media",
      resource_type: "auto", // handles image, video, audio
    });

    fs.unlinkSync(req.file.path); // delete temp file

    const newMedia = await Media.create({
      messageId: messageId || null,
      mediaURL: result.secure_url,
      Filesize,
      uploadedBy,
    });

    res.status(200).json({ message: "Media uploaded successfully", data: newMedia });
  } catch (error) {
    console.error("Media upload error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {uploadMedia};