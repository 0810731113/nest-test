/// <reference types="node" />
import { OnModuleInit } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { EntryService } from '../entry/entry.service';
import { DowngradeService } from '../downgrade/downgrade.service';
export declare class PageController implements OnModuleInit {
    private config;
    private entryService;
    private downgradeService;
    serverRender: Function;
    logger: Logger;
    httpLogger: Logger;
    httpClients: {
        httpAgent: import("http").Agent;
        httpsAgent: import("https").Agent;
    };
    constructor(config: ConfigService, entryService: EntryService, downgradeService: DowngradeService);
    onModuleInit(): void;
    page(req: Request, res: Response): Promise<void>;
}
