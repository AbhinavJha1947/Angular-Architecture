import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product, CreateProductDto, UpdateProductDto } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private apiUrl = '/api/products';

    // Mock data
    private mockProducts: Product[] = [
        {
            id: '1',
            name: 'Product 1',
            description: 'Description for Product 1',
            price: 99.99,
            category: 'Electronics',
            stock: 50,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '2',
            name: 'Product 2',
            description: 'Description for Product 2',
            price: 149.99,
            category: 'Clothing',
            stock: 30,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        // Replace with actual HTTP call: return this.http.get<Product[]>(this.apiUrl);
        return of(this.mockProducts).pipe(delay(500));
    }

    getProduct(id: string): Observable<Product | undefined> {
        // Replace with actual HTTP call: return this.http.get<Product>(`${this.apiUrl}/${id}`);
        return of(this.mockProducts.find(p => p.id === id)).pipe(delay(500));
    }

    createProduct(product: CreateProductDto): Observable<Product> {
        // Replace with actual HTTP call: return this.http.post<Product>(this.apiUrl, product);
        const newProduct: Product = {
            ...product,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.mockProducts.push(newProduct);
        return of(newProduct).pipe(delay(500));
    }

    updateProduct(product: UpdateProductDto): Observable<Product> {
        // Replace with actual HTTP call: return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
        const index = this.mockProducts.findIndex(p => p.id === product.id);
        if (index !== -1) {
            this.mockProducts[index] = {
                ...this.mockProducts[index],
                ...product,
                updatedAt: new Date()
            };
            return of(this.mockProducts[index]).pipe(delay(500));
        }
        throw new Error('Product not found');
    }

    deleteProduct(id: string): Observable<void> {
        // Replace with actual HTTP call: return this.http.delete<void>(`${this.apiUrl}/${id}`);
        const index = this.mockProducts.findIndex(p => p.id === id);
        if (index !== -1) {
            this.mockProducts.splice(index, 1);
        }
        return of(void 0).pipe(delay(500));
    }
}
