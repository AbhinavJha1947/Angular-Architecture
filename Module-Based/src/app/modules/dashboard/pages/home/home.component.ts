import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    stats = {
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        revenue: 0
    };

    recentActivities: any[] = [];
    isLoading = true;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit(): void {
        this.loadDashboardData();
    }

    private loadDashboardData(): void {
        this.dashboardService.getDashboardStats().subscribe({
            next: (stats) => {
                this.stats = stats;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Failed to load dashboard data:', error);
                this.isLoading = false;
            }
        });

        this.dashboardService.getRecentActivities().subscribe({
            next: (activities) => {
                this.recentActivities = activities;
            }
        });
    }
}
