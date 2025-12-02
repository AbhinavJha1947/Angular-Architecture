import { Order } from '../../domain/models/order';
import { OrderDTO } from '../dto/order.dto';
import { ProductMapper } from './product.mapper';
import { UserMapper } from './user.mapper';

export class OrderMapper {
    static toDomain(dto: OrderDTO): Order {
        return {
            id: dto.id,
            user: UserMapper.toDomain(dto.user),
            items: dto.items.map(item => ({
                product: ProductMapper.toDomain(item.product),
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: dto.total_amount,
            status: dto.status as any,
            createdAt: new Date(dto.created_at)
        };
    }

    static toDTO(domain: Order): OrderDTO {
        return {
            id: domain.id,
            user: UserMapper.toDTO(domain.user),
            items: domain.items.map(item => ({
                product: ProductMapper.toDTO(item.product),
                quantity: item.quantity,
                price: item.price
            })),
            total_amount: domain.totalAmount,
            status: domain.status,
            created_at: domain.createdAt.toISOString()
        };
    }
}
