import { Routes } from '@angular/router';
import { ProductListPageComponent } from './containers/product-list-page/product-list-page.component';
import { ProductPageComponent } from './containers/product-page/product-page.component';
import { ProductEditPageComponent } from './containers/product-edit-page/product-edit-page.component';

export const PRODUCTS_ROUTES: Routes = [
    { path: '', component: ProductListPageComponent },
    { path: 'new', component: ProductEditPageComponent },
    { path: ':id', component: ProductPageComponent },
    { path: ':id/edit', component: ProductEditPageComponent }
];
