import axios, { AxiosError } from 'axios';
import fs from 'fs-extra';
import { Request, Response } from 'express';

import Locals from '../../../providers/Locals';
import User from '../../../models/User';

class Fetch {
  public static async getToken(req: Request, res: Response) {
    try {
      const r = await axios.get(Locals.config().rentUrl);

      // Get csrf token from 591 web
      const patten = '<meta name="csrf-token" content="([A-Za-z0-9]*)">';
      const regExp = new RegExp(patten, 'gi');
      const token = regExp.exec(r.data);

      let csrfToken;
      if (token) {
        csrfToken = token[1];
      }

      // Get cookie from 591 web response
      let cookie;
      if (r.headers['set-cookie']) {
        const result = r.headers['set-cookie'].filter((d) => {
          return d.includes('591_new_session');
        });
        cookie = `${result}; urlJumpIp=3;`;
      }

      const tokenObj = {
        csrfToken,
        cookie,
      };

      fs.writeJSON('./token.json', tokenObj, (err) => {
        if (err) return console.log(err as Error);
        console.log('Token has been updated');
      });
      return res.send('已更新憑證。');
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      return res.status(500).send({ msg: err.message });
    }
  }

  public static async fetchUser(req: Request, res: Response) {
    try {
      const headers = {
        'X-CSRF-TOKEN': '',
        Cookie: '',
      };

      const readData = await fs.readJson('./token.json');
      headers['X-CSRF-TOKEN'] = readData.csrfToken;
      headers.Cookie = readData.cookie;

      const userData = await User.aggregate([
        {
          $group: {
            _id: '$id',
            userId: { $first: '$userId' },
          },
        },
      ]);

      console.log(userData);
      return res.send(userData);
    } catch (error) {
      const err = error as AxiosError;
      return console.log(err);
    }
  }
}

export default Fetch;
