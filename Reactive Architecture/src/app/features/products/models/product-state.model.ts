import { Product } from './product.model';

export interface ProductState {
    products: Product[];
    selectedProductId: string | null;
    loading: boolean;
    error: any;
}

export const initialProductState: ProductState = {
    products: [],
    selectedProductId: null,
    loading: false,
    error: null
};
