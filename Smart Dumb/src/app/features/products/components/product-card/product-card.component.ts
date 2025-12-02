import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
    @Input() product!: Product;
    @Output() addToCart = new EventEmitter<Product>();
    @Output() viewDetails = new EventEmitter<string>();

    onAddToCart(): void {
        this.addToCart.emit(this.product);
    }

    onViewDetails(): void {
        this.viewDetails.emit(this.product.id);
    }
}
