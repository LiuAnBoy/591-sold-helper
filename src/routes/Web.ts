import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/close', (req, res) => {
  return res.sendFile(path.join(__dirname, '../../views/close.html'));
});

export default router;
