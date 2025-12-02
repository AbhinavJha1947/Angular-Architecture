import { HttpInterceptorFn } from '@angular/common/http';
import { retry, timer } from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        retry({
            count: 3,
            delay: (error, retryCount) => {
                // Retry only on specific status codes
                if (error.status === 0 || error.status >= 500) {
                    // Exponential backoff: 1s, 2s, 4s
                    return timer(Math.pow(2, retryCount - 1) * 1000);
                }
                throw error;
            }
        })
    );
};
