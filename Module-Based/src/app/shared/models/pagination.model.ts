export interface PaginationParams {
    page: number;
    pageSize: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

export class Pagination implements PaginationParams {
    page: number = 1;
    pageSize: number = 10;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc' = 'asc';

    constructor(params?: Partial<PaginationParams>) {
        if (params) {
            Object.assign(this, params);
        }
    }

    get offset(): number {
        return (this.page - 1) * this.pageSize;
    }

    get limit(): number {
        return this.pageSize;
    }
}
