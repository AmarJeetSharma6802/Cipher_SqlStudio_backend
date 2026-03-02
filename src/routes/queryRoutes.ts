import { Router } from 'express';
import { executeQuery } from '../controllers/queryController';

const router = Router();

router.post('/', executeQuery);

export default router;
