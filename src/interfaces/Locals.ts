import { ClientConfig } from '@line/bot-sdk';

export declare interface LocalsType {
  url: string;
  port: number;
  mongoUrl: string;
  lineBotToken: string;
  lineSecret: string;
  userId: string;
  taskJobFreq: string;

  lineConfig: ClientConfig;
}
