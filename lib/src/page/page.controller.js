"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const entry_service_1 = require("../entry/entry.service");
const server_helper_1 = require("../utils/server-helper");
const stream_1 = require("stream");
const downgrade_service_1 = require("../downgrade/downgrade.service");
const http_1 = require("../utils/http");
// const { parseCookie, parseNavLang } = require('../../serverHelper');
let PageController = class PageController {
    constructor(config, entryService, downgradeService) {
        this.config = config;
        this.entryService = entryService;
        this.downgradeService = downgradeService;
        this.logger = new common_1.Logger('PageController');
        this.httpLogger = new common_1.Logger('HttpClient');
        this.httpClients = http_1.getHttpClient();
    }
    onModuleInit() {
        this.serverRender = require(this.config.get('ssr.serverEntryPath'));
        // 注册修改更新回调
        this.entryService.register((render) => {
            this.serverRender = render;
        });
    }
    async page(req, res) {
        // console.log(req.query);
        if (req.query['csr'] === 'true') {
            return this.downgradeService.redirctToCsr(req, res);
        }
        if (process.env.NODE_ENV !== 'production' ||
            req.query['csr-reload'] === 'true') {
            // 非生产环境每次都 reload
            await this.entryService.reloadEntry();
        }
        // global.console.log = () => {};
        const url = req.headers.host + req.url;
        this.logger.log(`full url:${url}, path: ${req.url}`);
        const context = {
            lang: req.cookies.locale || server_helper_1.parseNavLang(req.headers['accept-language']),
            target: this.config.get('TARGET'),
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
        if (html instanceof stream_1.Stream) {
            html.pipe(res);
            html.on('end', () => {
                res.status(200).end();
            });
            html.on('error', (e) => {
                this.logger.error(e);
                this.logger.warn('server render downgrade to CSR in Stream');
            });
        }
        else {
            res.status(200).send(html);
        }
    }
};
tslib_1.__decorate([
    common_1.Get('*'),
    tslib_1.__param(0, common_1.Req()), tslib_1.__param(1, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "page", null);
PageController = tslib_1.__decorate([
    common_1.Controller('/'),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService,
        entry_service_1.EntryService,
        downgrade_service_1.DowngradeService])
], PageController);
exports.PageController = PageController;
//# sourceMappingURL=page.controller.js.map