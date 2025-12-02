import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-product-edit-page',
    templateUrl: './product-edit-page.component.html',
    styleUrls: ['./product-edit-page.component.scss']
})
export class ProductEditPageComponent implements OnInit {
    product$: Observable<Product | undefined>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productsService: ProductsService
    ) {
        this.product$ = this.route.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id');
                if (id) {
                    return this.productsService.getProduct(id);
                }
                return of(undefined);
            })
        );
    }

    ngOnInit(): void { }

    onSave(product: Product): void {
        if (product.id) {
            this.productsService.updateProduct(product).subscribe(() => {
                this.router.navigate(['/products']);
            });
        } else {
            this.productsService.createProduct(product).subscribe(() => {
                this.router.navigate(['/products']);
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/products']);
    }
}
