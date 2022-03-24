import { Client } from '@line/bot-sdk';
import fs from 'fs-extra';
import axios from 'axios';
import User from '../../models/User';
import Locals from '../../providers/Locals';
import { ConditionType } from '../../interfaces/models/User';

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
      return this.client.pushMessage(userId, {
        type: 'text',
        text: `請至591網站把篩選過後的網址複製後用新增的指令來存入你的篩選條件。\n\n範例：\n新增 https://rent.591.com.tw/\n\n往後可以藉由設定的條件來推播唷！`,
      });
    } catch (error) {
      const err = error as Error;
      return console.log(err);
    }
  }

  public async addCondition(userId: string, message: string) {
    try {
      const user = await User.findOne({ userId });
      const conditionStr = message.split('/')[3].slice(1);
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
          text: '新增成功',
        });
      }

      await user.updateOne({ condition });

      return this.client.pushMessage(userId, {
        type: 'text',
        text: '新增成功',
      });
    } catch (error) {
      const err = error as Error;
      return console.log(err);
    }
  }
}

export default LineUser;
