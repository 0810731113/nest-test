import type { NestMiddleware } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { DowngradeService } from './downgrade.service';
export declare class DowngradeMiddleware implements NestMiddleware {
    private downgradeService;
    logger: Logger;
    constructor(downgradeService: DowngradeService);
    use(req: Request, res: Response, next: () => void): void;
}
