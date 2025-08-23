require('dotenv').config();

// export default cloudinary;
const { v2 : cloudinary }= require ('cloudinary');
const fs = require("fs");
// csd..
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
     
// MAIN UPLOAD HANDLER
const upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "chatApp/uploads",
    });

    // Delete temp file after upload
    fs.unlinkSync(req.file.path);

    return res.status(200).json({
      message: "File uploaded successfully!",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Upload failed", error });
  }
};

module.exports ={ upload };
