import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface DashboardStats {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    revenue: number;
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    getDashboardStats(): Observable<DashboardStats> {
        // Simulated API call
        return of({
            totalUsers: 1234,
            totalProducts: 567,
            totalOrders: 890,
            revenue: 45678
        }).pipe(delay(500));
    }

    getRecentActivities(): Observable<any[]> {
        return of([
            { id: 1, message: 'New order #1234 received', timestamp: new Date() },
            { id: 2, message: 'Product "Widget A" updated', timestamp: new Date() },
            { id: 3, message: 'User John Doe registered', timestamp: new Date() }
        ]).pipe(delay(500));
    }
}
