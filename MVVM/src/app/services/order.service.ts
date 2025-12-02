import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { ApiService } from '../core/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private apiService: ApiService) { }

    getOrders(): Observable<Order[]> {
        return this.apiService.get<Order[]>('orders');
    }

    createOrder(order: Order): Observable<Order> {
        return this.apiService.post<Order>('orders', order);
    }
}
