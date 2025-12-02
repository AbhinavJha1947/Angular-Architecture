import { Injectable } from '@angular/core';
import { NotificationPort } from '../../application/ports/notification.port';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService implements NotificationPort {
    send(message: string): Observable<void> {
        console.log(`[NOTIFICATION]: ${message}`);
        return of(void 0);
    }

    showError(error: string): void {
        console.error(`[NOTIFICATION ERROR]: ${error}`);
    }

    showSuccess(message: string): void {
        console.log(`[NOTIFICATION SUCCESS]: ${message}`);
    }
}
