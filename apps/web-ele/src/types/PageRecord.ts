export interface PageResponse<T> {
  record: T[];
  pageSize: number;
  total: number;
  totalPage: number;
  currentPage: number;
}
