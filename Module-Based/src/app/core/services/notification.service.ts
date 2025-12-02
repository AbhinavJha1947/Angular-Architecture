import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationSubject = new Subject<Notification>();
    public notification$ = this.notificationSubject.asObservable();

    showSuccess(message: string): void {
        this.notificationSubject.next({ message, type: 'success' });
    }

    showError(message: string): void {
        this.notificationSubject.next({ message, type: 'error' });
    }

    showWarning(message: string): void {
        this.notificationSubject.next({ message, type: 'warning' });
    }

    showInfo(message: string): void {
        this.notificationSubject.next({ message, type: 'info' });
    }
}
