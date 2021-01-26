"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LoggerMiddleware = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const log4js_1 = require("../utils/log4js");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        const code = res.statusCode;
        next();
        const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n`;
        if (code >= 500) {
            log4js_1.Logger.error(logFormat);
        }
        else if (code >= 400) {
            log4js_1.Logger.warn(logFormat);
        }
        else {
            log4js_1.Logger.access(logFormat);
            log4js_1.Logger.log(logFormat);
        }
    }
};
LoggerMiddleware = tslib_1.__decorate([
    common_1.Injectable()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
// 函数式中间件
function logger(req, res, next) {
    const code = res.statusCode;
    next();
    // console.log(req);
    // req.parmas
    const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
    if (code >= 500) {
        log4js_1.Logger.error(logFormat);
    }
    else if (code >= 400) {
        log4js_1.Logger.warn(logFormat);
    }
    else {
        log4js_1.Logger.access(logFormat);
        log4js_1.Logger.log(logFormat);
    }
}
exports.logger = logger;
//# sourceMappingURL=logger.middleware.js.map