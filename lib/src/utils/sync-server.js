"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkServerJs = void 0;
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const https_1 = tslib_1.__importDefault(require("https"));
const shelljs_1 = tslib_1.__importDefault(require("shelljs"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const axios_1 = tslib_1.__importDefault(require("axios"));
const assert_1 = tslib_1.__importDefault(require("assert"));
const constants_1 = require("../constants");
const httpClient = axios_1.default.create({
    timeout: 3000,
    maxRedirects: 5,
    validateStatus(status) {
        return status >= 200 && status <= 400;
    },
    httpAgent: new http_1.default.Agent({ keepAlive: true }),
    httpsAgent: new https_1.default.Agent({ keepAlive: true }),
});
let eTagMap = {};
/**
 *
 *
 * @returns {Promise<boolean>} 是否更新了? false 为不需要更新, true 为已通知 worker 更新
 */
async function checkServerJs() {
    // const fetchUrl = process.env.SSR_ENTRY_JS;
    let baseUrl = `${process.env.TARGET}${process.env.PUBLIC_PATH}`;
    let ret = false;
    try {
        let isUpdated = await peekUpdate(baseUrl + constants_1.serverFile);
        if (!isUpdated) {
            return false;
        }
        let results = await Promise.allSettled(
        // let results = await Promise.all(
        constants_1.synFiles.map((name) => baseUrl + name).map((url) => getFile(url)));
        results.forEach((res, idx) => {
            if (res.status === 'fulfilled') {
                if (typeof res.value === 'boolean') {
                    ret || (ret = res.value);
                }
                else {
                    if (!fs_1.default.existsSync(constants_1.cacheDir)) {
                        shelljs_1.default.mkdir('-p', constants_1.cacheDir);
                    }
                    fs_1.default.writeFileSync(path_1.default.join(constants_1.cacheDir, constants_1.synFiles[idx]), res.value);
                    ret = true;
                }
            }
            else {
                console.error(res.reason);
            }
        });
    }
    catch (e) {
        console.error(e);
    }
    return ret;
}
exports.checkServerJs = checkServerJs;
async function getFile(url) {
    assert_1.default(url);
    console.log(`get file from url ${url}`);
    const res = await httpClient.get(url, {
        headers: {
            'If-None-Match': eTagMap[url] || '',
        },
    });
    // 如果是 json, 要变成 string
    let data = typeof res.data === 'string' ? res.data : JSON.stringify(res.data);
    console.log(`get response ${res.status} from ${url}, etag:${JSON.stringify(res.headers.etag)}, length:${data.length}`);
    if (res.status === 304) {
        //  304 代表不需要修改
        return false;
    }
    eTagMap[url] = res.headers.etag;
    return data;
}
/**
 *
 *
 * @param {string} url
 * @returns {Promise<boolean>} 是否更新了
 */
async function peekUpdate(url) {
    console.log(`peek file: it is update?. from url ${url}`);
    if (!eTagMap[url]) {
        console.log(`updated`);
        return true;
    }
    const res = await httpClient.head(url, {
        headers: {
            'If-None-Match': eTagMap[url] || '',
        },
    });
    if (res.status === 304) {
        console.log(`no update`);
        return false;
    }
    else {
        console.log(`updated: etag:${JSON.stringify(res.headers.etag)}, length:${res.data.length}`);
        return true;
    }
}
//# sourceMappingURL=sync-server.js.map