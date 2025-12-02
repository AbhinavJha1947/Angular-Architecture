import { Component, OnInit } from '@angular/core';
import { DashboardStats } from './dashboard.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    stats: DashboardStats = {
        totalOrders: 0,
        totalRevenue: 0,
        activeUsers: 0
    };

    ngOnInit(): void {
        // Mock data fetch
        this.stats = {
            totalOrders: 150,
            totalRevenue: 5000,
            activeUsers: 45
        };
    }
}
