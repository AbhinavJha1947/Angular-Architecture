import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products.routes';

import { ProductListComponent } from './list/product-list.component';
import { ProductDetailsComponent } from './details/product-details.component';
import { ProductCreateComponent } from './create/product-create.component';
import { ProductEditComponent } from './edit/product-edit.component';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailsComponent,
        ProductCreateComponent,
        ProductEditComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule
    ]
})
export class ProductsModule { }
