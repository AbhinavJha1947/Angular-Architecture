import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/models/product';
import { ProductMapper } from '../../application/mappers/product.mapper';
import { ProductDTO } from '../../application/dto/product.dto';

@Injectable({
    providedIn: 'root'
})
export class ProductApiService implements ProductRepository {
    private apiUrl = 'api/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<ProductDTO[]>(this.apiUrl).pipe(
            map(dtos => dtos.map(dto => ProductMapper.toDomain(dto)))
        );
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<ProductDTO>(`${this.apiUrl}/${id}`).pipe(
            map(dto => ProductMapper.toDomain(dto))
        );
    }

    addProduct(product: Product): Observable<Product> {
        const dto = ProductMapper.toDTO(product);
        return this.http.post<ProductDTO>(this.apiUrl, dto).pipe(
            map(responseDto => ProductMapper.toDomain(responseDto))
        );
    }

    updateProduct(product: Product): Observable<Product> {
        const dto = ProductMapper.toDTO(product);
        return this.http.put<ProductDTO>(`${this.apiUrl}/${product.id}`, dto).pipe(
            map(responseDto => ProductMapper.toDomain(responseDto))
        );
    }

    deleteProduct(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
