import { Client } from '@line/bot-sdk';
import axios, { AxiosError } from 'axios';
import querystring from 'query-string';
import { IHouse } from '../../interfaces/models/House';
import Locals from '../../providers/Locals';
import { Words } from '../../utils/Words';

class Notify {
  public static async push(message: IHouse, notifyToken: string) {
    const title = `名稱： ${message.title}`;
    const kindName = `類型： ${message.kindName}`;
    const room = `格局： ${message.room}`;
    const floor = `樓層： ${message.floor}`;
    const unitPrice = `每坪： ${message.unitPrice}`;
    const totalPrice = `總價： ${message.totalPrice}萬`;
    const section = `地址： 新北勢板橋區${message.address}`;
    const area = `坪數： ${message.area}`;
    const url = `https://sale.591.com.tw/home/house/detail/2/${message.houseId}.html`;

    const qs = querystring.stringifyUrl({
      url: 'https://notify-api.line.me/api/notify',
      query: {
        message: `\n${title}\n${kindName}\n${room}\n${floor}\n${unitPrice}\n${totalPrice}\n${section}\n${area}\n${url}`,
      },
    });

    try {
      const res = await axios.post(
        qs,
        {},
        {
          headers: {
            Authorization: `Bearer ${notifyToken}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(Error);
      }
      console.log(error);
    }
  }

  public static async refresh(replyToken: string) {
    const client = new Client(Locals.config().lineConfig);
    await axios.get(`${Locals.config().url}/api/refresh_token`);

    await client.replyMessage(replyToken, {
      type: 'text',
      text: '更新完畢。',
    });
  }
}

export default Notify;
