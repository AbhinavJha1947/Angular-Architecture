import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Order, OrderStatus } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private apiUrl = '/api/orders';

    // Mock data
    private mockOrders: Order[] = [
        {
            id: '1',
            customerId: '1',
            customerName: 'John Doe',
            items: [
                { productId: '1', productName: 'Product 1', quantity: 2, price: 99.99 }
            ],
            totalAmount: 199.98,
            status: OrderStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    constructor(private http: HttpClient) { }

    getOrders(): Observable<Order[]> {
        return of(this.mockOrders).pipe(delay(500));
    }

    getOrder(id: string): Observable<Order | undefined> {
        return of(this.mockOrders.find(o => o.id === id)).pipe(delay(500));
    }

    createOrder(order: Partial<Order>): Observable<Order> {
        const newOrder: Order = {
            ...order as Order,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.mockOrders.push(newOrder);
        return of(newOrder).pipe(delay(500));
    }

    updateOrderStatus(id: string, status: OrderStatus): Observable<Order> {
        const order = this.mockOrders.find(o => o.id === id);
        if (order) {
            order.status = status;
            order.updatedAt = new Date();
            return of(order).pipe(delay(500));
        }
        throw new Error('Order not found');
    }
}
