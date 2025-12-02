import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';

export interface Order {
    id: string;
    userId: string;
    products: any[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
}

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    constructor(private httpService: HttpService) { }

    getOrders(): Observable<Order[]> {
        return this.httpService.get<Order[]>('/orders');
    }

    getOrderById(id: string): Observable<Order> {
        return this.httpService.get<Order>(`/orders/${id}`);
    }

    createOrder(order: Partial<Order>): Observable<Order> {
        return this.httpService.post<Order>('/orders', order);
    }

    cancelOrder(id: string): Observable<void> {
        return this.httpService.post<void>(`/orders/${id}/cancel`, {});
    }
}
