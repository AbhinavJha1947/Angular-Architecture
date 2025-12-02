import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/models/order';
import { OrderMapper } from '../../application/mappers/order.mapper';
import { OrderDTO } from '../../application/dto/order.dto';

@Injectable({
    providedIn: 'root'
})
export class OrderApiService implements OrderRepository {
    private apiUrl = 'api/orders';

    constructor(private http: HttpClient) { }

    getOrders(): Observable<Order[]> {
        return this.http.get<OrderDTO[]>(this.apiUrl).pipe(
            map(dtos => dtos.map(dto => OrderMapper.toDomain(dto)))
        );
    }

    getOrderById(id: string): Observable<Order> {
        return this.http.get<OrderDTO>(`${this.apiUrl}/${id}`).pipe(
            map(dto => OrderMapper.toDomain(dto))
        );
    }

    createOrder(order: Order): Observable<Order> {
        const dto = OrderMapper.toDTO(order);
        return this.http.post<OrderDTO>(this.apiUrl, dto).pipe(
            map(responseDto => OrderMapper.toDomain(responseDto))
        );
    }

    cancelOrder(id: string): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${id}/cancel`, {});
    }

    getOrdersByUser(userId: string): Observable<Order[]> {
        return this.http.get<OrderDTO[]>(`${this.apiUrl}/user/${userId}`).pipe(
            map(dtos => dtos.map(dto => OrderMapper.toDomain(dto)))
        );
    }
}
