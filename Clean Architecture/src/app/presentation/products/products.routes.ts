import { Routes } from '@angular/router';
import { ProductListPageComponent } from './containers/product-list-page/product-list-page.component';

export const PRODUCTS_ROUTES: Routes = [
    {
        path: '',
        component: ProductListPageComponent
    }
];
