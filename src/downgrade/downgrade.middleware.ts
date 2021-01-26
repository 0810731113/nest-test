import type { NestMiddleware } from '@nestjs/common';
import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { DowngradeService } from './downgrade.service';

@Injectable()
export class DowngradeMiddleware implements NestMiddleware {
  logger = new Logger('DowngradeMiddleware');

  constructor(private downgradeService: DowngradeService) {}

  use(req: Request, res: Response, next: () => void) {
    if (this.downgradeService.isDowngrade) {
      this.downgradeService.redirctToCsr(req, res);
    } else {
      next();
    }
  }
}
