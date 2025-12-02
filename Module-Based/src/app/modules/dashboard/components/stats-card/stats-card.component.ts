import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stats-card',
    template: `
    <div class="stats-card">
      <div class="icon">{{ icon }}</div>
      <div class="content">
        <h3>{{ title }}</h3>
        <p class="value">{{ value }}</p>
      </div>
    </div>
  `,
    styles: [`
    .stats-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 15px;
      transition: transform 0.3s;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
    }
    
    .icon {
      font-size: 40px;
    }
    
    .content {
      h3 {
        margin: 0;
        font-size: 14px;
        color: #666;
        font-weight: 500;
      }
      
      .value {
        margin: 5px 0 0;
        font-size: 24px;
        font-weight: 700;
        color: #333;
      }
    }
  `]
})
export class StatsCardComponent {
    @Input() title: string = '';
    @Input() value: string | number = 0;
    @Input() icon: string = '';
}
