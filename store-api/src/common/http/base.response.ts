export class BaseResponse<T> {
  public success: boolean;
  public data: T;

  public static success<T>(data: T): BaseResponse<T> {
    const response = new BaseResponse<T>();
    response.success = true;
    response.data = data;
    return response;
  }
}
