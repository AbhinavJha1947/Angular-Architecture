import { Observable } from 'rxjs';
import { Order } from '../models/order';

export interface OrderRepository {
    getOrders(): Observable<Order[]>;
    getOrderById(id: string): Observable<Order>;
    createOrder(order: Order): Observable<Order>;
    cancelOrder(id: string): Observable<void>;
    getOrdersByUser(userId: string): Observable<Order[]>;
}
