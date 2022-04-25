import { ClientConfig } from '@line/bot-sdk';

export declare interface LocalsType {
  url: string;
  port: number;
  mongoUrl: string;
  lineBotToken: string;
  lineSecret: string;
  rentUrl: string;
  rentApiUrl: string;

  notifyClientId: string;
  notifySecret: string;

  lineConfig: ClientConfig;
}
