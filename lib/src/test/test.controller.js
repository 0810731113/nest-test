"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const test_service_1 = require("./test.service");
let TestController = class TestController {
    constructor(testService) {
        this.testService = testService;
    }
    async findAll() {
        return this.testService.findAll();
    }
    async findOne(username) {
        const user = await this.testService.findOne(username);
        return user;
    }
    async getBody(
    // @Param('id') id: number,
    // @Query('key') key: string,
    body) {
        console.log(body);
        const user = await this.testService.findOne(body === null || body === void 0 ? void 0 : body.username);
        return user;
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "findAll", null);
tslib_1.__decorate([
    common_1.Get(':username'),
    tslib_1.__param(0, common_1.Param('username')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "findOne", null);
tslib_1.__decorate([
    common_1.Post('username'),
    tslib_1.__param(0, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "getBody", null);
TestController = tslib_1.__decorate([
    common_1.Controller('test'),
    tslib_1.__metadata("design:paramtypes", [test_service_1.TestService])
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=test.controller.js.map