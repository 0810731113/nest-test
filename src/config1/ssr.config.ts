import { registerAs } from '@nestjs/config';
import { resolveDir } from '../utils';

/**
 * app相关配置
 * Business related configuration
 */
export const ssrConfig = registerAs('ssr', () => ({
  serverCacheDir: resolveDir('./.serverEntry'),
  serverEntryPath: resolveDir('./.serverEntry/umi.server.js'),
  syncInterval: 30 * 1000, // 每分钟同步一次
  throttleTime: 30 * 1000, // 同步间隔 30s
}));
