import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Pages
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrderCreateComponent } from './pages/order-create/order-create.component';

// Components
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { OrderTimelineComponent } from './components/order-timeline/order-timeline.component';

@NgModule({
    declarations: [
        OrderListComponent,
        OrderDetailsComponent,
        OrderCreateComponent,
        OrderStatusComponent,
        OrderTimelineComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        OrdersRoutingModule
    ]
})
export class OrdersModule { }
