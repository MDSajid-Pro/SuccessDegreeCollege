import { cloudinary } from '../middleware/multer.js'; // <-- THE MISSING LINK
import Notice from '../models/noticeModel.js';

// @desc    Get all notices
// @route   GET /api/notices
export const getNotices = async (req, res) => {
  try {
    // Sort by createdAt descending (newest first)
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new notice
// @route   POST /api/notices
export const createNotice = async (req, res) => {
  const { title, category, date, isNewBadge } = req.body;

  // Validate incoming required body fields and file existence
  if (!title || !category || !date) {
    return res.status(400).json({ message: 'Please add all required fields' });
  }
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a PDF file' });
  }

  try {
    const pdfUrl = req.file.path; 

    const notice = await Notice.create({
      title,
      category,
      date,
      pdfUrl,
      isNewBadge: isNewBadge === 'true' || isNewBadge === true 
    });
    
    res.status(201).json(notice);
  } catch (error) {
    console.log("--- ACTUAL DETAILED BACKEND ERROR START ---");
    // Standard error logging works cleanly once reference crashes are eliminated
    console.error(error); 
    console.log("--- ACTUAL DETAILED BACKEND ERROR END ---");

    // Clean up orphaned file on Cloudinary
    if (req.file && req.file.filename) {
      try {
        await cloudinary.uploader.destroy(req.file.filename, { resource_type: 'raw' });
      } catch (cloudinaryErr) {
        console.error("Cloudinary cleanup failed:", cloudinaryErr.message);
      }
    }
    
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

// @desc    Delete a notice
// @route   DELETE /api/notices/:id
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    // Optional: Add logic here to remove the file from your local disk/cloud space if needed using notice.pdfUrl

    await notice.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a notice
// @route   PUT /api/notices/:id
export const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (notice) {
      notice.title = req.body.title || notice.title;
      notice.category = req.body.category || notice.category;
      notice.date = req.body.date || notice.date;
      
      if (req.body.isNewBadge !== undefined) {
        notice.isNewBadge = req.body.isNewBadge === 'true' || req.body.isNewBadge === true;
      }

      // If a new document file was sent during modification, swap out the path asset tracker
      if (req.file) {
        notice.pdfUrl = req.file.path;
      }

      const updatedNotice = await notice.save();
      res.json(updatedNotice);
    } else {
      res.status(404).json({ message: 'Notice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};