import { Component } from '@angular/core';

@Component({
    selector: 'app-chart',
    template: `
    <div class="chart">
      <h3>Sales Overview</h3>
      <div class="chart-placeholder">
        <p>Chart visualization would go here</p>
        <p class="note">(Integrate with Chart.js, D3.js, or ng2-charts)</p>
      </div>
    </div>
  `,
    styles: [`
    .chart {
      h3 {
        margin: 0 0 15px;
        color: #333;
      }
      
      .chart-placeholder {
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #f5f5f5;
        border-radius: 4px;
        
        p {
          margin: 5px 0;
          color: #666;
        }
        
        .note {
          font-size: 12px;
          color: #999;
        }
      }
    }
  `]
})
export class ChartComponent { }
