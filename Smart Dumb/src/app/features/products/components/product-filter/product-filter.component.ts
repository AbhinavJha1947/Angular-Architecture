import { Component, Output, EventEmitter } from '@angular/core';
import { ProductFilter } from '../../models/product-filter.model';

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
    @Output() filterChange = new EventEmitter<ProductFilter>();

    filter: ProductFilter = {};

    onFilterChange(): void {
        this.filterChange.emit(this.filter);
    }
}
