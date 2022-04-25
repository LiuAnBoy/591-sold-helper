import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/close', (req, res) => {
  // return res.sendFile(path.join(__dirname, '../../views/close.html'));
  return res.send('<h1>登錄成功，請關閉視窗</h1>');
});

export default router;
