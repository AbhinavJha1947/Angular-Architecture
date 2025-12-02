import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'app-order-list-page',
    templateUrl: './order-list-page.component.html',
    styleUrls: ['./order-list-page.component.scss']
})
export class OrderListPageComponent implements OnInit {
    orders$: Observable<Order[]>;

    constructor(
        private ordersService: OrdersService,
        private router: Router
    ) {
        this.orders$ = this.ordersService.getOrders();
    }

    ngOnInit(): void { }

    onViewDetails(id: string): void {
        this.router.navigate(['/orders', id]);
    }
}
