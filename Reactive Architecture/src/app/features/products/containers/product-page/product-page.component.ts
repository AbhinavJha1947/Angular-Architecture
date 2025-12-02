import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsFacade } from '../../state/products.facade';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
    selector: 'app-product-page',
    standalone: true,
    imports: [CommonModule, ProductListComponent],
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
    products$ = this.productsFacade.products$;
    loading$ = this.productsFacade.loading$;

    constructor(private productsFacade: ProductsFacade) { }

    ngOnInit(): void {
        this.productsFacade.loadProducts();
    }
}
