import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthModel, RegisterModel } from './auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthFeatureService {
    constructor() { }

    login(credentials: AuthModel): Observable<any> {
        // Mock login
        return of({ token: 'mock-token', user: { username: credentials.username } });
    }

    register(data: RegisterModel): Observable<any> {
        // Mock registration
        return of({ success: true, message: 'User registered successfully' });
    }

    forgotPassword(email: string): Observable<any> {
        // Mock forgot password
        return of({ success: true, message: 'Password reset link sent' });
    }
}
