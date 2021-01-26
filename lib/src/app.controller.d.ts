/// <reference types="node" />
import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { EntryService } from './entry/entry.service';
export declare class AppController {
    private config;
    private entryService;
    serverRender: Function;
    logger: Logger;
    httpLogger: Logger;
    httpClients: {
        httpAgent: import("http").Agent;
        httpsAgent: import("https").Agent;
    };
    constructor(config: ConfigService, entryService: EntryService);
    onModuleInit(): void;
    root(req: Request, res: Response): {
        message: string;
    };
}
