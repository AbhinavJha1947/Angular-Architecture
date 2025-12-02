import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPageComponent } from './product-page/product-page.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ProductListComponent
    },
    {
        path: ':id',
        component: ProductPageComponent
    }
];
