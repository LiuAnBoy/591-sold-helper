import path from 'path';
import * as dotenv from 'dotenv';
import { Application } from 'express';

class Locals {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public static config(): any {
    dotenv.config({
      path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
    });

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 8000;
    const mongoUrl = process.env.MONGO_URI;

    const lineBotToken = process.env.LINE_BOT_ACCESS_TOKEN || '';
    const lineSecret = process.env.LINE_BOT_SECRET;
    const userId = process.env.LINE_BOT_USER_ID;

    const rent_X_CSRF_TOKEN = process.env.RENT_591_X_CSRF_TOKEN || '';
    const rentCookie = process.env.RENT_591_Cookie || '';

    const taskJobFreq = process.env.CRON_JOB_TIME_FREQ || '0 */5 * * * *';

    return {
      url,
      port,
      mongoUrl,
      lineBotToken,
      lineSecret,
      userId,
      rent_X_CSRF_TOKEN,
      rentCookie,
      taskJobFreq,
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
