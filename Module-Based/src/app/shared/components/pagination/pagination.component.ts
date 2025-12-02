import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    template: `
    <div class="pagination">
      <button 
        (click)="onPageChange(currentPage - 1)"
        [disabled]="currentPage === 1">
        Previous
      </button>
      
      <span class="page-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      
      <button 
        (click)="onPageChange(currentPage + 1)"
        [disabled]="currentPage === totalPages">
        Next
      </button>
    </div>
  `,
    styles: [`
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      margin-top: 20px;
      
      button {
        padding: 8px 16px;
        background-color: #1976d2;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        
        &:hover:not(:disabled) {
          background-color: #1565c0;
        }
        
        &:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      }
      
      .page-info {
        color: #666;
        font-size: 14px;
      }
    }
  `]
})
export class PaginationComponent {
    @Input() currentPage = 1;
    @Input() totalPages = 1;
    @Output() pageChange = new EventEmitter<number>();

    onPageChange(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.pageChange.emit(page);
        }
    }
}
