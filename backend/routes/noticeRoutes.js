import express from 'express';
import upload from '../middleware/multer.js'; // Imported your shared Cloudinary config middleware
import { 
  getNotices, 
  createNotice, 
  deleteNotice,
  updateNotice
} from '../controllers/noticeController.js';

const router = express.Router();

// Routes Configuration
router.get('/', getNotices);

// Handles file stream intercept parsing directly to Cloudinary using the 'pdfFile' field key
router.post('/', upload.single('pdfFile'), createNotice);
router.put('/:id', upload.single('pdfFile'), updateNotice);

router.delete('/:id', deleteNotice);

export default router;