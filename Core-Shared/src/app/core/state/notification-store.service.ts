import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationStoreService {
    private notificationsSubject = new BehaviorSubject<Notification[]>([]);
    public notifications$ = this.notificationsSubject.asObservable();

    addNotification(notification: Omit<Notification, 'id'>): void {
        const id = this.generateId();
        const newNotification: Notification = { ...notification, id };

        const currentNotifications = this.notificationsSubject.value;
        this.notificationsSubject.next([...currentNotifications, newNotification]);

        // Auto-remove after duration (default 5 seconds)
        const duration = notification.duration || 5000;
        setTimeout(() => this.removeNotification(id), duration);
    }

    removeNotification(id: string): void {
        const currentNotifications = this.notificationsSubject.value;
        const filtered = currentNotifications.filter(n => n.id !== id);
        this.notificationsSubject.next(filtered);
    }

    clearAll(): void {
        this.notificationsSubject.next([]);
    }

    private generateId(): string {
        return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Convenience methods
    success(message: string, duration?: number): void {
        this.addNotification({ type: 'success', message, duration });
    }

    error(message: string, duration?: number): void {
        this.addNotification({ type: 'error', message, duration });
    }

    warning(message: string, duration?: number): void {
        this.addNotification({ type: 'warning', message, duration });
    }

    info(message: string, duration?: number): void {
        this.addNotification({ type: 'info', message, duration });
    }
}
