import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './orders.state';

export const selectOrderState = createFeatureSelector<OrderState>('orders');

export const selectAllOrders = createSelector(selectOrderState, state => state.orders);
export const selectOrdersLoading = createSelector(selectOrderState, state => state.loading);
