export function useResponseSuccess<T = any>(data: T = null) {
  return {
    code: 0,
    data,
    error: null,
    message: 'ok',
  };
}

export function useResponsePageSuccess<T>(
  data: Array<T>,
  currentPage: number,
  totalPage: number,
  pageSize: number,
) {
  return {
    code: 0,
    currentPage,
    data,
    error: null,
    message: 'ok',
    pageSize,
    totalPage,
  };
}

export function useResponseError(message: string, error: any = null) {
  return {
    code: -1,
    data: null,
    error,
    message,
  };
}
