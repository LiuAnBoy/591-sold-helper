import { Router } from 'express';
import Notify from '../controllers/api/line/Notify';

import Fetch from '../controllers/api/Rent/Fetch';

const router = Router();

router.get('/', (req, res) => res.send('Hello world'));

router.get('/refresh_token', Fetch.getToken); // test token
router.get('/user', Fetch.fetchUser); // test token

router.post('/webhook', Notify.send);

export default router;
