import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string | null = null;
    private userPermissions: string[] = [];

    constructor() { }

    login(username: string, password: string): boolean {
        // Mock login logic
        this.token = 'mock-jwt-token';
        this.userPermissions = ['read', 'write'];
        return true;
    }

    logout(): void {
        this.token = null;
        this.userPermissions = [];
    }

    isAuthenticated(): boolean {
        return this.token !== null;
    }

    getToken(): string | null {
        return this.token;
    }

    hasPermission(permission: string): boolean {
        return this.userPermissions.includes(permission);
    }
}
