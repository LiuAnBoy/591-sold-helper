import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';
import Token from '../../../models/Token';

class Fetch {
  public static async getToken(req: Request, res: Response) {
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
        const result = r.headers['set-cookie'].filter((d) => {
          return d.includes('591_new_session');
        });
        cookie = `${result}; urlJumpIp=3;`;
      }

      // Find token data from DB
      const tokenData = await Token.find();

      await Token.findByIdAndUpdate(
        tokenData[0].id,
        { cookie, csrfToken },
        { new: true }
      );

      console.log('Token update');
      // return res.send({ cookie, csrfToken });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      return res.status(500).send({ msg: err.message });
    }
  }
}

export default Fetch;
