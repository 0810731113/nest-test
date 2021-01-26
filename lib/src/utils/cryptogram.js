"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = exports.makeSalt = void 0;
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("crypto"));
/**
 * Make salt
 */
function makeSalt() {
    return crypto.randomBytes(3).toString('base64');
}
exports.makeSalt = makeSalt;
/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
function encryptPassword(password, salt) {
    if (!password || !salt) {
        return '';
    }
    const tempSalt = Buffer.from(salt, 'base64');
    return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64'));
}
exports.encryptPassword = encryptPassword;
//# sourceMappingURL=cryptogram.js.map