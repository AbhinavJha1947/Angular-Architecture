import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    showSuccess(message: string) {
        console.log('Success:', message);
        // Implement toast/snackbar logic here
    }

    showError(message: string) {
        console.error('Error:', message);
        // Implement toast/snackbar logic here
    }
}
