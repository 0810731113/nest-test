"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const http_1 = require("./utils/http");
const config_1 = require("@nestjs/config");
const entry_service_1 = require("./entry/entry.service");
let AppController = class AppController {
    constructor(config, entryService) {
        this.config = config;
        this.entryService = entryService;
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
    //@Render('index')
    root(req, res) {
        // return this.appService.getHello();
        return { message: 'Hello world!11111' };
    }
};
tslib_1.__decorate([
    common_1.Get('*'),
    tslib_1.__param(0, common_1.Req()), tslib_1.__param(1, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "root", null);
AppController = tslib_1.__decorate([
    common_1.Controller('/'),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService,
        entry_service_1.EntryService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map