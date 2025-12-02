import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PRODUCTS_ROUTES } from './products.routes';

import { ProductListPageComponent } from './containers/product-list-page/product-list-page.component';
import { ProductPageComponent } from './containers/product-page/product-page.component';
import { ProductEditPageComponent } from './containers/product-edit-page/product-edit-page.component';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
    declarations: [
        ProductListPageComponent,
        ProductPageComponent,
        ProductEditPageComponent,
        ProductCardComponent,
        ProductListComponent,
        ProductFilterComponent,
        ProductFormComponent,
        ProductDetailsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(PRODUCTS_ROUTES)
    ]
})
export class ProductsModule { }
