import { Injectable, inject } from '@angular/core';
import { AppStoreService, Notification } from './app-store.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationStoreService {
    private appStore = inject(AppStoreService);

    showSuccess(message: string): void {
        this.appStore.addNotification({ message, type: 'success' });
        this.autoRemove();
    }

    showError(message: string): void {
        this.appStore.addNotification({ message, type: 'error' });
        this.autoRemove();
    }

    showWarning(message: string): void {
        this.appStore.addNotification({ message, type: 'warning' });
        this.autoRemove();
    }

    showInfo(message: string): void {
        this.appStore.addNotification({ message, type: 'info' });
        this.autoRemove();
    }

    remove(id: string): void {
        this.appStore.removeNotification(id);
    }

    clearAll(): void {
        this.appStore.clearNotifications();
    }

    private autoRemove(): void {
        const notifications = this.appStore.notifications();
        if (notifications.length > 0) {
            const lastNotification = notifications[notifications.length - 1];
            setTimeout(() => {
                this.remove(lastNotification.id);
            }, 5000);
        }
    }
}
