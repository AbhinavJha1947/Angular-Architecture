import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product';

// This port defines how the application layer expects to interact with product data
// It often mirrors the domain repository but can be adapted if needed
export interface ProductRepositoryPort {
    getAll(): Observable<Product[]>;
    getById(id: string): Observable<Product>;
    save(product: Product): Observable<Product>;
    remove(id: string): Observable<void>;
}
