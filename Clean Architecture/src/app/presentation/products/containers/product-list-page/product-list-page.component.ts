import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../../../domain/models/product';
import { GetProductsUseCase } from '../../../../application/use-cases/products/get-products.usecase';

@Component({
    selector: 'app-product-list-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-list-page.component.html',
    styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit {
    products$: Observable<Product[]>;

    constructor(private getProductsUseCase: GetProductsUseCase) {
        this.products$ = this.getProductsUseCase.execute();
    }

    ngOnInit(): void { }
}
