"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const downgrade_middleware_1 = require("../downgrade/downgrade.middleware");
const downgrade_module_1 = require("../downgrade/downgrade.module");
const entry_module_1 = require("../entry/entry.module");
const page_controller_1 = require("./page.controller");
let PageModule = class PageModule {
    configure(consumer) {
        consumer.apply(downgrade_middleware_1.DowngradeMiddleware).forRoutes(page_controller_1.PageController);
    }
};
PageModule = tslib_1.__decorate([
    common_1.Module({
        imports: [entry_module_1.EntryModule, downgrade_module_1.DowngradeModule],
        controllers: [page_controller_1.PageController],
    })
], PageModule);
exports.PageModule = PageModule;
//# sourceMappingURL=page.module.js.map