import { Injectable } from '@angular/core';
import { User } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_KEY = 'current_user';

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    clearToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    setUser(user: User): void {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    getUser(): User | null {
        const userStr = localStorage.getItem(this.USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }

    clearUser(): void {
        localStorage.removeItem(this.USER_KEY);
    }
}
