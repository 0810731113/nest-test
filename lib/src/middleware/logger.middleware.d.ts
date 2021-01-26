import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void): void;
}
export declare function logger(req: Request, res: Response, next: () => any): void;
