import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    isLoading = true;

    constructor(
        private productsService: ProductsService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    private loadProducts(): void {
        this.productsService.getProducts().subscribe({
            next: (products) => {
                this.products = products;
                this.filteredProducts = products;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Failed to load products:', error);
                this.isLoading = false;
            }
        });
    }

    onSearch(searchTerm: string): void {
        this.filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    onFilter(category: string): void {
        if (category === 'all') {
            this.filteredProducts = this.products;
        } else {
            this.filteredProducts = this.products.filter(p => p.category === category);
        }
    }

    viewProduct(id: string): void {
        this.router.navigate(['/products', id]);
    }

    createProduct(): void {
        this.router.navigate(['/products/create']);
    }
}
