import { Application } from 'express';
import CsrfToken from './CsrfToken';

import Http from './Http';
import Views from './Views';

/* eslint no-param-reassign: "off" */
class Kernel {
  public static init(_express: Application): Application {
    // Mount basic express apis middleware
    _express = Http.mount(_express);

    // Mount csrf token verification middleware
    _express = CsrfToken.mount(_express);

    // Mount view engine middleware
    _express = Views.mount(_express);

    return _express;
  }
}

export default Kernel;
