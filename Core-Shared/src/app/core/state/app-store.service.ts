import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppState {
    isLoading: boolean;
    isOnline: boolean;
    sidebarOpen: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AppStoreService {
    private initialState: AppState = {
        isLoading: false,
        isOnline: navigator.onLine,
        sidebarOpen: true
    };

    private stateSubject = new BehaviorSubject<AppState>(this.initialState);
    public state$ = this.stateSubject.asObservable();

    constructor() {
        this.setupOnlineListener();
    }

    private setupOnlineListener(): void {
        window.addEventListener('online', () => this.setOnline(true));
        window.addEventListener('offline', () => this.setOnline(false));
    }

    setLoading(isLoading: boolean): void {
        this.updateState({ isLoading });
    }

    setOnline(isOnline: boolean): void {
        this.updateState({ isOnline });
    }

    toggleSidebar(): void {
        const currentState = this.stateSubject.value;
        this.updateState({ sidebarOpen: !currentState.sidebarOpen });
    }

    private updateState(partial: Partial<AppState>): void {
        const currentState = this.stateSubject.value;
        this.stateSubject.next({ ...currentState, ...partial });
    }

    getState(): AppState {
        return this.stateSubject.value;
    }
}
