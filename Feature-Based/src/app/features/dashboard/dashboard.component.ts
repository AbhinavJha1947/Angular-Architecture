import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashboardStats } from './dashboard.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    stats: DashboardStats | null = null;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit(): void {
        this.dashboardService.getStats().subscribe((stats: DashboardStats) => {
            this.stats = stats;
        });
    }
}
