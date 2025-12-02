import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductCacheService {
    private cache = new Map<string, Product>();

    set(key: string, product: Product): void {
        this.cache.set(key, product);
    }

    get(key: string): Product | undefined {
        return this.cache.get(key);
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }

    clear(): void {
        this.cache.clear();
    }

    delete(key: string): boolean {
        return this.cache.delete(key);
    }
}
