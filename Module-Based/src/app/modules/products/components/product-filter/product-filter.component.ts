import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-product-filter',
    template: `
    <div class="filter-box">
      <select (change)="onFilterChange($event)">
        <option value="all">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Books">Books</option>
        <option value="Home">Home</option>
      </select>
    </div>
  `,
    styles: [`
    .filter-box {
      select {
        padding: 10px 15px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        background-color: white;
        cursor: pointer;
        
        &:focus {
          outline: none;
          border-color: #1976d2;
        }
      }
    }
  `]
})
export class ProductFilterComponent {
    @Output() filter = new EventEmitter<string>();

    onFilterChange(event: Event): void {
        const target = event.target as HTMLSelectElement;
        this.filter.emit(target.value);
    }
}
