import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../products.model';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];

    constructor(private productsService: ProductsService) { }

    ngOnInit(): void {
        this.productsService.getProducts().subscribe(products => {
            this.products = products;
        });
    }
}
