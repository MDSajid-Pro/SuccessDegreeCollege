import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Ensure Cloudinary is configured
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
  let folderName = 'uploads'; 
  let resourceType = 'auto';  

  if (file.mimetype && file.mimetype.startsWith('image/')) {
    folderName = 'college_uploads/images';
    resourceType = 'image';
  } else if (file.mimetype === 'application/pdf') {
    folderName = file.fieldname === 'transcript' 
      ? 'college_uploads/transcripts' 
      : 'college_uploads/notices';
    resourceType = 'raw'; 
  }

  // Extract base name without path structure
  const baseName = file.originalname ? path.parse(file.originalname).name : `file_${Date.now()}`;
  
  // Clean special characters: Replace spaces, commas, ampersands, etc., with underscores
  const sanitizedName = baseName.replace(/[^a-zA-Z0-9-_]/g, '_');

  // For raw assets (PDFs), we append the extension safely at the end
  const cleanPublicId = resourceType === 'raw' && file.originalname
    ? `${sanitizedName}${path.parse(file.originalname).ext}`
    : `${sanitizedName}_${Date.now()}`;

  return {
    folder: folderName,
    resource_type: resourceType,
    public_id: cleanPublicId,
  };
},
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "photo" || file.fieldname === "image") {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Photo must be an image file"), false);
    }
  }
  if (file.fieldname === "transcript" || file.fieldname === "pdfFile") {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Uploaded file must be a PDF document"), false);
    }
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
export { cloudinary };