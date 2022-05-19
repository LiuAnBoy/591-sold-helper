import axios, { AxiosError } from 'axios';
import querystring from 'query-string';
import path from 'path';
import { Request, Response } from 'express';
import { Client } from '@line/bot-sdk';
import User from '../../../models/User';
import Locals from '../../../providers/Locals';

class UserNotify {
  public client: Client;

  constructor() {
    this.client = new Client(Locals.config().lineConfig);
  }

  public static async getNotifyToken(req: Request, res: Response) {
    const state = req.query.state as string;
    const code = req.query.code as string;

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const url = querystring.stringifyUrl({
      url: 'https://notify-bot.line.me/oauth/token',
      query: {
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${Locals.config().url}/api/notify/token`,
        // redirect_uri: `${Locals.config().url}/close`,
        client_id: Locals.config().notifyClientId,
        client_secret: Locals.config().notifySecret,
      },
    });

    try {
      const response = await axios.post(url, config);

      if (response.data.status !== 200) {
        return res.status(500).send({ message: 'Internal Server Error' });
      }

      const user = await User.findOne({ userId: state });

      if (!user) {
        const userData = new User({
          userId: state,
          notifyToken: response.data.access_token,
        });

        await userData.save();
      }

      await user?.updateOne({ notifyToken: response.data.access_token });

      // return res.sendFile(path.join(__dirname, '../../../../views/close.html'));
      return console.log('success');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }

      if (error as AxiosError) {
        console.log(error);
      }
    }
  }
}

export default UserNotify;
