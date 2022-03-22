import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import House from '../../../models/House';

import Locals from '../../../providers/Locals';

class Fetch {
  public static async getData(req: Request, res: Response) {
    const patten = '<meta name="csrf-token" content="([A-Za-z0-9]*)">';
    const regExp = new RegExp(patten, 'gi');
    try {
      const r = await axios.get(
        'https://rent.591.com.tw/?section=37,38&searchtype=1&rentprice=15000,25000&showMore=1&area=13,&order=posttime&orderType=desc'
      );

      const token = regExp.exec(r.data);

      let csrfToken;
      if (token) {
        csrfToken = token[1];
      }

      let cookie;
      if (r.headers['set-cookie']) {
        cookie = r.headers['set-cookie'].filter((d) => {
          return d.includes('591_new_session');
        });
      }

      const c = `${cookie}; urlJumpIp=3`;

      return res.send({ cookie: c, csrfToken });

      // return res.send({
      //   cookie,
      //   csrfToken,
      // });
    } catch (error) {
      const errMsg = error as AxiosError;
      return res.status(500).send({ msg: errMsg.message });
    }
  }
}

export default Fetch;
