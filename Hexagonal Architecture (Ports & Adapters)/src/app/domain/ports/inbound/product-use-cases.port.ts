import { Observable } from 'rxjs';
import { Product } from '../../models/product';

export abstract class ProductUseCasesPort {
    abstract getAllProducts(): Observable<Product[]>;
    abstract getProductById(id: string): Observable<Product | undefined>;
    abstract createProduct(product: Omit<Product, 'id'>): Observable<Product>;
    abstract updateProduct(id: string, product: Partial<Product>): Observable<Product>;
    abstract deleteProduct(id: string): Observable<void>;
}
