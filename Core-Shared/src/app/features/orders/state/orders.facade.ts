import { Injectable, signal } from '@angular/core';
import { OrdersService, Order } from '../services/orders.service';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrdersFacade {
    private _orders = signal<Order[]>([]);
    readonly orders = this._orders.asReadonly();

    private _loading = signal<boolean>(false);
    readonly loading = this._loading.asReadonly();

    constructor(private ordersService: OrdersService) { }

    loadOrders(): void {
        this._loading.set(true);
        this.ordersService.getOrders().pipe(
            tap((orders) => {
                this._orders.set(orders);
                this._loading.set(false);
            })
        ).subscribe();
    }

    getOrderById(id: string): Observable<Order> {
        return this.ordersService.getOrderById(id);
    }

    createOrder(order: Partial<Order>): Observable<Order> {
        return this.ordersService.createOrder(order).pipe(
            tap(() => this.loadOrders())
        );
    }

    cancelOrder(id: string): Observable<void> {
        return this.ordersService.cancelOrder(id).pipe(
            tap(() => this.loadOrders())
        );
    }
}
