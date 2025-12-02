import { Injectable, signal, computed } from '@angular/core';

export interface AppState {
    isLoading: boolean;
    isSidebarOpen: boolean;
    notifications: Notification[];
}

export interface Notification {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    timestamp: Date;
}

@Injectable({
    providedIn: 'root'
})
export class AppStoreService {
    private state = signal<AppState>({
        isLoading: false,
        isSidebarOpen: true,
        notifications: []
    });

    // Computed values
    readonly isLoading = computed(() => this.state().isLoading);
    readonly isSidebarOpen = computed(() => this.state().isSidebarOpen);
    readonly notifications = computed(() => this.state().notifications);

    setLoading(isLoading: boolean): void {
        this.state.update(state => ({ ...state, isLoading }));
    }

    toggleSidebar(): void {
        this.state.update(state => ({
            ...state,
            isSidebarOpen: !state.isSidebarOpen
        }));
    }

    setSidebarState(isOpen: boolean): void {
        this.state.update(state => ({ ...state, isSidebarOpen: isOpen }));
    }

    addNotification(notification: Omit<Notification, 'id' | 'timestamp'>): void {
        const newNotification: Notification = {
            ...notification,
            id: crypto.randomUUID(),
            timestamp: new Date()
        };

        this.state.update(state => ({
            ...state,
            notifications: [...state.notifications, newNotification]
        }));
    }

    removeNotification(id: string): void {
        this.state.update(state => ({
            ...state,
            notifications: state.notifications.filter(n => n.id !== id)
        }));
    }

    clearNotifications(): void {
        this.state.update(state => ({ ...state, notifications: [] }));
    }
}
