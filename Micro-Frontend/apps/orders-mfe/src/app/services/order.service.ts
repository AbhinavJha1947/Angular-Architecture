import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Order, OrderStatus, OrderTimelineEvent } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private mockOrders: Order[] = [
        {
            id: '1',
            userId: '1',
            orderNumber: 'ORD-2024-001',
            items: [
                { productId: '1', productName: 'Laptop Pro', quantity: 1, price: 1299.99 },
                { productId: '2', productName: 'Wireless Mouse', quantity: 2, price: 49.99 }
            ],
            totalAmount: 1399.97,
            status: OrderStatus.DELIVERED,
            orderDate: new Date('2024-11-15'),
            deliveryDate: new Date('2024-11-20'),
            shippingAddress: '123 Main St, City, State 12345',
            timeline: [
                { status: OrderStatus.PENDING, timestamp: new Date('2024-11-15T10:00:00'), description: 'Order placed' },
                { status: OrderStatus.PROCESSING, timestamp: new Date('2024-11-15T14:00:00'), description: 'Order confirmed and processing' },
                { status: OrderStatus.SHIPPED, timestamp: new Date('2024-11-16T09:00:00'), description: 'Package shipped' },
                { status: OrderStatus.DELIVERED, timestamp: new Date('2024-11-20T15:30:00'), description: 'Package delivered' }
            ]
        },
        {
            id: '2',
            userId: '1',
            orderNumber: 'ORD-2024-002',
            items: [
                { productId: '4', productName: '4K Monitor', quantity: 1, price: 449.99 }
            ],
            totalAmount: 449.99,
            status: OrderStatus.SHIPPED,
            orderDate: new Date('2024-11-28'),
            shippingAddress: '123 Main St, City, State 12345',
            timeline: [
                { status: OrderStatus.PENDING, timestamp: new Date('2024-11-28T11:00:00'), description: 'Order placed' },
                { status: OrderStatus.PROCESSING, timestamp: new Date('2024-11-28T15:00:00'), description: 'Order confirmed and processing' },
                { status: OrderStatus.SHIPPED, timestamp: new Date('2024-11-29T10:00:00'), description: 'Package shipped' }
            ]
        },
        {
            id: '3',
            userId: '1',
            orderNumber: 'ORD-2024-003',
            items: [
                { productId: '3', productName: 'Mechanical Keyboard', quantity: 1, price: 129.99 }
            ],
            totalAmount: 129.99,
            status: OrderStatus.PROCESSING,
            orderDate: new Date('2024-12-01'),
            shippingAddress: '123 Main St, City, State 12345',
            timeline: [
                { status: OrderStatus.PENDING, timestamp: new Date('2024-12-01T09:00:00'), description: 'Order placed' },
                { status: OrderStatus.PROCESSING, timestamp: new Date('2024-12-01T12:00:00'), description: 'Order confirmed and processing' }
            ]
        }
    ];

    constructor() { }

    getAllOrders(): Observable<Order[]> {
        return of(this.mockOrders).pipe(delay(500));
    }

    getOrderById(id: string): Observable<Order | undefined> {
        const order = this.mockOrders.find(o => o.id === id);
        return of(order).pipe(delay(300));
    }

    getOrdersByStatus(status: OrderStatus): Observable<Order[]> {
        const filtered = this.mockOrders.filter(o => o.status === status);
        return of(filtered).pipe(delay(400));
    }

    cancelOrder(id: string): Observable<boolean> {
        const order = this.mockOrders.find(o => o.id === id);
        if (order && order.status !== OrderStatus.DELIVERED) {
            order.status = OrderStatus.CANCELLED;
            return of(true).pipe(delay(300));
        }
        return of(false).pipe(delay(300));
    }
}
