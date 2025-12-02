import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from '../core/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private apiService: ApiService) { }

    getUserProfile(): Observable<User> {
        return this.apiService.get<User>('user/profile');
    }

    updateProfile(user: User): Observable<User> {
        return this.apiService.put<User>('user/profile', user);
    }
}
