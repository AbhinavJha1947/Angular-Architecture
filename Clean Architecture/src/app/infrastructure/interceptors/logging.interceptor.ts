import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    console.log('Request:', req.url);
    return next(req).pipe(
        tap(event => {
            console.log('Response:', event);
        })
    );
};
