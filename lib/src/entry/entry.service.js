"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const constants_1 = require("../constants");
const sync_server_1 = require("../utils/sync-server");
const pm2_1 = tslib_1.__importDefault(require("pm2"));
/**
 * 用来缓存和同步 umi.server.js
 * If-None-Match: W/"9a22e3-Xyi8H6Oi75XeUEojzSsulU8wMjg"
 */
let EntryService = class EntryService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger('EntryService');
        this.callbacks = [];
        this.serverPath = this.config.get('ssr.serverEntryPath');
    }
    async onModuleInit() {
        this.syncEntryFromAgent();
        // 第一次主动下载
        // console.log(process.env.START_BY_PM2);
        // if (process.env.START_BY_PM2 !== 'true') {
        await this.reloadEntry();
        // }
    }
    register(cb) {
        this.callbacks.push(cb);
    }
    // 根据 agent 消息同步 serverjs 缓存
    syncEntryFromAgent() {
        process.on('message', (packet) => {
            // console.log(packet);
            if (packet.data.type === 'updateServerJs' && packet.topic === 'worker') {
                this.logger.log('recv agent message:  updateServerJs');
                this.notifyNewEntry();
            }
        });
    }
    notifyNewEntry() {
        this.removeCacheEntry();
        const entry = this.getCacheEntry();
        this.callbacks.forEach((cb) => cb(entry));
    }
    async reloadEntry() {
        if (process.env.START_BY_PM2 === 'true' && process.send) {
            this.reloadEntryByAgent();
        }
        else {
            await this.reloadEntryBySelf();
        }
    }
    // 不走 agent, 自己 reload
    async reloadEntryBySelf() {
        this.logger.log('reload entry by self');
        const res = await sync_server_1.checkServerJs();
        if (res) {
            this.notifyNewEntry();
        }
    }
    // 不需要同步, 异步同步
    reloadEntryByAgent() {
        this.logger.log('reload entry by send to agent message');
        // console.log(process.send.toString());
        // console.log(process.connected);
        pm2_1.default.connect(function (err) {
            if (err) {
                console.error(err);
                process.exit(2);
            }
            pm2_1.default.list((err, list) => {
                if (err) {
                    return;
                }
                const agent = list.filter((l) => l.name.endsWith('-agent'))[0];
                pm2_1.default.sendDataToProcessId(agent.pm_id, {
                    type: 'process:msg',
                    data: { type: 'checkServerJs' },
                    topic: 'agent',
                }, () => { });
            });
        });
        process.send({
            type: 'process:msg',
            data: {
                success: true,
            },
            topic: 'agent',
        });
    }
    getCacheEntry() {
        return require(this.serverPath);
    }
    removeCacheEntry() {
        constants_1.cachedFiles.forEach((file) => {
            let path = constants_1.cacheDir + '/' + file;
            delete require.cache[path];
        });
    }
};
EntryService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
], EntryService);
exports.EntryService = EntryService;
//# sourceMappingURL=entry.service.js.map