import { Order } from '../models/order.model';

export interface OrderState {
    orders: Order[];
    loading: boolean;
    error: any;
}

export const initialOrderState: OrderState = {
    orders: [],
    loading: false,
    error: null
};
