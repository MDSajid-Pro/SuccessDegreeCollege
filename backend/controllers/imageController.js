import fs from "fs";
import imagekit from "../config/imageKit.js";
import ImageModel from "../models/images.js";

export const uploadImage = async (req, res) => {
  try {
      const { name, isPublished } = JSON.parse(req.body.Image);
      
      const imageFile = req.file

    if (!name ) {
       return res.json({ success: false, message: "Name is required" });
      }

      if ( !isPublished) {
       res.json({ success: false, message: "isPublished is required" });
      }
      
      const filebuffer = fs.readFileSync(imageFile.path)

      // Upload image  to ImageKit
      const response = await imagekit.upload({
          file: filebuffer,
          fileName: imageFile.originalname,
          folder: '/images'
      })

      // Optimization through imageKit URL
      const optimizedImageUrl = imagekit.url({
          path: response.filePath,
          transformation: [
              { quality: 'auto' },
              { format: 'webp' },
              {width: '1280'}
          ]
      })

      const image = optimizedImageUrl;

      await ImageModel.create({ name, image, isPublished })
      
      res.json({success: true, message: "Image added"})

  } catch (error) {
      res.json({success: false, message: error.message})
  }
};


export const getAllImages = async (req, res) => {
    try {
        const images = await ImageModel.find({ isPublished: true })
        res.json({success: true, images})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteImageById = async (req, res) => {
    try {
        const { id } = req.body;
        await ImageModel.findByIdAndDelete(id);
        res.json({success: true, message: 'Image deleted'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const togglePublished = async (req, res) => {
    try {

        const { id } = req.body;
        const img = await ImageModel.findById(id)
        img.isPublished = !img.isPublished;
        await img.save();
        res.json({success: true, message: 'Image status updated'})
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}