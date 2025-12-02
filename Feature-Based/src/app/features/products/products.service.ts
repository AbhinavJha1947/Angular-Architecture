import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './products.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private mockProducts: Product[] = [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 99.99, category: 'Electronics', inStock: true },
        { id: 2, name: 'Product 2', description: 'Description 2', price: 149.99, category: 'Clothing', inStock: true }
    ];

    constructor() { }

    getProducts(): Observable<Product[]> {
        return of(this.mockProducts);
    }

    getProductById(id: number): Observable<Product | undefined> {
        return of(this.mockProducts.find(p => p.id === id));
    }

    createProduct(product: Product): Observable<Product> {
        return of(product);
    }

    updateProduct(id: number, product: Partial<Product>): Observable<Product> {
        return of({ ...this.mockProducts[0], ...product });
    }

    deleteProduct(id: number): Observable<boolean> {
        return of(true);
    }
}
