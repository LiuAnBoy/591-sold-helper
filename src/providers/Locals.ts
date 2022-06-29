import path from 'path';
import * as dotenv from 'dotenv';
import { Application } from 'express';
import { ClientConfig } from '@line/bot-sdk';
import { LocalsType } from '../interfaces/Locals';

class Locals {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public static config(): LocalsType {
    dotenv.config({
      path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
    });

    const port = Number(process.env.PORT) || 8000;
    const url = process.env.SERVER_URL || `http://localhost:${port}`;
    const mongoUrl = process.env.MONGO_URI || '';

    const lineBotToken = process.env.LINE_BOT_ACCESS_TOKEN || '';
    const lineSecret = process.env.LINE_BOT_SECRET || '';

    const rentUrl = process.env.RENT_URL || 'https://rent.591.com.tw/';
    const rentApiUrl = 'https://sale.591.com.tw/home/search/list?type=2&';

    const lineConfig: ClientConfig = {
      channelAccessToken: process.env.LINE_BOT_ACCESS_TOKEN || '',
      channelSecret: process.env.LINE_BOT_SECRET || '',
    };

    const notifyClientId = process.env.LINE_NOTIFY_CLIENT_ID || '';
    const notifySecret = process.env.LINE_NOTIFY_SECRET || '';

    return {
      url,
      port,
      mongoUrl,
      lineBotToken,
      lineSecret,
      rentUrl,
      rentApiUrl,

      notifyClientId,
      notifySecret,

      lineConfig,
    };
  }

  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    /* eslint no-param-reassign: ["off"] */
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
