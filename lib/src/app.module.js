"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const test_module_1 = require("./test/test.module");
const user_module_1 = require("./user/user.module");
const config_module_1 = require("./config/config.module");
const auth_module_1 = require("./logical/auth/auth.module");
const user_controller_1 = require("./user/user.controller");
const commodity_service_1 = require("./commodity/commodity.service");
const commodity_controller_1 = require("./commodity/commodity.controller");
// import { EntryModule } from './entry/entry.module';
// import {ConfigService} from '@nestjs/config';
const page_module_1 = require("./page/page.module");
const entry_module_1 = require("./entry/entry.module");
const downgrade_module_1 = require("./downgrade/downgrade.module");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    common_1.Module({
        imports: [test_module_1.TestModule, config_module_1.ConfigModule, user_module_1.UserModule, auth_module_1.AuthModule],
        controllers: [user_controller_1.UserController, commodity_controller_1.CommodityController, page_module_1.PageModule, entry_module_1.EntryModule, downgrade_module_1.DowngradeModule],
        providers: [app_service_1.AppService, commodity_service_1.CommodityService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map