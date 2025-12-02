import { Observable } from 'rxjs';
import { User } from '../models/user';

export interface UserRepository {
    getUserById(id: string): Observable<User>;
    updateUser(user: User): Observable<User>;
    login(email: string, password: string): Observable<{ user: User, token: string }>;
    register(user: Partial<User>, password: string): Observable<{ user: User, token: string }>;
}
