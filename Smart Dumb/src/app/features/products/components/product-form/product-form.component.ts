import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductValidatorService } from '../../services/product-validator.service';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
    @Input() product?: Product;
    @Output() save = new EventEmitter<Product>();
    @Output() cancel = new EventEmitter<void>();

    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            id: [this.product?.id || ''],
            name: [this.product?.name || '', Validators.required],
            description: [this.product?.description || ''],
            price: [this.product?.price || 0, [Validators.required, ProductValidatorService.priceValidator]],
            category: [this.product?.category || '', Validators.required],
            imageUrl: [this.product?.imageUrl || ''],
            inStock: [this.product?.inStock || false]
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
