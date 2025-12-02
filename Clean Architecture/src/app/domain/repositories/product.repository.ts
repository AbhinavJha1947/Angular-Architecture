import { Observable } from 'rxjs';
import { Product } from '../models/product';

export interface ProductRepository {
    getProducts(): Observable<Product[]>;
    getProductById(id: string): Observable<Product>;
    addProduct(product: Product): Observable<Product>;
    updateProduct(product: Product): Observable<Product>;
    deleteProduct(id: string): Observable<void>;
}
