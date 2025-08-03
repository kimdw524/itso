export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CursorPaginatedResponse<T, C extends string | number> {
  data: T[];
  nextCursor: C | null;
  hasNext: boolean;
}
