import { PaginationRequest } from '@app/common/http/models/pagination.request';

export class ErrorResponse {}

export class Pagination {
  public totalItems: number;
  public totalPages: number;
  public pageNo: number;
  public pageSize: number;
}

export class BaseResponse<T> {
  public success: boolean;
  public data?: T;
  public pagination?: Pagination;
  public errors?: ErrorResponse[];

  public static paginated<T>(
    data: T,
    totalItems: number,
    paginatedRequest: PaginationRequest,
  ): BaseResponse<T> {
    const response = new BaseResponse<T>();
    response.success = true;
    response.data = data;
    response.pagination = {
      totalItems,
      totalPages: Number(
        Math.ceil(totalItems / Number(paginatedRequest.pageSize)),
      ),
      pageNo: Number(paginatedRequest.pageNo),
      pageSize: Number(paginatedRequest.pageSize),
    };
    response.errors = [];
    return response;
  }
}
