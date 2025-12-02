import { Injectable } from '@angular/core';
import { Order } from '../../domain/models/order';

@Injectable({
    providedIn: 'root'
})
export class OrderAdapter {
    adapt(item: any): Order {
        return {
            id: item.orderId,
            user: item.user, // Assuming user is already adapted or compatible
            items: item.lineItems,
            totalAmount: item.total,
            status: item.orderStatus,
            createdAt: new Date(item.date)
        };
    }
}
