import { ProductDTO } from './product.dto';
import { UserDTO } from './user.dto';

export interface OrderItemDTO {
    product: ProductDTO;
    quantity: number;
    price: number;
}

export interface OrderDTO {
    id: string;
    user: UserDTO;
    items: OrderItemDTO[];
    total_amount: number;
    status: string;
    created_at: string;
}
