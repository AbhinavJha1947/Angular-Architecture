import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../../domain/models/order';
import { OrderRepository } from '../../../domain/repositories/order.repository';

@Injectable({
    providedIn: 'root'
})
export class GetOrderHistoryUseCase {
    constructor(private orderRepository: OrderRepository) { }

    execute(userId: string): Observable<Order[]> {
        return this.orderRepository.getOrdersByUser(userId);
    }
}
