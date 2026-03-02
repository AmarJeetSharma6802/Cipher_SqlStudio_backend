import { Router } from 'express';
import { getHint } from '../controllers/llmController';

const router = Router();

router.post('/', getHint);

export default router;
