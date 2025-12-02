import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductFilter } from '../../models/product-filter.model';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-product-list-page',
    templateUrl: './product-list-page.component.html',
    styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit {
    products$: Observable<Product[]>;

    constructor(
        private productsService: ProductsService,
        private router: Router
    ) {
        this.products$ = this.productsService.getProducts();
    }

    ngOnInit(): void {
        // Initial load logic if needed
    }

    onFilterChange(filter: ProductFilter): void {
        // Logic to filter products (either client-side or server-side)
        // For now, just logging or re-fetching
        console.log('Filter changed:', filter);
        // this.products$ = this.productsService.getProducts(filter); // Assuming service supports filtering
    }

    onProductSelected(id: string): void {
        this.router.navigate(['/products', id]);
    }

    onProductAddedToCart(product: Product): void {
        console.log('Added to cart:', product);
        // Dispatch action or call cart service
    }
}
