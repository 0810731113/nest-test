import { OnModuleInit } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * 用来缓存和同步 umi.server.js
 * If-None-Match: W/"9a22e3-Xyi8H6Oi75XeUEojzSsulU8wMjg"
 */
export declare class EntryService implements OnModuleInit {
    private readonly config;
    logger: Logger;
    serverPath: string;
    callbacks: ((render: Function) => void)[];
    constructor(config: ConfigService);
    onModuleInit(): Promise<void>;
    register(cb: (render: Function) => void): void;
    syncEntryFromAgent(): void;
    notifyNewEntry(): void;
    reloadEntry(): Promise<void>;
    reloadEntryBySelf(): Promise<void>;
    reloadEntryByAgent(): void;
    getCacheEntry(): Function;
    removeCacheEntry(): void;
}
