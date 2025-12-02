import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoggerService } from '../services/logger.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const logger = inject(LoggerService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unknown error occurred';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Client Error: ${error.error.message}`;
            } else {
                // Server-side error
                errorMessage = `Server Error (${error.status}): ${error.message}`;
            }

            logger.error(errorMessage, error);
            return throwError(() => error);
        })
    );
};
