import { CanActivateFn } from '@angular/router';

export const coreGuard: CanActivateFn = (route, state) => {
    return true;
};
