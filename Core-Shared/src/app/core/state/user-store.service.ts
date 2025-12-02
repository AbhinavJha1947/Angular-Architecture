import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private userSubject = new BehaviorSubject<User | null>(null);
    public user$ = this.userSubject.asObservable();

    constructor(private storageService: StorageService) {
        this.loadUser();
    }

    private loadUser(): void {
        const user = this.storageService.getItem<User>('user');
        if (user) {
            this.userSubject.next(user);
        }
    }

    setUser(user: User): void {
        this.userSubject.next(user);
        this.storageService.setItem('user', user);
    }

    getCurrentUser(): User | null {
        return this.userSubject.value;
    }

    clearUser(): void {
        this.userSubject.next(null);
        this.storageService.removeItem('user');
    }
}
