import { IS_PAGINATION } from '@app/common/decorators/pagination.decorator';
import { BaseResponse } from '@app/common/http/models/base.response';
import { PaginationRequest } from '@app/common/http/models/pagination.request';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpResponseTransformInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const isPagination = this.reflector.getAllAndOverride<boolean>(
          IS_PAGINATION,
          [context.getHandler(), context.getClass()],
        );

        if (isPagination) {
          const paginationRequest = context.switchToHttp().getRequest()
            ?.query as PaginationRequest;

          const { pageNo = 1, pageSize = 10 } = paginationRequest;
          const { items = [], total = 0 } = data;

          return BaseResponse.paginated(items, total, {
            pageNo,
            pageSize,
          });
        }

        return { success: true, data, errors: [] };
      }),
    );
  }
}
