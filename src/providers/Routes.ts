import { Application } from 'express';
import ApiRouter from '../routes/Api';
import WebRouter from '../routes/Web';

/* eslint class-methods-use-this: "off" */
class Routes {
  public mountWeb(_express: Application): Application {
    console.log('Routes   :: Mounting Web Routes...');
    return _express.use('/', WebRouter);
  }

  public mountApi(_express: Application): Application {
    console.log('Routes   :: Mounting API Routes...');
    return _express.use('/api', ApiRouter);
  }
}

export default new Routes();
