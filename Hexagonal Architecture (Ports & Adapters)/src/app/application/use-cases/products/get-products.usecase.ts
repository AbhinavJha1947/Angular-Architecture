import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../domain/models/product';
import { ProductUseCasesPort } from '../../../domain/ports/inbound/product-use-cases.port';
import { ProductRepositoryPort } from '../../../domain/ports/outbound/product-repository.port';

@Injectable({
    providedIn: 'root'
})
export class GetProductsUseCase implements ProductUseCasesPort {
    constructor(private productRepository: ProductRepositoryPort) { }

    getAllProducts(): Observable<Product[]> {
        return this.productRepository.findAll();
    }

    getProductById(id: string): Observable<Product | undefined> {
        return this.productRepository.findById(id);
    }

    createProduct(product: Omit<Product, 'id'>): Observable<Product> {
        // Generate ID logic could be here or in repo
        const newProduct = { ...product, id: crypto.randomUUID() };
        return this.productRepository.save(newProduct);
    }

    updateProduct(id: string, product: Partial<Product>): Observable<Product> {
        return this.productRepository.update(id, product);
    }

    deleteProduct(id: string): Observable<void> {
        return this.productRepository.delete(id);
    }
}
