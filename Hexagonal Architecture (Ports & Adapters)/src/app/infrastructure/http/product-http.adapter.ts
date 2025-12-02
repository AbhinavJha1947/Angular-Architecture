import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../domain/models/product';
import { ProductRepositoryPort } from '../../domain/ports/outbound/product-repository.port';

@Injectable({
    providedIn: 'root'
})
export class ProductHttpAdapter implements ProductRepositoryPort {
    // In a real app, this would use HttpClient
    private products: Product[] = [
        {
            id: '1',
            name: 'Laptop',
            description: 'High performance laptop',
            price: 1200,
            stock: 10,
            category: 'Electronics',
            imageUrl: 'assets/laptop.jpg'
        },
        {
            id: '2',
            name: 'Smartphone',
            description: 'Latest model smartphone',
            price: 800,
            stock: 20,
            category: 'Electronics',
            imageUrl: 'assets/phone.jpg'
        }
    ];

    findAll(): Observable<Product[]> {
        return of(this.products);
    }

    findById(id: string): Observable<Product | undefined> {
        return of(this.products.find(p => p.id === id));
    }

    save(product: Product): Observable<Product> {
        this.products.push(product);
        return of(product);
    }

    update(id: string, product: Partial<Product>): Observable<Product> {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...product };
            return of(this.products[index]);
        }
        throw new Error('Product not found');
    }

    delete(id: string): Observable<void> {
        this.products = this.products.filter(p => p.id !== id);
        return of(void 0);
    }
}
