import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTimelineEvent } from '../../models/order.model';

@Component({
    selector: 'app-order-timeline',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-timeline.component.html',
    styleUrls: ['./order-timeline.component.scss']
})
export class OrderTimelineComponent {
    @Input() timeline: OrderTimelineEvent[] = [];

    formatTimestamp(timestamp: Date): string {
        return new Date(timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}
