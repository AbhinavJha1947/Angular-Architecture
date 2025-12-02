import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from '../../models/order.model';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'app-order-details-page',
    templateUrl: './order-details-page.component.html',
    styleUrls: ['./order-details-page.component.scss']
})
export class OrderDetailsPageComponent implements OnInit {
    order$: Observable<Order>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ordersService: OrdersService
    ) {
        this.order$ = this.route.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id')!;
                return this.ordersService.getOrder(id);
            })
        );
    }

    ngOnInit(): void { }

    onBack(): void {
        this.router.navigate(['/orders']);
    }
}
