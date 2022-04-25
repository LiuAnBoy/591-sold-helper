import path from 'path';
import { Application } from 'express';

class Views {
  public static mount(_express: Application): Application {
    _express.set('views', path.join(__dirname, '../../views'));
    _express.set('view engine', 'html');
    // _express.set('view options', { pretty: true });

    return _express;
  }
}

export default Views;
