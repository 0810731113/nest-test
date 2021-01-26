import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class RbacInterceptor implements NestInterceptor {
    private readonly role;
    constructor(role: number);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
