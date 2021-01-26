"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
// import {Cat} from "../test/interface/cat.interface";
const auth_service_1 = require("../logical/auth/auth.service");
const passport_1 = require("@nestjs/passport");
const user_dto_1 = require("./user.dto");
const validation_pipe_1 = require("../pipe/validation.pipe");
const swagger_1 = require("@nestjs/swagger");
const user_dto_2 = require("./user.dto");
// @ts-ignore
let UserController = class UserController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    // @Get()
    // async findAll(username: string): Promise<any[]>{
    //     return this.userService.findAll(username);
    // }
    async findOne(username) {
        const user = await this.userService.findOne(username);
        return user;
    }
    async getAll(
    // @Param('id') id: number,
    // @Query('key') key: string,
    username) {
        console.log(username);
        const user = await this.userService.findAll(username);
        return user;
    }
    async register(body) {
        return await this.userService.register(body);
    }
    // JWT验证 - Step 1: 用户请求登录
    async login(loginParmas) {
        console.log('JWT验证 - Step 1: 用户请求登录');
        const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
        switch (authResult.code) {
            case 1:
                return this.authService.certificate(authResult.user);
            case 2:
                return {
                    code: 600,
                    msg: `账号或密码不正确`,
                };
            default:
                return {
                    code: 600,
                    msg: `查无此人`,
                };
        }
    }
};
tslib_1.__decorate([
    common_1.Get(':username'),
    tslib_1.__param(0, common_1.Param('username')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
tslib_1.__decorate([
    common_1.Post('all'),
    tslib_1.__param(0, common_1.Body('username')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
tslib_1.__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    common_1.Post('register'),
    swagger_1.ApiBody({
        description: '用户注册',
        type: user_dto_1.RegisterInfoDTO,
    }),
    tslib_1.__param(0, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [user_dto_1.RegisterInfoDTO]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
tslib_1.__decorate([
    common_1.Post('login'),
    swagger_1.ApiBody({
        description: '用户登录',
        type: user_dto_2.LoginDTO,
    }),
    tslib_1.__param(0, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = tslib_1.__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('user'),
    swagger_1.ApiHeader({
        name: 'token',
        description: 'token'
    }),
    common_1.Controller('user'),
    tslib_1.__metadata("design:paramtypes", [auth_service_1.AuthService, user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map