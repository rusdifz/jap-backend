import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class CommonHeaderGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
}
