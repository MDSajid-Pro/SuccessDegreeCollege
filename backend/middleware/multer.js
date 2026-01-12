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
    let folderName = 'uploads'; 
    let resourceType = 'auto';  

    // Set folder based on field name
    if (file.fieldname === 'photo' || file.fieldname === 'image') {
      folderName = 'college_uploads/images';
      resourceType = 'image';
    } else if (file.fieldname === 'transcript') {
      folderName = 'college_uploads/transcripts';
      resourceType = 'raw'; 
    }

    // --- START OF FIX ---
    
    // Default: Remove extension (Best for Images, Cloudinary adds it back)
    let publicId = path.parse(file.originalname).name; 

    // Special Case: If it is a PDF (raw), we MUST keep the extension
    if (resourceType === 'raw') {
        publicId = file.originalname; // e.g., "myfile.pdf"
    }

    // --- END OF FIX ---

    return {
      folder: folderName,
      resource_type: resourceType,
      public_id: publicId, // Use the variable we created above
      use_filename: true, 
      unique_filename: false, 
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