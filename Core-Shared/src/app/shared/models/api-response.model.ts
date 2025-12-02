export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: any[];
    timestamp: number;
}

export interface ApiError {
    code: string;
    message: string;
    field?: string;
}
