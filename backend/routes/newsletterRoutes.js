import express from 'express'
import { deleteSubscribersById, getAllSubscribers, subscribeToNewsletter } from '../controllers/newsletterController.js';
import adminAuth from '../middleware/adminAuth.js';
const router = express.Router()


// POST /api/newsletter
router.post("/", subscribeToNewsletter);
router.get("/all", getAllSubscribers);
router.post('/delete', adminAuth, deleteSubscribersById)

export default router;
