import { Product } from './product';
import { User } from './user';

export interface OrderItem {
    product: Product;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    user: User;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
}
