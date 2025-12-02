import { Component } from '@angular/core';

@Component({
    selector: 'app-order-create',
    template: `
    <div class="order-create">
      <h1>Create Order</h1>
      <p>Order creation form - implement based on requirements</p>
    </div>
  `,
    styles: [`
    .order-create {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class OrderCreateComponent { }
