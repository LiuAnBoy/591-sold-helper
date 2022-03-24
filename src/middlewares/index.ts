import { Application } from 'express';
import CsrfToken from './CsrfToken';

import Http from './Http';

/* eslint no-param-reassign: "off" */
class Kernel {
  public static init(_express: Application): Application {
    _express = Http.mount(_express);
    _express = CsrfToken.mount(_express);

    return _express;
  }
}

export default Kernel;
