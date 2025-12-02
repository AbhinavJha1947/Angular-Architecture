import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private products: Product[] = [
        { id: '1', name: 'Product 1', description: 'Description 1', price: 100, category: 'Category A' },
        { id: '2', name: 'Product 2', description: 'Description 2', price: 200, category: 'Category B' }
    ];

    getProducts(): Observable<Product[]> {
        return of(this.products);
    }
}
