import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        // Placeholder logic for role checking
        const userRole = this.authService.getUserRole();
        if (userRole === 'ADMIN') {
            return true;
        } else {
            this.router.navigate(['/unauthorized']);
            return false;
        }
    }
}
