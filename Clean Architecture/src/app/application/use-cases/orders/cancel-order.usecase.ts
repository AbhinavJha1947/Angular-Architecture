import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderRepository } from '../../../domain/repositories/order.repository';

@Injectable({
    providedIn: 'root'
})
export class CancelOrderUseCase {
    constructor(private orderRepository: OrderRepository) { }

    execute(id: string): Observable<void> {
        return this.orderRepository.cancelOrder(id);
    }
}
