import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ORDERS_ROUTES } from './orders.routes';

import { OrderListPageComponent } from './containers/order-list-page/order-list-page.component';
import { OrderDetailsPageComponent } from './containers/order-details-page/order-details-page.component';

import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { OrderTimelineComponent } from './components/order-timeline/order-timeline.component';

@NgModule({
    declarations: [
        OrderListPageComponent,
        OrderDetailsPageComponent,
        OrderCardComponent,
        OrderStatusComponent,
        OrderTimelineComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ORDERS_ROUTES)
    ]
})
export class OrdersModule { }
