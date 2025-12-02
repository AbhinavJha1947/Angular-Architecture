import { Injectable, signal, computed } from '@angular/core';
import { User } from '@shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private user = signal<User | null>(null);
    private isAuthenticated = signal<boolean>(false);

    // Computed values
    readonly currentUser = computed(() => this.user());
    readonly isLoggedIn = computed(() => this.isAuthenticated());
    readonly userRoles = computed(() => this.user()?.roles || []);

    setUser(user: User | null): void {
        this.user.set(user);
        this.isAuthenticated.set(!!user);
    }

    updateUser(updates: Partial<User>): void {
        const currentUser = this.user();
        if (currentUser) {
            this.user.set({ ...currentUser, ...updates });
        }
    }

    clearUser(): void {
        this.user.set(null);
        this.isAuthenticated.set(false);
    }

    getUserId(): string | null {
        return this.user()?.id || null;
    }
}
