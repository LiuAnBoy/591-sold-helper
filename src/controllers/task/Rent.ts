import axios, { AxiosError } from 'axios';

import fs from 'fs-extra';
import { IHouse } from '../../interfaces/models/House';

import Notify from '../line/Notify';
import User from '../../models/User';

class Rent {
  public static async Fetch(): Promise<void> {
    console.log('Task     :: Start fetch Rent data');
    const lineNotify = new Notify();
    try {
      const headers = {
        'X-CSRF-TOKEN': '',
        Cookie: '',
      };

      const readData = await fs.readJson('./token.json');
      headers['X-CSRF-TOKEN'] = readData.csrfToken;
      headers.Cookie = readData.cookie;

      const userData = await User.find();

      /* eslint no-await-in-loop: "off" */
      for (let i = 0; i < userData.length; i += 1) {
        const userId = userData[i].userId;
        const existPostId = userData[i].condition.houseId;
        console.log(`${userId} start fetching`);
        const rentData = await axios.get(userData[i].condition.url, {
          headers,
        });

        const newPostId = rentData.data.data.data[0].post_id;

        /* eslint no-continue: "off" */
        if (existPostId === newPostId) {
          console.log(`${userId} finish fetching`);
          continue;
        }

        const idx = rentData.data.data.data.findIndex(
          (d: any) => d.post_id === existPostId
        );

        for (let j = 0; j < idx; j += 1) {
          const d: IHouse = {
            title: rentData.data.data.data[j].title,
            pId: rentData.data.data.data[j].post_id,
            kindName: rentData.data.data.data[j].kind_name,
            room: rentData.data.data.data[j].room_str,
            floor: rentData.data.data.data[j].floor_str,
            price: rentData.data.data.data[j].price,
            section: rentData.data.data.data[j].section_name,
            area: rentData.data.data.data[j].area,
          };
          lineNotify.push(d, userId);
        }

        await User.findOneAndUpdate(
          { userId },
          { 'condition.houseId': newPostId },
          { new: true }
        );
        console.log(`${userId} finish fetching`);
      }
      return console.log('Task     :: Fetch Rent data finish');
    } catch (error) {
      const err = error as AxiosError;
      return console.log(err);
    }
  }
}

export default Rent;
