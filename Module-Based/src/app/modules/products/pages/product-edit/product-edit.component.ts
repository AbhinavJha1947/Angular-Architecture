import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
    productForm!: FormGroup;
    product?: Product;
    isLoading = true;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productsService: ProductsService
    ) { }

    ngOnInit(): void {
        this.initForm();
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadProduct(id);
        }
    }

    private initForm(): void {
        this.productForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required]],
            price: [0, [Validators.required, Validators.min(0)]],
            category: ['', [Validators.required]],
            stock: [0, [Validators.required, Validators.min(0)]]
        });
    }

    private loadProduct(id: string): void {
        this.productsService.getProduct(id).subscribe({
            next: (product) => {
                if (product) {
                    this.product = product;
                    this.productForm.patchValue(product);
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Failed to load product:', error);
                this.isLoading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.productForm.valid && this.product) {
            this.isLoading = true;

            const updatedProduct = {
                ...this.productForm.value,
                id: this.product.id
            };

            this.productsService.updateProduct(updatedProduct).subscribe({
                next: (product) => {
                    this.router.navigate(['/products', product.id]);
                },
                error: (error) => {
                    console.error('Failed to update product:', error);
                    this.isLoading = false;
                }
            });
        }
    }

    cancel(): void {
        if (this.product) {
            this.router.navigate(['/products', this.product.id]);
        } else {
            this.router.navigate(['/products']);
        }
    }
}
