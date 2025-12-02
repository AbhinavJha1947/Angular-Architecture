import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './users.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private mockUsers: User[] = [
        { id: 1, username: 'john_doe', email: 'john@example.com', role: 'admin', status: 'active' },
        { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'user', status: 'active' }
    ];

    constructor() { }

    getUsers(): Observable<User[]> {
        return of(this.mockUsers);
    }

    getUserById(id: number): Observable<User | undefined> {
        return of(this.mockUsers.find(u => u.id === id));
    }

    createUser(user: User): Observable<User> {
        return of(user);
    }

    updateUser(id: number, user: Partial<User>): Observable<User> {
        return of({ ...this.mockUsers[0], ...user });
    }

    deleteUser(id: number): Observable<boolean> {
        return of(true);
    }
}
