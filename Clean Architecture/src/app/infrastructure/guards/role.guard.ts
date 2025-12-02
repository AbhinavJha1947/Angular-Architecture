import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const userRole = localStorage.getItem('role'); // Simplified for example
    const requiredRoles = route.data['roles'] as string[];

    if (userRole && requiredRoles.includes(userRole)) {
        return true;
    }

    router.navigate(['/unauthorized']);
    return false;
};
