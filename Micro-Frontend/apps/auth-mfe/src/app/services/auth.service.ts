import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface AuthCredentials {
    username: string;
    password: string;
}

export interface RegisterData extends AuthCredentials {
    email: string;
    confirmPassword: string;
}

export interface AuthResponse {
    success: boolean;
    token?: string;
    user?: {
        id: string;
        username: string;
        email: string;
    };
    message?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private mockUsers = [
        { id: '1', username: 'demo', email: 'demo@example.com', password: 'password123' }
    ];

    constructor() { }

    login(credentials: AuthCredentials): Observable<AuthResponse> {
        return new Observable(observer => {
            setTimeout(() => {
                const user = this.mockUsers.find(
                    u => u.username === credentials.username && u.password === credentials.password
                );

                if (user) {
                    observer.next({
                        success: true,
                        token: 'mock-jwt-token-' + Date.now(),
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                    });
                } else {
                    observer.next({
                        success: false,
                        message: 'Invalid username or password'
                    });
                }
                observer.complete();
            }, 1000);
        });
    }

    register(data: RegisterData): Observable<AuthResponse> {
        return new Observable(observer => {
            setTimeout(() => {
                const existingUser = this.mockUsers.find(
                    u => u.username === data.username || u.email === data.email
                );

                if (existingUser) {
                    observer.next({
                        success: false,
                        message: 'Username or email already exists'
                    });
                } else if (data.password !== data.confirmPassword) {
                    observer.next({
                        success: false,
                        message: 'Passwords do not match'
                    });
                } else {
                    const newUser = {
                        id: Date.now().toString(),
                        username: data.username,
                        email: data.email,
                        password: data.password
                    };
                    this.mockUsers.push(newUser);

                    observer.next({
                        success: true,
                        token: 'mock-jwt-token-' + Date.now(),
                        user: {
                            id: newUser.id,
                            username: newUser.username,
                            email: newUser.email
                        }
                    });
                }
                observer.complete();
            }, 1000);
        });
    }

    validatePassword(password: string): { strength: string; score: number } {
        let score = 0;

        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        const strengthMap = ['Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong', 'Excellent'];

        return {
            score,
            strength: strengthMap[Math.min(score, 6)]
        };
    }
}
