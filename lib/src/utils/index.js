"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDir = void 0;
const path_1 = require("path");
const resolveDir = (path) => path_1.resolve(process.cwd(), path);
exports.resolveDir = resolveDir;
function getVersion(str) {
    try {
        const arr = /\d+(\.\d+)+/.exec(str);
        if (arr === null) {
            throw new Error(str);
        }
        return arr[0];
    }
    catch (error) {
        console.error(`请检查cdn地址是否符合规范${str}`);
    }
}
//# sourceMappingURL=index.js.map