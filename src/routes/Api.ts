import {
  middleware,
  MiddlewareConfig,
  WebhookEvent,
  TextMessage,
  Client,
  ClientConfig,
} from '@line/bot-sdk';
import { Router, Request, Response } from 'express';
import axios from 'axios';
import Notify from '../controllers/api/line/Notify';
import Locals from '../providers/Locals';

import Fetch from '../controllers/api/Rent/Fetch';

export const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: Locals.config().lineBotToken,
  channelSecret: Locals.config().lineSecret,
};

export const clientConfig: ClientConfig = {
  channelAccessToken: Locals.config().lineBotToken,
  channelSecret: Locals.config().lineSecret,
};

const client = new Client(clientConfig);

const router = Router();

router.post('/rent', (req, res) => {
  res.send('hello');
}); // test token

router.post('/webhook', Notify.send);

export default router;
