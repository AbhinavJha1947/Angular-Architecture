import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiService } from '../core/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private apiService: ApiService) { }

    getProducts(): Observable<Product[]> {
        return this.apiService.get<Product[]>('products');
    }

    getProductById(id: number): Observable<Product> {
        return this.apiService.get<Product>(`products/${id}`);
    }
}
