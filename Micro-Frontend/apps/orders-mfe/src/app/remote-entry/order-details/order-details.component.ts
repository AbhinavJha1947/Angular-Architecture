import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { OrderStatusComponent } from '../../components/order-status/order-status.component';
import { OrderTimelineComponent } from '../../components/order-timeline/order-timeline.component';

@Component({
    selector: 'app-order-details',
    standalone: true,
    imports: [CommonModule, RouterModule, OrderStatusComponent, OrderTimelineComponent],
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
    order: Order | undefined;
    loading = true;
    notFound = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderService: OrderService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadOrder(id);
        }
    }

    loadOrder(id: string): void {
        this.loading = true;
        this.orderService.getOrderById(id).subscribe({
            next: (order) => {
                if (order) {
                    this.order = order;
                } else {
                    this.notFound = true;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading order:', error);
                this.notFound = true;
                this.loading = false;
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/orders']);
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    cancelOrder(): void {
        if (this.order && confirm('Are you sure you want to cancel this order?')) {
            this.orderService.cancelOrder(this.order.id).subscribe({
                next: (success) => {
                    if (success && this.order) {
                        alert('Order cancelled successfully');
                        this.loadOrder(this.order.id);
                    }
                }
            });
        }
    }
}
