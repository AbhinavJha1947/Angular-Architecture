import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private orders: Order[] = [
        { id: '1', userId: 'user1', products: [], totalAmount: 100, status: 'completed', createdAt: new Date() }
    ];

    getOrders(): Observable<Order[]> {
        return of(this.orders);
    }
}
