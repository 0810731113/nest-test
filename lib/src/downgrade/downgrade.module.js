"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DowngradeModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const downgrade_service_1 = require("./downgrade.service");
const http_1 = tslib_1.__importDefault(require("http"));
const https_1 = tslib_1.__importDefault(require("https"));
let DowngradeModule = class DowngradeModule {
};
DowngradeModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            common_1.HttpModule.register({
                timeout: 30 * 1000,
                maxRedirects: 5,
                validateStatus(status) {
                    return status >= 200 && status <= 400;
                },
                httpAgent: new http_1.default.Agent({ keepAlive: true }),
                httpsAgent: new https_1.default.Agent({ keepAlive: true }),
            }),
        ],
        providers: [downgrade_service_1.DowngradeService],
        exports: [downgrade_service_1.DowngradeService],
    })
], DowngradeModule);
exports.DowngradeModule = DowngradeModule;
//# sourceMappingURL=downgrade.module.js.map