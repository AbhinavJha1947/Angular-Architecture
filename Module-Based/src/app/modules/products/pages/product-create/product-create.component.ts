import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
    productForm!: FormGroup;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private productsService: ProductsService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initForm();
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

    onSubmit(): void {
        if (this.productForm.valid) {
            this.isLoading = true;

            this.productsService.createProduct(this.productForm.value).subscribe({
                next: (product) => {
                    this.router.navigate(['/products', product.id]);
                },
                error: (error) => {
                    console.error('Failed to create product:', error);
                    this.isLoading = false;
                }
            });
        }
    }

    cancel(): void {
        this.router.navigate(['/products']);
    }
}
