/** 登录接口参数 */
export interface RemoteResult<T> {
  Code: string;
  State: boolean;
  Msg: string;
  Data: T;
}
