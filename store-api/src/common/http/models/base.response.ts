export class ErrorResponse {}

export class BaseResponse<T> {
  public success: boolean;
  public data: T;
  public errors: ErrorResponse[];

  public static success<T>(data: T): BaseResponse<T> {
    const response = new BaseResponse<T>();
    response.success = true;
    response.data = data;
    response.errors = [];
    return response;
  }
}
