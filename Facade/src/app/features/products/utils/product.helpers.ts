import { Product } from '../models/product.model';

export function calculateDiscount(product: Product, percentage: number): number {
    return product.price * (1 - percentage / 100);
}
