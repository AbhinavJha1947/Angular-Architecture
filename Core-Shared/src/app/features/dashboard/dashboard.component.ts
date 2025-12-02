import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    stats = [
        { title: 'Total Users', value: '1,234', icon: '👥' },
        { title: 'Products', value: '567', icon: '📦' },
        { title: 'Orders', value: '890', icon: '🛒' },
        { title: 'Revenue', value: '$45,678', icon: '💰' }
    ];
}
