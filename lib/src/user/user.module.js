"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    common_1.Module({
        //controllers: [UserController],
        providers: [user_service_1.UserService],
        //imports:[AuthService],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map