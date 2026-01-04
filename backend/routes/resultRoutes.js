import express from 'express';
import { getResults, addResult, updateResult, deleteResult } from '../controllers/resultController.js';

const router = express.Router();

router.get('/', getResults);
router.post('/', addResult);
router.put('/:id', updateResult);
router.delete('/:id', deleteResult);

export default router;