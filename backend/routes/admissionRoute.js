import express from 'express';
import { 
  submitAdmission, 
  getAllAdmissions, 
  deleteAdmission, 
  updateAdmission 
} from '../controllers/admissionController.js';
import upload from '../middleware/multer.js';

const admissionRouter = express.Router();

const uploadFields = upload.fields([
  { name: 'photo', maxCount: 1 }, 
  { name: 'transcript', maxCount: 1 }
]);

// Routes
admissionRouter.post('/', uploadFields, submitAdmission);
admissionRouter.get('/', getAllAdmissions);      // Fetch all
admissionRouter.delete('/:id', deleteAdmission); // Delete by ID
admissionRouter.put('/:id', updateAdmission);    // Update by ID

export default admissionRouter;