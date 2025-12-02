import { Injectable, signal } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsFacade {
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
}
