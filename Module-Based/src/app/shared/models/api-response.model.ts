export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: ApiError[];
    timestamp: Date;
}

export interface ApiError {
    code: string;
    message: string;
    field?: string;
}

export class ApiResponseModel<T> implements ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: ApiError[];
    timestamp: Date;

    constructor(response: Partial<ApiResponse<T>>) {
        this.success = response.success ?? false;
        this.data = response.data;
        this.message = response.message;
        this.errors = response.errors;
        this.timestamp = response.timestamp ? new Date(response.timestamp) : new Date();
    }

    hasErrors(): boolean {
        return !this.success && !!this.errors && this.errors.length > 0;
    }

    getErrorMessages(): string[] {
        return this.errors?.map(error => error.message) || [];
    }

    getFieldError(field: string): string | undefined {
        return this.errors?.find(error => error.field === field)?.message;
    }
}
