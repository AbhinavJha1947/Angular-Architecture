import { inject } from '@angular/core';
<parameter name="CanActivateFn, Router } from '@angular/router';
import { UserStoreService } from '../state/user-store.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const userStore = inject(UserStoreService);
    const router = inject(Router);

    const requiredRoles = route.data['roles'] as string[];
    const currentUser = userStore.getCurrentUser();

    if (currentUser && requiredRoles.includes(currentUser.role)) {
        return true;
    }

    // Redirect to unauthorized page
    return router.createUrlTree(['/unauthorized']);
};
