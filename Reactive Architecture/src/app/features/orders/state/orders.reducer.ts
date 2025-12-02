import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './orders.actions';
import { initialOrderState } from './orders.state';

export const ordersReducer = createReducer(
    initialOrderState,
    on(OrderActions.loadOrders, state => ({ ...state, loading: true })),
    on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({ ...state, loading: false, orders })),
    on(OrderActions.loadOrdersFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
