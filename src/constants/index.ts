import { resolveDir } from '../utils';

export const cacheDir = resolveDir('./.serverEntry');
export const synFiles = ['umi.server.js', 'asset-manifest.json', 'index.html'];
export const cachedFiles = ['umi.server.js', 'asset-manifest.json'];
export const serverFile = 'umi.server.js';
export const htmlFile = 'index.html';
