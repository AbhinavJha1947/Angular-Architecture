import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private mockProducts: Product[] = [
        {
            id: '1',
            name: 'Laptop Pro',
            description: 'High-performance laptop for professionals',
            price: 1299.99,
            category: 'Electronics',
            imageUrl: 'https://via.placeholder.com/300x200?text=Laptop',
            inStock: true,
            quantity: 15
        },
        {
            id: '2',
            name: 'Wireless Mouse',
            description: 'Ergonomic wireless mouse with RGB lighting',
            price: 49.99,
            category: 'Accessories',
            imageUrl: 'https://via.placeholder.com/300x200?text=Mouse',
            inStock: true,
            quantity: 50
        },
        {
            id: '3',
            name: 'Mechanical Keyboard',
            description: 'Premium mechanical keyboard with blue switches',
            price: 129.99,
            category: 'Accessories',
            imageUrl: 'https://via.placeholder.com/300x200?text=Keyboard',
            inStock: false,
            quantity: 0
        },
        {
            id: '4',
            name: '4K Monitor',
            description: '27-inch 4K UHD monitor with HDR',
            price: 449.99,
            category: 'Electronics',
            imageUrl: 'https://via.placeholder.com/300x200?text=Monitor',
            inStock: true,
            quantity: 8
        }
    ];

    constructor() { }

    getAllProducts(): Observable<Product[]> {
        return of(this.mockProducts).pipe(delay(500));
    }

    getProductById(id: string): Observable<Product | undefined> {
        const product = this.mockProducts.find(p => p.id === id);
        return of(product).pipe(delay(300));
    }

    searchProducts(query: string): Observable<Product[]> {
        const filtered = this.mockProducts.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );
        return of(filtered).pipe(delay(400));
    }

    getProductsByCategory(category: string): Observable<Product[]> {
        const filtered = this.mockProducts.filter(p => p.category === category);
        return of(filtered).pipe(delay(400));
    }
}
