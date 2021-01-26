"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config.service");
let ConfigModule = class ConfigModule {
};
ConfigModule = tslib_1.__decorate([
    common_1.Module({
        providers: [
            {
                provide: config_service_1.ConfigService,
                useValue: new config_service_1.ConfigService(`.env.${process.env.BUILD_ENV || 'local'}`),
            }
        ],
        exports: [config_service_1.ConfigService],
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;
{ }
//# sourceMappingURL=config.module.js.map