import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = 'uploads'; // Default
    let resourceType = 'auto';  // Auto detect (image, raw for pdfs)

    // Set folder based on field name
    if (file.fieldname === 'photo') {
      folderName = 'college_uploads/images';
      resourceType = 'image';
    } else if (file.fieldname === 'transcript') {
      folderName = 'college_uploads/transcripts';
      resourceType = 'raw'; // 'raw' is usually better for PDFs in Cloudinary to keep original name
    }

    return {
      folder: folderName,
      resource_type: resourceType,
      // Use original name (remove extension because Cloudinary adds it automatically for images)
      public_id: path.parse(file.originalname).name, 
      // Keep the file extension for raw files (PDFs)
      use_filename: true, 
      unique_filename: false, // Set to true if you don't want files overwriting each other
    };
  },
});

// 3. File Filter
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
export { cloudinary }; // Export cloudinary so we can use it to delete files later