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

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = Number(process.env.PORT) || 8000;
    const mongoUrl = process.env.MONGO_URI || '';

    const lineBotToken = process.env.LINE_BOT_ACCESS_TOKEN || '';
    const lineSecret = process.env.LINE_BOT_SECRET || '';

    const taskJobFreq = process.env.CRON_JOB_TIME_FREQ || '0 */5 * * * *';

    const rentUrl = process.env.RENT_URL || 'https://rent.591.com.tw/';

    const lineConfig: ClientConfig = {
      channelAccessToken: lineBotToken,
      channelSecret: lineSecret,
    };

    return {
      url,
      port,
      mongoUrl,
      lineBotToken,
      lineSecret,
      taskJobFreq,
      rentUrl,

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
