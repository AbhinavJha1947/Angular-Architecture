import { Component } from '@angular/core';

@Component({
    selector: 'app-order-timeline',
    template: `
    <div class="order-timeline">
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h4>Order Placed</h4>
          <p>Your order has been placed</p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .order-timeline {
      .timeline-item {
        display: flex;
        gap: 15px;
        
        .timeline-marker {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #1976d2;
          margin-top: 5px;
        }
        
        .timeline-content {
          h4 {
            margin: 0 0 5px;
            color: #333;
          }
          
          p {
            margin: 0;
            color: #666;
            font-size: 14px;
          }
        }
      }
    }
  `]
})
export class OrderTimelineComponent { }
