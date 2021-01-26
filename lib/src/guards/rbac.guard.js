"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let RbacGuard = class RbacGuard {
    // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）
    constructor(role) {
        this.role = role;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user.role > this.role) {
            throw new common_1.ForbiddenException('对不起，您无权操作');
        }
        return true;
    }
};
RbacGuard = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [Number])
], RbacGuard);
exports.RbacGuard = RbacGuard;
//# sourceMappingURL=rbac.guard.js.map