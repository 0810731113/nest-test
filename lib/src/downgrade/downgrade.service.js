"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DowngradeService = void 0;
const tslib_1 = require("tslib");
const os_1 = tslib_1.__importDefault(require("os"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path_1 = tslib_1.__importDefault(require("path"));
const constants_1 = require("../constants");
const DEFAULT_TIME_OUT = 60 * 1000; // 一分钟
const MAX_TIME_OUT = 15 * 60 * 1000; // 15分钟
const CPU_THRESHOLD = 1.0; // cpu 最大百分比
// const MEM_THRESHOLD = 0.9; // 内存 最大百分比
/**
 * 定时监测
 * 每次触发降级, 降级时间依次递增: 1 -> 5 -> 10
 */
let DowngradeService = class DowngradeService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_2.Logger('DowngradeService');
        this.downgrade = false;
        this.timeout = DEFAULT_TIME_OUT;
        this.timeout = DEFAULT_TIME_OUT + Math.random() * DEFAULT_TIME_OUT; // 让每个服务开始检测时间不同
        this.checkTimer();
    }
    onModuleDestroy() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    checkTimer() {
        this.timer = setTimeout(() => {
            const lastDowngrade = this.downgrade;
            if (this.isOverLoad()) {
                this.downgrade = true;
                if (lastDowngrade === this.downgrade) {
                    // 触发第二次降级
                    this.timeout += 5 * DEFAULT_TIME_OUT;
                }
                this.timeout = Math.min(this.timeout, MAX_TIME_OUT);
                this.logger.warn(`触发降级, 降级时间: ${(this.timeout / 1000).toFixed(0)} s`);
            }
            else {
                // 重置
                this.downgrade = false;
                this.timeout = DEFAULT_TIME_OUT;
                if (lastDowngrade !== this.downgrade) {
                    this.logger.warn(`解除降级`);
                }
            }
            this.checkTimer();
        }, this.timeout);
    }
    /**
     * 获取 内存 信息
     *  sys: ,
        heap: ,
        node: ,
     * @returns  内存 信息
     */
    getMemoryUsage() {
        const { rss, heapUsed, heapTotal } = process.memoryUsage();
        const sysFree = os_1.default.freemem();
        const sysTotal = os_1.default.totalmem();
        return [1 - sysFree / sysTotal, heapUsed / heapTotal, rss / sysTotal];
    }
    getCPULoadavg() {
        return os_1.default.loadavg().map((load) => load / os_1.default.cpus().length);
    }
    isOverLoad() {
        let overloaded = false;
        this.logger.log('check node service is overload?');
        // cpu load 小于 cpu 核数 80%
        overloaded = this.getCPULoadavg().some((load) => load > CPU_THRESHOLD);
        if (overloaded) {
            this.logger.warn(`cpu overload ${this.getCPULoadavg()}`);
            return overloaded;
        }
        // 内存使用率过高直接重启
        // 内存使用率小于 90%
        // overloaded = this.getMemoryUsage().some((load) => load > MEM_THRESHOLD);
        // if (overloaded) {
        //   this.logger.warn(`mem overload ${this.getMemoryUsage()}`);
        //   return overloaded;
        // }
        return overloaded;
    }
    get isDowngrade() {
        return this.downgrade;
    }
    redirctToCsr(request, res) {
        fs_1.default.readFile(path_1.default.join(constants_1.cacheDir, constants_1.htmlFile), {
            encoding: 'utf-8',
        }, (e, data) => {
            if (e) {
                this.logger.error(e);
                return this.redirctToCsrUrl(request, res);
            }
            this.logger.warn(`downgrade to CSR: return from local index.html`);
            res.status(200);
            res.setHeader('cache-control', 'no-cache');
            res.setHeader('content-type', 'text/html; charset=UTF-8');
            res.send(data);
        });
    }
    redirctToCsrUrl(request, res) {
        const url = `http://${request.headers.host}${request.url}`;
        let base = this.configService.get('BASE').replace(/\/$/, '');
        let target = this.configService.get('TARGET');
        let publicPath = this.configService.get('PUBLIC_PATH').replace(/\/$/, ''); //去除末尾的/
        const redirctUrl = `${target}${request.url.replace(new RegExp(`^${base}`), publicPath)}`;
        this.logger.warn(`downgrade to CSR: request ${url} redirect to ${redirctUrl}`);
        if (url === redirctUrl) {
            this.logger.error(`!!! DOWNGRADE TARGET IS DOWN: ${url} !!!`);
            res.status(500);
            res.end();
            return;
        }
        // TODO: 是直接重定向, 还是代理请求?
        this.httpService
            .get(redirctUrl)
            .toPromise()
            .then((response) => {
            res.status(200);
            res.setHeader('cache-control', 'no-cache');
            res.setHeader('content-type', 'text/html; charset=UTF-8');
            res.send(response.data);
        })
            .catch((e) => {
            if (e.message) {
                this.logger.error(e.message);
            }
            else {
                this.logger.error(e);
            }
            res.status(500);
            res.end();
        });
    }
};
DowngradeService = tslib_1.__decorate([
    common_2.Injectable(),
    tslib_1.__metadata("design:paramtypes", [common_1.HttpService,
        config_1.ConfigService])
], DowngradeService);
exports.DowngradeService = DowngradeService;
//# sourceMappingURL=downgrade.service.js.map