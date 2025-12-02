import { Component } from '@angular/core';

@Component({
    selector: 'app-widget',
    template: `
    <div class="widget">
      <h3>Recent Activities</h3>
      <ul>
        <li>New order #1234 received</li>
        <li>Product "Widget A" updated</li>
        <li>User John Doe registered</li>
      </ul>
    </div>
  `,
    styles: [`
    .widget {
      h3 {
        margin: 0 0 15px;
        color: #333;
      }
      
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        
        li {
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          color: #666;
          
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  `]
})
export class WidgetComponent { }
