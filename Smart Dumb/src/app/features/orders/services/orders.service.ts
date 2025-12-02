import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { Order } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private readonly endpoint = '/orders';

    constructor(private apiService: ApiService) { }

    getOrders(): Observable<Order[]> {
        return this.apiService.get<Order[]>(this.endpoint);
    }

    getOrder(id: string): Observable<Order> {
        return this.apiService.get<Order>(`${this.endpoint}/${id}`);
    }
}
