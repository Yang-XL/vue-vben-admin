export class BaseResponse<T> {
  Code: string = '200';

  Data: T | undefined;

  Msg: string = '';

  Success: boolean = false;
}

export function success<T>(data: T): BaseResponse<T> {
  const res = new BaseResponse<T>();
  res.Data = data;
  res.Success = true;
  res.Msg = '成功';
  return res;
}

export function fail<T>(msg: string, code: string = '500'): BaseResponse<T> {
  const res = new BaseResponse<T>();
  res.Success = true;
  res.Msg = msg;
  res.Code = code;
  return res;
}
