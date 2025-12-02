import { BaseModel } from '../../shared/models/base.model';

export interface Product extends BaseModel {
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
}
