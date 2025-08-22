// Available operators for filters
export type FilterOperators<T> = {
  [K in keyof T]?: {
    equals?: T[K];
    not?: T[K];
    in?: T[K][];
    notIn?: T[K][];
    lt?: T[K];
    lte?: T[K];
    gt?: T[K];
    gte?: T[K];
    contains?: string;
  } | T[K];
};

// QueryParams interface
export interface QueryParams<T = any> {
  search?: string;
  searchFields?: (keyof T)[];
  filter?: FilterOperators<T>;
  sortBy?: keyof T;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}
