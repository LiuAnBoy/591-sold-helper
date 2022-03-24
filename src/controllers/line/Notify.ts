import { Client } from '@line/bot-sdk';
import { IHouse } from '../../interfaces/models/House';
import Locals from '../../providers/Locals';

class Notify {
  public client: Client;

  constructor() {
    this.client = new Client(Locals.config().lineConfig);
  }

  public async push(message: IHouse, userId: string) {
    const title = `名稱： ${message.title}`;
    const kindName = `類型： ${message.kindName}`;
    const room = `格局： ${message.room}`;
    const floor = `樓層： ${message.floor}`;
    const price = `租金： ${message.price}`;
    const section = `地區： ${message.section}`;
    const area = `坪數： ${message.area}`;
    const url = `https://rent.591.com.tw/home/${message.pId}`;

    await this.client.pushMessage(userId, {
      type: 'text',
      text: `${title}\n${kindName}\n${room}\n${floor}\n${price}\n${section}\n${area}\n${url}`,
    });
  }
}

export default Notify;
