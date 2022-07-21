import axios, { AxiosError } from 'axios';

import fs from 'fs-extra';
import { IHouse } from '../../interfaces/models/House';

import Notify from '../line/Notify';
import User from '../../models/User';

class Rent {
  public static async Fetch(): Promise<void> {
    console.log('Task     :: Start fetch Rent data');
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
        const notifyToken = userData[i].notifyToken;
        const existHouseId = userData[i].condition_591.houseId;
        console.log(`${userId} start fetching`);
        const rentData = await axios.get(userData[i].condition_591.url, {
          headers,
        });

        if (!userData[i].condition_591.url) {
          continue;
        }

        if (rentData.data.data.house_list.length === 0) {
          continue;
        }

        // Remove first advertisement item
        rentData.data.data.house_list.shift();

        const newHouseId = rentData.data.data.house_list[0].houseid;

        /* eslint no-continue: "off" */
        if (existHouseId === newHouseId) {
          console.log(`${userId} finish fetching same House id`);
          continue;
        }

        const idx = rentData.data.data.house_list.findIndex(
          (d: any) => d.houseid === existHouseId
        );

        for (let j = 0; j < idx; j += 1) {
          const d: IHouse = {
            title: rentData.data.data.house_list[j].title,
            houseId: rentData.data.data.house_list[j].houseid,
            kindName: rentData.data.data.house_list[j].kind_name,
            room: rentData.data.data.house_list[j].room,
            floor: rentData.data.data.house_list[j].floor,
            unitPrice: rentData.data.data.house_list[j].unit_price,
            totalPrice: rentData.data.data.house_list[j].price,
            address: rentData.data.data.house_list[j].address,
            area: rentData.data.data.house_list[j].area,
            regionName: rentData.data.data.house_list[j].region_name,
            sectionName: rentData.data.data.house_list[j].section_name,
          };
          Notify.push(d, notifyToken);
        }

        await User.findOneAndUpdate(
          { userId },
          { 'condition_591.houseId': newHouseId },
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
