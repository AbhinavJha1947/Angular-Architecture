import { Routes } from '@angular/router';
import { ProductPageComponent } from './containers/product-page/product-page.component';

export const PRODUCTS_ROUTES: Routes = [
    {
        path: '',
        component: ProductPageComponent
    }
];
