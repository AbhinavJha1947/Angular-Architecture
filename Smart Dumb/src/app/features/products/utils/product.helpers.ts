import { Product } from '../models/product.model';

export function formatProductPrice(product: Product): string {
    return `$${product.price.toFixed(2)}`;
}
