import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../domain/models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUser: User | null = null;

    login(email: string, password: string): Observable<User> {
        // Mock login
        const user: User = {
            id: '1',
            email: email,
            firstName: 'John',
            lastName: 'Doe',
            role: 'user'
        };
        this.currentUser = user;
        return of(user);
    }

    logout(): void {
        this.currentUser = null;
    }

    isAuthenticated(): boolean {
        return !!this.currentUser;
    }

    getUser(): User | null {
        return this.currentUser;
    }
}
