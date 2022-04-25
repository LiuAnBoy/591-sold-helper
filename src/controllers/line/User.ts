import { Client } from '@line/bot-sdk';
import fs from 'fs-extra';
import axios from 'axios';
import User from '../../models/User';
import Locals from '../../providers/Locals';
import { ConditionType } from '../../interfaces/models/User';
import { Words } from '../../utils/Words';

class LineUser {
  public client: Client;

  constructor() {
    this.client = new Client(Locals.config().lineConfig);
  }

  public async register(userId: string) {
    try {
      const user = await User.findOne({ userId });

      if (!user) {
        const userData = new User({
          userId,
        });

        await userData.save();
      }

      const url =
        'https://notify-bot.line.me/oauth/authorize?' +
        'response_type=code' +
        '&client_id=' +
        `${Locals.config().notifyClientId}` +
        '&redirect_uri=' +
        `${Locals.config().url}/api/notify/token` +
        '&scope=notify' +
        '&state=' +
        `${userId}`;

      return this.client.pushMessage(userId, {
        type: 'text',
        text: `請點擊以下網址綁定Line Notify\n\n${url}`,
      });
    } catch (error) {
      const err = error as Error;
      return console.log(err);
    }
  }

  public async addCondition(userId: string, message: string) {
    try {
      const user = await User.findOne({ userId });

      const conditionStr = message.split('?')[1];
      const url = `${Locals.config().rentApiUrl}${conditionStr}`;
      const headers = {
        'X-CSRF-TOKEN': '',
        Cookie: '',
      };

      const readData = await fs.readJson('./token.json');
      headers['X-CSRF-TOKEN'] = readData.csrfToken;
      headers.Cookie = readData.cookie;

      const rentData = await axios.get(url, { headers });

      const condition: ConditionType = {
        url,
        houseId: rentData.data.data.data[0].post_id,
      };

      if (!user) {
        const userData = new User({
          userId,
          condition,
        });
        await userData.save();
        return this.client.pushMessage(userId, {
          type: 'text',
          text: Words.ADD_SUCCESS,
        });
      }

      await user.updateOne({ condition });

      return this.client.pushMessage(userId, {
        type: 'text',
        text: Words.ADD_SUCCESS,
      });
    } catch (error) {
      const err = error as Error;
      return console.log(err);
    }
  }

  public async stopPush(userId: string) {
    const user = await User.findOne({ userId });

    if (user) {
      user.remove();
      return this.client.pushMessage(userId, {
        type: 'text',
        text: Words.STOP_SUCCESS,
      });
    }

    return this.client.pushMessage(userId, {
      type: 'text',
      text: Words.USER_UNFOUND,
    });
  }
}

export default LineUser;
