import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'app_theme';
    private currentTheme = signal<Theme>('auto');

    constructor() {
        this.loadTheme();
    }

    private loadTheme(): void {
        const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            this.applySystemTheme();
        }
    }

    setTheme(theme: Theme): void {
        this.currentTheme.set(theme);
        localStorage.setItem(this.THEME_KEY, theme);

        if (theme === 'auto') {
            this.applySystemTheme();
        } else {
            this.applyTheme(theme);
        }
    }

    getTheme(): Theme {
        return this.currentTheme();
    }

    private applySystemTheme(): void {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.applyTheme(prefersDark ? 'dark' : 'light');
    }

    private applyTheme(theme: 'light' | 'dark'): void {
        document.documentElement.setAttribute('data-theme', theme);
    }

    toggleTheme(): void {
        const current = this.currentTheme();
        if (current === 'auto') {
            this.setTheme('light');
        } else if (current === 'light') {
            this.setTheme('dark');
        } else {
            this.setTheme('auto');
        }
    }
}
