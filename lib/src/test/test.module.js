"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const test_controller_1 = require("./test.controller");
const test_service_1 = require("./test.service");
let TestModule = class TestModule {
};
TestModule = tslib_1.__decorate([
    common_1.Module({
        controllers: [test_controller_1.TestController],
        providers: [test_service_1.TestService]
    })
], TestModule);
exports.TestModule = TestModule;
//# sourceMappingURL=test.module.js.map