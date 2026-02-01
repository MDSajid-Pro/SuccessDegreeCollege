import express from 'express';
const inquiryRouter = express.Router();
import { 
  createInquiry, 
  getInquiries, 
  updateInquiry, 
  deleteInquiry 
} from '../controllers/inquiryController.js';

inquiryRouter.route('/')
  .get(getInquiries)  
  .post(createInquiry); 

inquiryRouter.route('/:id')
  .put(updateInquiry)   
  .delete(deleteInquiry); 

export default inquiryRouter;