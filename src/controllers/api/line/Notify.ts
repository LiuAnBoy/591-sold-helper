import { WebhookEvent, Client } from '@line/bot-sdk';
import { Request, Response } from 'express';
import axios from 'axios';
import Locals from '../../../providers/Locals';
import Fetch from '../Rent/Fetch';

const client = new Client(Locals.config().lineConfig);

class Notify {
  public static async send(req: Request, res: Response) {
    const events: WebhookEvent[] = req.body.events;

    const results = await axios.all(
      events.map(async (event: WebhookEvent) => {
        try {
          if (event.type !== 'message' || event.message.type !== 'text') {
            return;
          }

          // Process all message related variables here.
          const { replyToken } = event;
          const { text } = event.message;

          if (text === '更新') {
            Fetch.getToken(req, res);

            await client.replyMessage(replyToken, {
              type: 'text',
              text: '已更新憑證。',
            });
          } else {
            await client.replyMessage(replyToken, {
              type: 'text',
              text,
            });
          }
          // Reply to the user.
        } catch (error) {
          if (error instanceof Error) {
            console.log(error);
          }

          return res.status(500).json({
            status: 'error',
          });
        }
      })
    );

    return res.status(200).json({
      status: 'success',
      results,
    });
  }
}

export default Notify;
