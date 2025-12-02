import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';
import { TokenService } from './token.service';

export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

    public currentUser$ = this.currentUserSubject.asObservable();
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {
        this.checkAuthStatus();
    }

    private checkAuthStatus(): void {
        const token = this.tokenService.getToken();
        if (token) {
            // In a real app, validate token with backend
            const user = this.tokenService.getUser();
            if (user) {
                this.currentUserSubject.next(user);
                this.isAuthenticatedSubject.next(true);
            }
        }
    }

    login(email: string, password: string): Observable<AuthResponse> {
        // Simulated API call - replace with actual HTTP request
        return of({
            user: {
                id: '1',
                name: 'John Doe',
                email: email,
                role: 'admin'
            },
            token: 'mock-jwt-token-' + Date.now()
        }).pipe(
            delay(1000),
            tap(response => {
                this.tokenService.setToken(response.token);
                this.tokenService.setUser(response.user);
                this.currentUserSubject.next(response.user);
                this.isAuthenticatedSubject.next(true);
            })
        );
    }

    register(name: string, email: string, password: string): Observable<AuthResponse> {
        // Simulated API call - replace with actual HTTP request
        return of({
            user: {
                id: '1',
                name: name,
                email: email,
                role: 'user'
            },
            token: 'mock-jwt-token-' + Date.now()
        }).pipe(
            delay(1000),
            tap(response => {
                this.tokenService.setToken(response.token);
                this.tokenService.setUser(response.user);
                this.currentUserSubject.next(response.user);
                this.isAuthenticatedSubject.next(true);
            })
        );
    }

    resetPassword(email: string): Observable<void> {
        // Simulated API call - replace with actual HTTP request
        return of(void 0).pipe(delay(1000));
    }

    logout(): void {
        this.tokenService.clearToken();
        this.tokenService.clearUser();
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }
}
