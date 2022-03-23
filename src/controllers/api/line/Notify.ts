import { WebhookEvent, TextMessage, Client, ClientConfig } from '@line/bot-sdk';
import { Request, Response } from 'express';
import axios from 'axios';
import Locals from '../../../providers/Locals';
import Fetch from '../Rent/Fetch';

export const clientConfig: ClientConfig = {
  channelAccessToken: Locals.config().lineBotToken,
  channelSecret: Locals.config().lineSecret,
};

const client = new Client(clientConfig);

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
            await Fetch.getToken(req, res);

            await client.multicast(
              [
                'U741c6dbdfb050332ac47b9fa96cb0223',
                'Uab5c5d132189af26100fb47170351afb',
              ],
              { type: 'text', text: '已更新憑證。' }
            );
          }
          // Reply to the user.
          await client.multicast(
            [
              'U741c6dbdfb050332ac47b9fa96cb0223',
              'Uab5c5d132189af26100fb47170351afb',
            ],
            {
              type: 'text',
              text,
            }
          );
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
