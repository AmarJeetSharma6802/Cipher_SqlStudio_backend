import { Router } from 'express';
import { getAssignments, getAssignmentById, createAssignment } from '../controllers/assignmentController';

const router = Router();

router.get('/', getAssignments);
router.get('/:id', getAssignmentById);
router.post('/', createAssignment);

export default router;