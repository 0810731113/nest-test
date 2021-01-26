"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const cryptogram_1 = require("../../utils/cryptogram");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    // JWT验证 - Step 2: 校验用户信息
    async validateUser(username, password) {
        console.log('JWT验证 - Step 2: 校验用户信息');
        const user = await this.usersService.findOne(username);
        if (user) {
            const hashedPassword = user.password;
            const salt = user.salt;
            // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
            const hashPassword = cryptogram_1.encryptPassword(password, salt);
            if (hashedPassword === hashPassword) {
                // 密码正确
                return {
                    code: 1,
                    user,
                };
            }
            else {
                // 密码错误
                return {
                    code: 2,
                    user: null,
                };
            }
        }
        // 查无此人
        return {
            code: 3,
            user: null,
        };
    }
    // JWT验证 - Step 3: 处理 jwt 签证
    async certificate(user) {
        const payload = { username: user.username, sub: user.userId, realName: user.realName, role: user.role };
        console.log('JWT验证 - Step 3: 处理 jwt 签证');
        try {
            const token = this.jwtService.sign(payload);
            return {
                code: 200,
                data: {
                    token,
                },
                msg: `登录成功`,
            };
        }
        catch (error) {
            return {
                code: 600,
                msg: `账号或密码错误`,
            };
        }
    }
};
AuthService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map