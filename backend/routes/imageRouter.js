import express from 'express'
import { deleteImageById, getAllImages, togglePublished, uploadImage } from '../controllers/imageController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const imageRouter = express.Router()

imageRouter.post('/add', upload.single('image'), adminAuth, uploadImage)
imageRouter.get('/all', getAllImages)
imageRouter.post('/delete', adminAuth, deleteImageById)
imageRouter.post('/toggle-publish',adminAuth, togglePublished)

export default imageRouter;