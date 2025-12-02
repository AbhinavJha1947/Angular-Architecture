import { Component, Input } from '@angular/core';
import { OrderStatus } from '../../models/order.model';

@Component({
    selector: 'app-order-status',
    template: `
    <span class="order-status" [ngClass]="statusClass">
      {{ status }}
    </span>
  `,
    styles: [`
    .order-status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      
      &.pending {
        background-color: #fff3cd;
        color: #856404;
      }
      
      &.processing {
        background-color: #cfe2ff;
        color: #084298;
      }
      
      &.shipped {
        background-color: #d1e7dd;
        color: #0f5132;
      }
      
      &.delivered {
        background-color: #d1e7dd;
        color: #0a3622;
      }
      
      &.cancelled {
        background-color: #f8d7da;
        color: #842029;
      }
    }
  `]
})
export class OrderStatusComponent {
    @Input() status!: OrderStatus;

    get statusClass(): string {
        return this.status.toString();
    }
}
