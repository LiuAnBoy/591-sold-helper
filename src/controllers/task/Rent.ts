import axios, { AxiosRequestHeaders, AxiosError } from 'axios';
import { MongoError } from 'mongodb';
import IHouse from '../../interfaces/models/House';

import House from '../../models/House';
import Token from '../../models/Token';
import Notify from '../line/Notify';

class Rent {
  public static async Fetch(): Promise<void> {
    console.log('Task     :: Start fetch Rent data');
    const lineNotify = new Notify();
    try {
      const token = await Token.find();

      const headers: AxiosRequestHeaders = {
        'X-CSRF-TOKEN': token[0].csrfToken,
        Cookie: token[0].cookie,
      };

      const rentData = await axios.get(
        ' https://rent.591.com.tw/home/search/rsList?is_format_data=1&is_new_list=1&type=1&section=37,38&searchtype=1&rentprice=15000,25000&showMore=1&area=13,&order=posttime&orderType=desc',
        { headers }
      );

      const data = {
        title: rentData.data.data.data[0].title,
        pId: rentData.data.data.data[0].post_id,
        kindName: rentData.data.data.data[0].kind_name,
        room: rentData.data.data.data[0].room_str,
        floor: rentData.data.data.data[0].floor_str,
        price: rentData.data.data.data[0].price,
        section: rentData.data.data.data[0].section_name,
        area: rentData.data.data.data[0].area,
      };

      // console.log(rentData);
      const saveData = new House(data);

      const house = await House.find();

      if (house.length === 0) {
        saveData.save((error: any) => {
          if (error instanceof MongoError) {
            return console.log(error);
          }
          return console.log('Task     :: Save new Rent data finish');
        });
      }

      if (house[0].pId === rentData.data.data.data[0].post_id) {
        return console.log('Task     :: No more new Rent data');
      }

      const idx = rentData.data.data.data.findIndex(
        (d: any) => d.post_id === house[0].pId
      );

      for (let i = 0; i < idx; i += 1) {
        const d: IHouse = {
          title: rentData.data.data.data[i].title,
          pId: rentData.data.data.data[i].post_id,
          kindName: rentData.data.data.data[i].kind_name,
          room: rentData.data.data.data[i].room_str,
          floor: rentData.data.data.data[i].floor_str,
          price: rentData.data.data.data[i].price,
          section: rentData.data.data.data[i].section_name,
          area: rentData.data.data.data[i].area,
        };
        lineNotify.push(d);
      }

      await House.findOneAndUpdate({ pid: house[0].pId }, data, { new: true });

      return console.log('Task     :: Fetch Rent data finish');
    } catch (error) {
      const err = error as AxiosError;
      return console.log(err);
    }
  }
}

export default Rent;
