import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
    private orders: Order[] = [
        { id: '1', userId: 'user1', products: [], totalAmount: 100, status: 'completed', createdAt: new Date() }
    ];

    getOrders(): Observable<Order[]> {
        return of(this.orders);
    }

    getOrderById(id: string): Observable<Order | undefined> {
        return of(this.orders.find(o => o.id === id));
    }
}
