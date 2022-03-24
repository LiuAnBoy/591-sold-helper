import session from 'express-session';

declare interface PassportProps {
  csrfToken: string;
  cookie: string;
}

declare module 'express-session' {
  export interface SessionData {
    csrfToken: string;
    rentCookie: string;
  }
}
