import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LogoutUseCase {
    execute(): void {
        // Implement logout logic (e.g., clear token from local storage)
        // This might need to interact with a TokenService or similar in Infrastructure
        console.log('Logout executed');
    }
}
