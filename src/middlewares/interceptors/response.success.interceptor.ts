import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { statusOK } from 'src/common';

@Injectable()
export class ResponseSuccessInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const query = ctx.getRequest().query;

    return next.handle().pipe(
      map(async (response) => {
        const resp = await response;

        context.switchToHttp().getResponse().status(200);

        // default response, data is directly on resp
        let httpSuccess = statusOK(200, resp);

        // if no data, return null on response data
        if (!resp) {
          return httpSuccess;
        }

        // list response, resp has data & paginataion, so the data is on resp.data
        if (Array.isArray(resp.data)) {
          // assign query page with default or requested value
          let page = query.page ? parseInt(query.page) : 1;

          // assign query limit with default or requested value
          let limit = query.limit ? parseInt(query.limit) : 5;

          // build pagination response
          let pagination = {
            page: page,
            total: resp.count,
            total_page: Math.ceil(resp.count / limit),
          };

          // overwrite httpSuccess variable
          httpSuccess = statusOK(200, resp.data);

          // assign pagination property to response object
          Object.assign(httpSuccess, { pagination });
        }

        return httpSuccess;
      }),
    );
  }
}
