import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatus } from '../../models/order.model';

@Component({
    selector: 'app-order-status',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-status.component.html',
    styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent {
    @Input() status!: OrderStatus;

    getStatusClass(): string {
        const statusMap: Record<OrderStatus, string> = {
            [OrderStatus.PENDING]: 'status-pending',
            [OrderStatus.PROCESSING]: 'status-processing',
            [OrderStatus.SHIPPED]: 'status-shipped',
            [OrderStatus.DELIVERED]: 'status-delivered',
            [OrderStatus.CANCELLED]: 'status-cancelled'
        };
        return statusMap[this.status] || '';
    }

    getStatusLabel(): string {
        return this.status.charAt(0) + this.status.slice(1).toLowerCase();
    }
}
