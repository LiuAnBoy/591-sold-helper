import { Router } from 'express';
import Notify from '../controllers/api/line/Notify';

import Fetch from '../controllers/api/Rent/Fetch';

const router = Router();

router.post('/rent', Fetch.getToken); // test token

router.post('/webhook', Notify.send);

export default router;
