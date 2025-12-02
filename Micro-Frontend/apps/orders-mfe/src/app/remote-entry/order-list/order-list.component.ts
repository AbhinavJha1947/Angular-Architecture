import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { OrderStatusComponent } from '../../components/order-status/order-status.component';

@Component({
    selector: 'app-order-list',
    standalone: true,
    imports: [CommonModule, RouterModule, OrderStatusComponent],
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
    orders: Order[] = [];
    loading = true;

    constructor(
        private orderService: OrderService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadOrders();
    }

    loadOrders(): void {
        this.loading = true;
        this.orderService.getAllOrders().subscribe({
            next: (orders) => {
                this.orders = orders.sort((a, b) =>
                    new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
                );
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading orders:', error);
                this.loading = false;
            }
        });
    }

    viewOrderDetails(orderId: string): void {
        this.router.navigate(['/orders', orderId]);
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}
