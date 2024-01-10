export interface PaginationRequest {
  pageNo?: number;

  pageSize?: number;
}

export interface SortableRequest {
  orderField?: string;

  orderDirection?: 'ASC' | 'DESC';
}

export type PaginationSortableRequest = PaginationRequest & SortableRequest;
