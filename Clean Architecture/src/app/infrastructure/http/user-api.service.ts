import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/models/user';
import { UserMapper } from '../../application/mappers/user.mapper';
import { UserDTO } from '../../application/dto/user.dto';

@Injectable({
    providedIn: 'root'
})
export class UserApiService implements UserRepository {
    private apiUrl = 'api/users';
    private authUrl = 'api/auth';

    constructor(private http: HttpClient) { }

    getUserById(id: string): Observable<User> {
        return this.http.get<UserDTO>(`${this.apiUrl}/${id}`).pipe(
            map(dto => UserMapper.toDomain(dto))
        );
    }

    updateUser(user: User): Observable<User> {
        const dto = UserMapper.toDTO(user);
        return this.http.put<UserDTO>(`${this.apiUrl}/${user.id}`, dto).pipe(
            map(responseDto => UserMapper.toDomain(responseDto))
        );
    }

    login(email: string, password: string): Observable<{ user: User, token: string }> {
        return this.http.post<{ user: UserDTO, token: string }>(`${this.authUrl}/login`, { email, password }).pipe(
            map(response => ({
                user: UserMapper.toDomain(response.user),
                token: response.token
            }))
        );
    }

    register(user: Partial<User>, password: string): Observable<{ user: User, token: string }> {
        return this.http.post<{ user: UserDTO, token: string }>(`${this.authUrl}/register`, { ...user, password }).pipe(
            map(response => ({
                user: UserMapper.toDomain(response.user),
                token: response.token
            }))
        );
    }
}
