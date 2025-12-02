import { Component } from '@angular/core';

@Component({
    selector: 'app-order-details',
    template: `
    <div class="order-details">
      <h1>Order Details</h1>
      <p>Order details page - implement based on requirements</p>
    </div>
  `,
    styles: [`
    .order-details {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class OrderDetailsComponent { }
