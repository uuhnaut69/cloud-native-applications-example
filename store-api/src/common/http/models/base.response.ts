export class ErrorResponse {}

export class BaseResponse<T> {
  public success: boolean;
  public data: T;
  public errors: ErrorResponse[];
}
