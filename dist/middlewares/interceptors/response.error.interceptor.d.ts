import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class ResponseErrorInterceptor implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
