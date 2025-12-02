import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NavigationItem {
    label: string;
    path: string;
    icon?: string;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private breadcrumbsSubject = new BehaviorSubject<string[]>([]);
    public breadcrumbs$: Observable<string[]> = this.breadcrumbsSubject.asObservable();

    navigationItems: NavigationItem[] = [
        { label: 'Products', path: '/products', icon: '🛍️' },
        { label: 'Orders', path: '/orders', icon: '📦' },
        { label: 'Auth', path: '/auth', icon: '🔐' }
    ];

    constructor(private router: Router) { }

    navigateTo(path: string): void {
        this.router.navigate([path]);
    }

    setBreadcrumbs(breadcrumbs: string[]): void {
        this.breadcrumbsSubject.next(breadcrumbs);
    }

    getNavigationItems(): NavigationItem[] {
        return this.navigationItems;
    }
}
