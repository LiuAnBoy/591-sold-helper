import { WebhookEvent, Client } from '@line/bot-sdk';
import { Request, Response } from 'express';
import axios from 'axios';

import Locals from '../../../providers/Locals';
import LineUser from '../../line/User';
import Notify from '../../line/Notify';

const client = new Client(Locals.config().lineConfig);

class Webhook {
  public static async send(req: Request, res: Response) {
    const user = new LineUser();
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
          const { userId } = event.source;

          switch (true) {
            case text === '開始使用':
              return user.register(userId as string);
            case text === '更新憑證':
              return Notify.refresh(replyToken);
            case text === '停止通知':
              return user.stopPush(userId as string);
            case /新增 http/.test(text):
              return user.addCondition(userId as string, text);
            default:
              return await client.replyMessage(replyToken, {
                type: 'text',
                text: '請輸入正確指令。',
              });
          }
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

export default Webhook;
