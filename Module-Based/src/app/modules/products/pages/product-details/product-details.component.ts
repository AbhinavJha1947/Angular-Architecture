import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    product?: Product;
    isLoading = true;

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

    private loadProduct(id: string): void {
        this.productsService.getProduct(id).subscribe({
            next: (product) => {
                this.product = product;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Failed to load product:', error);
                this.isLoading = false;
            }
        });
    }

    editProduct(): void {
        if (this.product) {
            this.router.navigate(['/products', this.product.id, 'edit']);
        }
    }

    deleteProduct(): void {
        if (this.product && confirm('Are you sure you want to delete this product?')) {
            this.productsService.deleteProduct(this.product.id).subscribe({
                next: () => {
                    this.router.navigate(['/products']);
                },
                error: (error) => {
                    console.error('Failed to delete product:', error);
                }
            });
        }
    }

    goBack(): void {
        this.router.navigate(['/products']);
    }
}
