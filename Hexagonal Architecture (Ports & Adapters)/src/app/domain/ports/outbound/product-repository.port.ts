import { Observable } from 'rxjs';
import { Product } from '../../models/product';

export abstract class ProductRepositoryPort {
    abstract findAll(): Observable<Product[]>;
    abstract findById(id: string): Observable<Product | undefined>;
    abstract save(product: Product): Observable<Product>;
    abstract update(id: string, product: Partial<Product>): Observable<Product>;
    abstract delete(id: string): Observable<void>;
}
