import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
    providedIn: 'root'
})
export class DeleteProductUseCase {
    constructor(private productRepository: ProductRepository) { }

    execute(id: string): Observable<void> {
        return this.productRepository.deleteProduct(id);
    }
}
