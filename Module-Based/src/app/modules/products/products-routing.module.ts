import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

const routes: Routes = [
    {
        path: '',
        component: ProductListComponent
    },
    {
        path: 'create',
        component: ProductCreateComponent
    },
    {
        path: ':id',
        component: ProductDetailsComponent
    },
    {
        path: ':id/edit',
        component: ProductEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
