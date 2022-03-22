import axios, { AxiosError, AxiosResponse } from 'axios';
import Token from '../../models/Token';

class Tokens {
  public static async GetToken(url: string) {
    const patten = '<meta name="csrf-token" content="([A-Za-z0-9]*)">';
    const regExp = new RegExp(patten, 'gi');

    try {
      const res: AxiosResponse = await axios.get(url);

      const ct = regExp.exec(res.data);

      let csrfToken;
      if (ct) {
        csrfToken = ct[1];
      }

      let cookie;
      if (res.headers['set-cookie']) {
        cookie = res.headers['set-cookie'].filter((c) => {
          return c.includes('591_new_session');
        });
      }
      cookie = `${cookie}; urlJumpIp=3;`;

      const token = new Token({
        cookie,
        csrfToken,
      });

      // Find token data from DB
      const t = await Token.find();

      // if token not exist, save token data
      if (t.length === 0) {
        await token.save();
        return console.log('Token Save!');
      }

      await Token.findByIdAndUpdate(
        t[0].id,
        { cookie, csrfToken },
        { new: true }
      );

      return console.log('Token Updated!');
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    }
  }
}

export default Tokens;
