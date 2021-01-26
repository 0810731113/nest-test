"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const entry_service_1 = require("./entry.service");
let EntryModule = class EntryModule {
};
EntryModule = tslib_1.__decorate([
    common_1.Module({
        imports: [],
        providers: [entry_service_1.EntryService],
        exports: [entry_service_1.EntryService],
    })
], EntryModule);
exports.EntryModule = EntryModule;
//# sourceMappingURL=entry.module.js.map