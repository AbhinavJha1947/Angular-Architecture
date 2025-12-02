import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(private httpService: HttpService) { }

    getProducts(): Observable<Product[]> {
        return this.httpService.get<Product[]>('/products');
    }

    getProductById(id: string): Observable<Product> {
        return this.httpService.get<Product>(`/products/${id}`);
    }

    createProduct(product: Partial<Product>): Observable<Product> {
        return this.httpService.post<Product>('/products', product);
    }

    updateProduct(id: string, product: Partial<Product>): Observable<Product> {
        return this.httpService.put<Product>(`/products/${id}`, product);
    }

    deleteProduct(id: string): Observable<void> {
        return this.httpService.delete<void>(`/products/${id}`);
    }
}
