import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpService } from './http.service';
import { User } from '../../shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(
        private httpService: HttpService,
        private storageService: StorageService,
        private router: Router
    ) { }

    private hasToken(): boolean {
        return !!this.storageService.getItem('auth_token');
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    login(email: string, password: string): Observable<any> {
        return new Observable(observer => {
            this.httpService.post('/auth/login', { email, password }).subscribe({
                next: (response: any) => {
                    this.storageService.setItem('auth_token', response.token);
                    this.storageService.setItem('user', response.user);
                    this.isAuthenticatedSubject.next(true);
                    observer.next(response);
                    observer.complete();
                },
                error: (error) => {
                    observer.error(error);
                }
            });
        });
    }

    logout(): void {
        this.storageService.removeItem('auth_token');
        this.storageService.removeItem('user');
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/auth/login']);
    }

    getCurrentUser(): User | null {
        return this.storageService.getItem<User>('user');
    }
}
