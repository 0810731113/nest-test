"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DowngradeMiddleware = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const downgrade_service_1 = require("./downgrade.service");
let DowngradeMiddleware = class DowngradeMiddleware {
    constructor(downgradeService) {
        this.downgradeService = downgradeService;
        this.logger = new common_1.Logger('DowngradeMiddleware');
    }
    use(req, res, next) {
        if (this.downgradeService.isDowngrade) {
            this.downgradeService.redirctToCsr(req, res);
        }
        else {
            next();
        }
    }
};
DowngradeMiddleware = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [downgrade_service_1.DowngradeService])
], DowngradeMiddleware);
exports.DowngradeMiddleware = DowngradeMiddleware;
//# sourceMappingURL=downgrade.middleware.js.map