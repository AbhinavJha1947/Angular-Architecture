import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../domain/models/user';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable({
    providedIn: 'root'
})
export class RegisterUseCase {
    constructor(private userRepository: UserRepository) { }

    execute(user: Partial<User>, password: string): Observable<{ user: User, token: string }> {
        return this.userRepository.register(user, password);
    }
}
