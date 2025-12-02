import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardStats } from './dashboard.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor() { }

    getStats(): Observable<DashboardStats> {
        return of({
            totalUsers: 150,
            totalProducts: 320,
            totalOrders: 89,
            revenue: 45678.90
        });
    }
}
