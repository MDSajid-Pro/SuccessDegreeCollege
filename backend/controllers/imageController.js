import { v2 as cloudinary } from 'cloudinary'; // Import to use for deletion
import ImageModel from "../models/images.js";

// Note: No 'fs' imports needed anymore!

export const uploadImage = async (req, res) => {
  try {
    // 1. Parse Metadata (Safety check)
    let name, isPublished;
    try {
        const parsedData = JSON.parse(req.body.Image || '{}');
        name = parsedData.name;
        isPublished = parsedData.isPublished;
    } catch (err) {
        name = req.body.name;
        isPublished = req.body.isPublished;
    }

    // 2. Check if Multer successfully uploaded the file
    if (!req.file) {
      return res.json({ success: false, message: "Image file is required" });
    }

    // 3. Get the URL and Public ID directly from req.file
    const image = req.file.path;      // Cloudinary URL
    const publicId = req.file.filename; // Cloudinary Public ID

    // 4. Save to Database
    const newImage = new ImageModel({
        name,
        image,        // URL
        publicId,     // Save this so we can delete it later!
        isPublished
    });

    await newImage.save();

    res.json({ success: true, message: "Image added successfully" });

  } catch (error) {
    console.error(error);
    // If database save fails, we should delete the orphan image from Cloudinary
    if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
    }
    res.json({ success: false, message: error.message });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await ImageModel.find({ isPublished: true });
    res.json({ success: true, images });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteImageById = async (req, res) => {
  try {
    const { id } = req.body;
    
    const img = await ImageModel.findById(id);
    if (!img) {
        return res.json({ success: false, message: "Image not found" });
    }

    // --- DELETE FROM CLOUDINARY ---
    if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
    } 

    // --- DELETE FROM DATABASE ---
    await ImageModel.findByIdAndDelete(id);
    
    res.json({ success: true, message: 'Image deleted' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const togglePublished = async (req, res) => {
  try {
    const { id } = req.body;
    const img = await ImageModel.findById(id);
    if (img) {
        img.isPublished = !img.isPublished;
        await img.save();
        res.json({ success: true, message: 'Image status updated' });
    } else {
        res.json({ success: false, message: 'Image not found' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};