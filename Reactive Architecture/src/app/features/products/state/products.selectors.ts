import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../models/product-state.model';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(selectProductState, state => state.products);
export const selectProductsLoading = createSelector(selectProductState, state => state.loading);
