import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../domain/models/order';
import { OrderRepository } from '../../domain/repositories/order.repository';

@Injectable({
    providedIn: 'root'
})
export class CreateOrderUseCase {
    constructor(private orderRepository: OrderRepository) { }

    execute(order: Order): Observable<Order> {
        return this.orderRepository.createOrder(order);
    }
}
