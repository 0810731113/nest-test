import { Logger } from '@nestjs/common';
import http from 'http';

export type Lang = 'zh_CN' | 'en_US';
export enum LOCALE {
  default = 'zh_CN',
  zh = 'zh_CN',
  en = 'en_US',
}
export type ServerRenderContext = {
  lang: Lang;
  target: string;
  httpClients: {
    httpAgent: http.Agent;
    httpsAgent: http.Agent;
  };
  req: {
    cookie: string | undefined;
    cookies: Record<string, string>;
    userAgent: string;
  };
  res: {
    'set-cookie': string[];
  };
  logger: Logger;
};