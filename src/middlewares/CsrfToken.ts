import { Application } from 'express';
import Locals from '../providers/Locals';

class CsrfToken {
  public static mount(_express: Application): Application {
    _express.set('trust proxy', 1);

    _express.use((req, res, next) => {
      res.locals.app = Locals.config();
      next();
    });

    return _express;
  }
}

export default CsrfToken;
