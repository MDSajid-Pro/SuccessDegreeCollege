import express from 'express'
const router = express.Router();
import { 
  getNotices, 
  createNotice, 
  deleteNotice,
  updateNotice
} from '../controllers/noticeController.js';

router.get('/', getNotices);
router.post('/', createNotice);
router.delete('/:id', deleteNotice);
router.put('/:id',updateNotice)

export default router;