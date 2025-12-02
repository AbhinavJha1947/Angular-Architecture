import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../domain/models/product';
import { ProductRepository } from '../../../domain/repositories/product.repository';

@Injectable({
    providedIn: 'root'
})
export class GetProductByIdUseCase {
    constructor(private productRepository: ProductRepository) { }

    execute(id: string): Observable<Product> {
        return this.productRepository.getProductById(id);
    }
}
