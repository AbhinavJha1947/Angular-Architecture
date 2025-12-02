import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
    @Input() product!: Product;
    @Output() back = new EventEmitter<void>();
    @Output() edit = new EventEmitter<string>();

    onBack(): void {
        this.back.emit();
    }

    onEdit(): void {
        this.edit.emit(this.product.id);
    }
}
