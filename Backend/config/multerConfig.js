const multer = require("multer");
const path = require("path");
// ✅ Configure multer for file uploads
const fileStorage = multer.diskStorage({
  destination: "./uploads/files/",
  filename: (req, file, cb) => {
    cb(null, `file-${Date.now()}-${file.originalname}`);
  },
});
const uploadFile = multer({ storage: fileStorage });

// ✅ Export both file handlers as an object
module.exports = { uploadFile };
