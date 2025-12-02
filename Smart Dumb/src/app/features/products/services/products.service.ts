import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private readonly endpoint = '/products';

    constructor(private apiService: ApiService) { }

    getProducts(): Observable<Product[]> {
        return this.apiService.get<Product[]>(this.endpoint);
    }

    getProduct(id: string): Observable<Product> {
        return this.apiService.get<Product>(`${this.endpoint}/${id}`);
    }

    createProduct(product: Product): Observable<Product> {
        return this.apiService.post<Product>(this.endpoint, product);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.apiService.put<Product>(`${this.endpoint}/${product.id}`, product);
    }

    deleteProduct(id: string): Observable<void> {
        return this.apiService.delete<void>(`${this.endpoint}/${id}`);
    }
}
