import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-table',
    template: `
    <div class="table-container">
      <table>
        <ng-content></ng-content>
      </table>
    </div>
  `,
    styles: [`
    .table-container {
      overflow-x: auto;
      
      table {
        width: 100%;
        border-collapse: collapse;
        
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        th {
          background-color: #f5f5f5;
          font-weight: 600;
          color: #333;
        }
        
        tbody tr {
          transition: background-color 0.3s;
          
          &:hover {
            background-color: #f9f9f9;
          }
        }
      }
    }
  `]
})
export class TableComponent { }
