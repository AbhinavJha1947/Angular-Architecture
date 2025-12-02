import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-product-search',
    template: `
    <div class="search-box">
      <input 
        type="text" 
        placeholder="Search products..."
        (input)="onSearchChange($event)">
    </div>
  `,
    styles: [`
    .search-box {
      flex: 1;
      
      input {
        width: 100%;
        padding: 10px 15px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        
        &:focus {
          outline: none;
          border-color: #1976d2;
        }
      }
    }
  `]
})
export class ProductSearchComponent {
    @Output() search = new EventEmitter<string>();

    onSearchChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.search.emit(target.value);
    }
}
