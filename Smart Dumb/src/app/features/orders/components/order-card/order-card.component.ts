import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../models/order.model';

@Component({
    selector: 'app-order-card',
    templateUrl: './order-card.component.html',
    styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {
    @Input() order!: Order;
    @Output() viewDetails = new EventEmitter<string>();

    onViewDetails(): void {
        this.viewDetails.emit(this.order.id);
    }
}
