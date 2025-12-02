import { Component, OnInit, inject } from '@angular/core';
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
    private productsFacade = inject(ProductsFacade);

    products = this.productsFacade.products;
    loading = this.productsFacade.loading;

    ngOnInit(): void {
        this.productsFacade.loadProducts();
    }
}
