import { ClientConfig } from '@line/bot-sdk';

export declare interface LocalsType {
  url: string;
  port: number;
  mongoUrl: string;
  lineBotToken: string;
  lineSecret: string;
  taskJobFreq: string;
  rentUrl: string;

  lineConfig: ClientConfig;
}
