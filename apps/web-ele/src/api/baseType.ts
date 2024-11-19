export interface BaseRemote {
  Code: string;
  State: boolean;
  Msg: string;
}

export interface BaseRemoteOf<T> extends BaseRemote {
  Data: T;
}

export interface BaseRemotePageOf<T> extends BaseRemote {
  Data: T[];
  PageSize: number;
  Total: number;
  TotalPage: number;
}
