"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlFile = exports.serverFile = exports.cachedFiles = exports.synFiles = exports.cacheDir = void 0;
const utils_1 = require("../utils");
exports.cacheDir = utils_1.resolveDir('./.serverEntry');
exports.synFiles = ['umi.server.js', 'asset-manifest.json', 'index.html'];
exports.cachedFiles = ['umi.server.js', 'asset-manifest.json'];
exports.serverFile = 'umi.server.js';
exports.htmlFile = 'index.html';
//# sourceMappingURL=index.js.map