import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class CalculatePriceService {
    calculateTotal(products: Product[]): number {
        return products.reduce((total, product) => total + product.price, 0);
    }
}
