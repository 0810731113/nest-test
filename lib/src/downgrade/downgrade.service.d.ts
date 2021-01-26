/// <reference types="node" />
import { Request, Response } from 'express';
import { HttpService, OnModuleDestroy } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * 定时监测
 * 每次触发降级, 降级时间依次递增: 1 -> 5 -> 10
 */
export declare class DowngradeService implements OnModuleDestroy {
    private httpService;
    private configService;
    logger: Logger;
    downgrade: boolean;
    timeout: number;
    timer: NodeJS.Timeout | undefined;
    constructor(httpService: HttpService, configService: ConfigService);
    onModuleDestroy(): void;
    checkTimer(): void;
    /**
     * 获取 内存 信息
     *  sys: ,
        heap: ,
        node: ,
     * @returns  内存 信息
     */
    getMemoryUsage(): number[];
    getCPULoadavg(): number[];
    isOverLoad(): boolean;
    get isDowngrade(): boolean;
    redirctToCsr(request: Request, res: Response): void;
    redirctToCsrUrl(request: Request, res: Response): void;
}
