import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const requiredRoles = route.data['roles'] as string[];

    if (!authService.isAuthenticated()) {
        router.navigate(['/auth/login']);
        return false;
    }

    const currentUser = authService.getCurrentUser();
    const userRole = currentUser?.role;

    // Check if user has any of the required roles
    const hasRole = userRole ? requiredRoles.includes(userRole) : false;

    if (!hasRole) {
        router.navigate(['/unauthorized']);
        return false;
    }

    return true;
};
