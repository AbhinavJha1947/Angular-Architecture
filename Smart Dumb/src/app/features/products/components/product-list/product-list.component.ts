import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    @Input() products: Product[] = [];
    @Output() productSelected = new EventEmitter<string>();
    @Output() productAddedToCart = new EventEmitter<Product>();

    onProductSelected(id: string): void {
        this.productSelected.emit(id);
    }

    onProductAddedToCart(product: Product): void {
        this.productAddedToCart.emit(product);
    }
}
