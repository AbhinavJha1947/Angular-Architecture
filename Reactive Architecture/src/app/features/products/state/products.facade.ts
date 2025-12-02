import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductActions from './products.actions';
import * as ProductSelectors from './products.selectors';

@Injectable({
    providedIn: 'root'
})
export class ProductsFacade {
    products$ = this.store.select(ProductSelectors.selectAllProducts);
    loading$ = this.store.select(ProductSelectors.selectProductsLoading);

    constructor(private store: Store) { }

    loadProducts(): void {
        this.store.dispatch(ProductActions.loadProducts());
    }
}
