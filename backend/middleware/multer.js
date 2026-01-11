import multer from 'multer';
import path from 'path';

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists in your root
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter (Optional validation)
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "photo") {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Photo must be an image file"), false);
    }
  }
  if (file.fieldname === "transcript") {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Transcript must be a PDF"), false);
    }
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;