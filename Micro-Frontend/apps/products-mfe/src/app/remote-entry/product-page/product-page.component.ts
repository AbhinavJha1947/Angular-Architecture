import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/models/product.model';

@Component({
    selector: 'app-product-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
    product: Product | undefined;
    loading = true;
    notFound = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productsService: ProductsService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadProduct(id);
        }
    }

    loadProduct(id: string): void {
        this.loading = true;
        this.productsService.getProductById(id).subscribe({
            next: (product) => {
                if (product) {
                    this.product = product;
                } else {
                    this.notFound = true;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading product:', error);
                this.notFound = true;
                this.loading = false;
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/products']);
    }

    addToCart(): void {
        if (this.product) {
            console.log('Add to cart:', this.product);
            // Implement cart functionality
        }
    }
}
