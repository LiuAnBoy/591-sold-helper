import cors from 'cors';
import { Application } from 'express';

import Locals from '../providers/Locals';

class Views {
  public static mount(_express: Application): Application {
    const options = {
      origin: Locals.config().url,
      optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    };

    _express.use(cors(options));

    return _express;
  }
}

export default Views;
