import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class RbacGuard implements CanActivate {
    private readonly role;
    constructor(role: number);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
