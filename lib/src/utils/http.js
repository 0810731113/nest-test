"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHttpClient = void 0;
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const https_1 = tslib_1.__importDefault(require("https"));
function getHttpClient() {
    return {
        httpAgent: new http_1.default.Agent({ keepAlive: true }),
        httpsAgent: new https_1.default.Agent({ keepAlive: true }),
    };
}
exports.getHttpClient = getHttpClient;
//# sourceMappingURL=http.js.map