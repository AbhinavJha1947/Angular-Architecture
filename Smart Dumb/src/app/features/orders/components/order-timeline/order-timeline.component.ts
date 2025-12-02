import { Component, Input } from '@angular/core';
import { OrderTimelineEvent } from '../../models/order.model';

@Component({
    selector: 'app-order-timeline',
    templateUrl: './order-timeline.component.html',
    styleUrls: ['./order-timeline.component.scss']
})
export class OrderTimelineComponent {
    @Input() events: OrderTimelineEvent[] = [];
}
