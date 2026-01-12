import express from 'express';
import { uploadImage, getAllImages, deleteImageById, togglePublished } from '../controllers/imageController.js';
import upload from '../middleware/multer.js'; // Import the upload middleware you created

const imageRouter = express.Router();

// CHANGE THIS LINE: Use the middleware to handle the upload BEFORE the controller
imageRouter.post('/add', upload.single('image'), uploadImage); 

imageRouter.get('/all', getAllImages);
imageRouter.post('/delete', deleteImageById);
imageRouter.post('/toggle', togglePublished);

export default imageRouter;