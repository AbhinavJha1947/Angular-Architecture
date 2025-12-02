import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './products.actions';
import { initialProductState } from '../models/product-state.model';

export const productsReducer = createReducer(
    initialProductState,
    on(ProductActions.loadProducts, state => ({ ...state, loading: true })),
    on(ProductActions.loadProductsSuccess, (state, { products }) => ({ ...state, loading: false, products })),
    on(ProductActions.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
