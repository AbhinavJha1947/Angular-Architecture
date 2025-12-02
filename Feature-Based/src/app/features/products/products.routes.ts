import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './list/product-list.component';
import { ProductDetailsComponent } from './details/product-details.component';
import { ProductCreateComponent } from './create/product-create.component';
import { ProductEditComponent } from './edit/product-edit.component';

const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'create', component: ProductCreateComponent },
    { path: ':id', component: ProductDetailsComponent },
    { path: ':id/edit', component: ProductEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }

export const productsRoutes = routes;
