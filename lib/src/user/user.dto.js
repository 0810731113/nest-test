"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterInfoDTO = exports.LoginDTO = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class LoginDTO {
}
tslib_1.__decorate([
    swagger_1.ApiProperty({ description: '用户名', example: 'koa2', }),
    class_validator_1.IsNotEmpty({ message: '用户名不能为空' }),
    tslib_1.__metadata("design:type", String)
], LoginDTO.prototype, "username", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty({ description: '密码', example: 'a123456' }),
    class_validator_1.IsNotEmpty({ message: '密码不能为空' }),
    tslib_1.__metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
exports.LoginDTO = LoginDTO;
class RegisterInfoDTO {
}
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({ message: '用户名不能为空' }),
    tslib_1.__metadata("design:type", String)
], RegisterInfoDTO.prototype, "accountName", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({ message: '真实姓名不能为空' }),
    class_validator_1.IsString({ message: '真实姓名必须是 String 类型' }),
    tslib_1.__metadata("design:type", String)
], RegisterInfoDTO.prototype, "realName", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({ message: '密码不能为空' }),
    tslib_1.__metadata("design:type", String)
], RegisterInfoDTO.prototype, "password", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({ message: '重复密码不能为空' }),
    tslib_1.__metadata("design:type", String)
], RegisterInfoDTO.prototype, "repassword", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({ message: '手机号不能为空' }),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], RegisterInfoDTO.prototype, "mobile", void 0);
tslib_1.__decorate([
    swagger_1.ApiPropertyOptional({
        description: '[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）',
        enum: [0, 1, 2, 3, 4]
    }),
    tslib_1.__metadata("design:type", Object)
], RegisterInfoDTO.prototype, "role", void 0);
exports.RegisterInfoDTO = RegisterInfoDTO;
//# sourceMappingURL=user.dto.js.map