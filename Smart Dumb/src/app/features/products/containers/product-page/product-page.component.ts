import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
    product$: Observable<Product>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productsService: ProductsService
    ) {
        this.product$ = this.route.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id')!;
                return this.productsService.getProduct(id);
            })
        );
    }

    ngOnInit(): void { }

    onBack(): void {
        this.router.navigate(['/products']);
    }

    onEdit(id: string): void {
        this.router.navigate(['/products', id, 'edit']);
    }
}
