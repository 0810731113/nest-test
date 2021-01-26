import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import { DowngradeService } from '../downgrade/downgrade.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger('HttpExceptionFilter');

  constructor(
    private downgradeService: DowngradeService,
    private configService: ConfigService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage =
      typeof exception === 'string'
        ? exception
        : exception.message.message || exception.message;
    const errorStack = typeof exception === 'string' ? null : exception.stack;

    this.logger.error(status, errorMessage, errorStack);

    this.downgradeService.redirctToCsr(request, res);
  }
}
