import { Injectable, signal } from '@angular/core';
import { ProductsService, Product } from '../services/products.service';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsFacade {
    // Example of using signals for state
    private _products = signal<Product[]>([]);
    readonly products = this._products.asReadonly();

    private _loading = signal<boolean>(false);
    readonly loading = this._loading.asReadonly();

    constructor(private productsService: ProductsService) { }

    loadProducts(): void {
        this._loading.set(true);
        this.productsService.getProducts().pipe(
            tap((products) => {
                this._products.set(products);
                this._loading.set(false);
            })
        ).subscribe();
    }

    getProductById(id: string): Observable<Product> {
        return this.productsService.getProductById(id);
    }

    createProduct(product: Partial<Product>): Observable<Product> {
        return this.productsService.createProduct(product).pipe(
            tap(() => this.loadProducts()) // Refresh list after creation
        );
    }

    updateProduct(id: string, product: Partial<Product>): Observable<Product> {
        return this.productsService.updateProduct(id, product).pipe(
            tap(() => this.loadProducts())
        );
    }

    deleteProduct(id: string): Observable<void> {
        return this.productsService.deleteProduct(id).pipe(
            tap(() => this.loadProducts())
        );
    }
}
