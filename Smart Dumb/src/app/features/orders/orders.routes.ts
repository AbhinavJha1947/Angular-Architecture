import { Routes } from '@angular/router';
import { OrderListPageComponent } from './containers/order-list-page/order-list-page.component';
import { OrderDetailsPageComponent } from './containers/order-details-page/order-details-page.component';

export const ORDERS_ROUTES: Routes = [
    { path: '', component: OrderListPageComponent },
    { path: ':id', component: OrderDetailsPageComponent }
];
