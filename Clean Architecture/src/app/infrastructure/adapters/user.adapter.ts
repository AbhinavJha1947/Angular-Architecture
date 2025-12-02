import { Injectable } from '@angular/core';
import { User } from '../../domain/models/user';

@Injectable({
    providedIn: 'root'
})
export class UserAdapter {
    adapt(item: any): User {
        return {
            id: item.id,
            name: item.fullName,
            email: item.emailAddress,
            role: item.role,
            createdAt: new Date(item.created)
        };
    }
}
