import { Injectable } from '@angular/core';
import { Product } from '../../domain/models/product';
import { ProductDTO } from '../../application/dto/product.dto';

// Adapters can be used for more complex transformations if Mappers are too simple
// or to adapt 3rd party library objects to domain objects
@Injectable({
    providedIn: 'root'
})
export class ProductAdapter {
    adapt(item: any): Product {
        return {
            id: item.id,
            name: item.name,
            description: item.desc,
            price: Number(item.cost),
            category: item.cat,
            stock: Number(item.inventory),
            imageUrl: item.img
        };
    }
}
