import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private themeSubject = new BehaviorSubject<Theme>('light');
    public theme$ = this.themeSubject.asObservable();

    constructor() {
        this.loadTheme();
    }

    private loadTheme(): void {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
            this.setTheme(savedTheme);
        }
    }

    setTheme(theme: Theme): void {
        this.themeSubject.next(theme);
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    toggleTheme(): void {
        const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    getCurrentTheme(): Theme {
        return this.themeSubject.value;
    }
}
