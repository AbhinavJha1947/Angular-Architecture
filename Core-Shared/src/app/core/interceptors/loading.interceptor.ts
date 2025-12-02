import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { AppStoreService } from '../state/app-store.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const appStore = inject(AppStoreService);

    appStore.setLoading(true);

    return next(req).pipe(
        finalize(() => {
            appStore.setLoading(false);
        })
    );
};
