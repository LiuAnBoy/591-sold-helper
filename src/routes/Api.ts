import { Router } from 'express';
import UserNotify from '../controllers/api/line/User';
import Webhook from '../controllers/api/line/Webhook';

import Fetch from '../controllers/api/Rent/Fetch';
import Rent from '../controllers/task/Rent';

const router = Router();

router.get('/', (req, res) => res.send('Hello world'));

router.get('/refresh_token', Fetch.getToken); // test token
router.get('/user', Fetch.fetchUser); // test token

router.get('/notify/token', UserNotify.getNotifyToken);

router.post('/webhook', Webhook.send);

router.get('/house_fetch', Rent.Fetch);

export default router;
