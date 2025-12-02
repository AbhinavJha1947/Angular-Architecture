import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private storageService: StorageService) { }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        return this.storageService.getItem('auth_token');
    }

    getUserRole(): string {
        return this.storageService.getItem('user_role') || 'GUEST';
    }

    login(token: string, role: string) {
        this.storageService.setItem('auth_token', token);
        this.storageService.setItem('user_role', role);
    }

    logout() {
        this.storageService.removeItem('auth_token');
        this.storageService.removeItem('user_role');
    }
}
