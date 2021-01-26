import { OnModuleInit } from '@nestjs/common';
import { Controller, Get, Logger, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { EntryService } from '../entry/entry.service';
import { ServerRenderContext } from '../types/renderContext';
import { parseNavLang } from '../utils/server-helper';
import { Stream } from 'stream';
import { DowngradeService } from '../downgrade/downgrade.service';
import { getHttpClient } from '../utils/http';
// const { parseCookie, parseNavLang } = require('../../serverHelper');

@Controller('/')
export class PageController implements OnModuleInit {
  serverRender!: Function;
  logger = new Logger('PageController');
  httpLogger = new Logger('HttpClient');
  httpClients = getHttpClient();

  constructor(
    private config: ConfigService,
    private entryService: EntryService,
    private downgradeService: DowngradeService,
  ) {}

  onModuleInit() {
    this.serverRender = require(this.config.get('ssr.serverEntryPath')!);

    // 注册修改更新回调
    this.entryService.register((render) => {
      this.serverRender = render;
    });
  }

  @Get('*')
  async page(@Req() req: Request, @Res() res: Response) {
    // console.log(req.query);
    if (req.query['csr'] === 'true') {
      return this.downgradeService.redirctToCsr(req, res);
    }

    if (
      process.env.NODE_ENV !== 'production' ||
      req.query['csr-reload'] === 'true'
    ) {
      // 非生产环境每次都 reload
      await this.entryService.reloadEntry();
    }

    // global.console.log = () => {};
    const url = req.headers.host + req.url;
    this.logger.log(`full url:${url}, path: ${req.url}`);
    const context: ServerRenderContext = {
      lang: req.cookies.locale || parseNavLang(req.headers['accept-language']),
      target: this.config.get('TARGET')!, // TODO: 线上替换成内网域名
      httpClients: this.httpClients,
      req: {
        cookie: req.headers.cookie,
        cookies: req.cookies,
        userAgent: req.headers['user-agent'] || '',
      },
      res: {
        'set-cookie': [],
      },
      logger: this.httpLogger,
    };

    // eslint-disable-next-line prefer-const
    let { error, html } = await this.serverRender({
      path: req.url,
      getInitialPropsCtx: {},
      basename: this.config.get('BASE'),
      origin: `${req.protocol}://${req.headers.host}`,
      context,
      mode: this.config.get('MODE', 'stream'),
    });

    if (error) {
      this.logger.error(error);
      // html is downgrade to csr
      this.logger.warn('server render downgrade to CSR ');
    }

    res.setHeader('cache-control', 'no-cache');
    res.setHeader('content-type', 'text/html; charset=UTF-8');
    context.res['set-cookie'].forEach((ck) => {
      res.setHeader('set-cookie', ck);
    });

    // support stream content
    // console.log(html);
    if (html instanceof Stream) {
      html.pipe(res);
      html.on('end', () => {
        res.status(200).end();
      });
      html.on('error', (e) => {
        this.logger.error(e);
        this.logger.warn('server render downgrade to CSR in Stream');
      });
    } else {
      res.status(200).send(html);
    }
  }
}
