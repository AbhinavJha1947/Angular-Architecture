import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        // Logic to check if user is authenticated
        const isAuthenticated = true; // Replace with actual auth check
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
