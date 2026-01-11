import express from 'express';
import { addFaculty, deleteFaculty, getAllFaculty, updateFaculty } from '../controllers/facultyController.js';

const facultyRouter = express.Router();

facultyRouter.get('/', getAllFaculty);
facultyRouter.post('/', addFaculty);
facultyRouter.put('/:id', updateFaculty);
facultyRouter.delete('/:id', deleteFaculty);

export default facultyRouter;