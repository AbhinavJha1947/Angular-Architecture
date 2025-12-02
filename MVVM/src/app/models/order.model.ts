import { Product } from './product.model';
import { User } from './user.model';

export interface Order {
    id: number;
    user: User;
    products: Product[];
    totalAmount: number;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    createdAt: Date;
}
