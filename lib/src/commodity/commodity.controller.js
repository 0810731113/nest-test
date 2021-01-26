"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommodityController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const commodity_service_1 = require("./commodity.service");
const rbac_guard_1 = require("../guards/rbac.guard");
const constants_1 = require("../logical/auth/constants");
let CommodityController = class CommodityController {
    constructor(commodityService) {
        this.commodityService = commodityService;
    }
    // 查询商品列表
    async queryColumnList(body) {
        return await this.commodityService.queryCommodityList(body);
    }
    // 新建商品
    async createCommodity(body, req) {
        return await this.commodityService.createCommodity(body, req.user.username);
    }
    // 修改商品
    async updateCommodity(body, req) {
        return await this.commodityService.updateCommodity(body, req.user.username);
    }
    // 删除商品
    async deleteCommodity(body, req) {
        console.log(`--------------req.user-----------`);
        console.log(req.user);
        return await this.commodityService.deleteCommodity(body);
    }
};
tslib_1.__decorate([
    common_1.UseGuards(new rbac_guard_1.RbacGuard(constants_1.roleConstans.HUMAN)),
    common_1.UseGuards(passport_1.AuthGuard('jwt'))
    // @UseInterceptors(new RbacInterceptor(role.HUMAN))
    ,
    common_1.Post('list'),
    tslib_1.__param(0, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommodityController.prototype, "queryColumnList", null);
tslib_1.__decorate([
    common_1.UseGuards(new rbac_guard_1.RbacGuard(constants_1.roleConstans.DEVELOPER)),
    common_1.UseGuards(passport_1.AuthGuard('jwt'))
    // @UseInterceptors(new RbacInterceptor(role.DEVELOPER))
    ,
    common_1.Post('create'),
    tslib_1.__param(0, common_1.Body()), tslib_1.__param(1, common_1.Request()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommodityController.prototype, "createCommodity", null);
tslib_1.__decorate([
    common_1.UseGuards(new rbac_guard_1.RbacGuard(constants_1.roleConstans.DEVELOPER)),
    common_1.UseGuards(passport_1.AuthGuard('jwt'))
    // @UseInterceptors(new RbacInterceptor(role.DEVELOPER))
    ,
    common_1.Post('update'),
    tslib_1.__param(0, common_1.Body()), tslib_1.__param(1, common_1.Request()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommodityController.prototype, "updateCommodity", null);
tslib_1.__decorate([
    common_1.UseGuards(new rbac_guard_1.RbacGuard(constants_1.roleConstans.ADMIN)),
    common_1.UseGuards(passport_1.AuthGuard('jwt'))
    // @UseInterceptors(new RbacInterceptor(role.ADMIN))
    ,
    common_1.Post('delete'),
    tslib_1.__param(0, common_1.Body()), tslib_1.__param(1, common_1.Request()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommodityController.prototype, "deleteCommodity", null);
CommodityController = tslib_1.__decorate([
    common_1.Controller('commodity'),
    tslib_1.__metadata("design:paramtypes", [commodity_service_1.CommodityService])
], CommodityController);
exports.CommodityController = CommodityController;
//# sourceMappingURL=commodity.controller.js.map