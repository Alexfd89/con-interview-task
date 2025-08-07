export type Pagination = {
  page: number;
  limit: number;
};

export type Source = {
  id: number;
  name: string;
  type: string;
  launch_date: string;
  description: string;
  image_url: string;
  status: string;
};

export type SourceFilters = Pagination & {
  search?: string;
};

export type SourcesResponse = {
  data: Source[];
  total: number;
  filters: SourceFilters;
};

export type SourceSearchHistory = {
  id: string;
  value: string;
};

export type SourceSearchHistoryFilters = Pagination & {
  value?: string;
};

export type SourceSearchHistoryResponse = {
  data: SourceSearchHistory[];
  total: number;
  filters: SourceSearchHistoryFilters;
};
