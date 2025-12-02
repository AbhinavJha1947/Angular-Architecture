import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Pages
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

// Components
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailsComponent,
        ProductCreateComponent,
        ProductEditComponent,
        ProductCardComponent,
        ProductFilterComponent,
        ProductSearchComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        ProductsRoutingModule
    ]
})
export class ProductsModule { }
