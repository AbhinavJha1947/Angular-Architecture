import { Product } from '../../domain/models/product';
import { ProductDTO } from '../dto/product.dto';

export class ProductMapper {
    static toDomain(dto: ProductDTO): Product {
        return {
            id: dto.id,
            name: dto.name,
            description: dto.description,
            price: dto.price,
            category: dto.category,
            stock: dto.stock,
            imageUrl: dto.image_url
        };
    }

    static toDTO(domain: Product): ProductDTO {
        return {
            id: domain.id,
            name: domain.name,
            description: domain.description,
            price: domain.price,
            category: domain.category,
            stock: domain.stock,
            image_url: domain.imageUrl
        };
    }
}
