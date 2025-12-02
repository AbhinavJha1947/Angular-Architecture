import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/models/product.model';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    loading = true;

    constructor(
        private productsService: ProductsService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.loading = true;
        this.productsService.getAllProducts().subscribe({
            next: (products) => {
                this.products = products;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading products:', error);
                this.loading = false;
            }
        });
    }

    viewProduct(productId: string): void {
        this.router.navigate(['/products', productId]);
    }
}
