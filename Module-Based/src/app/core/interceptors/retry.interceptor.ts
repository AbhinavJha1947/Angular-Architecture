import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { retry, timer } from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
    const maxRetries = 3;
    const delayMs = 1000;

    return next(req).pipe(
        retry({
            count: maxRetries,
            delay: (error: HttpErrorResponse, retryCount: number) => {
                // Only retry on server errors (5xx) or network errors
                if (error.status >= 500 || error.status === 0) {
                    return timer(delayMs * retryCount);
                }
                throw error;
            }
        })
    );
};
