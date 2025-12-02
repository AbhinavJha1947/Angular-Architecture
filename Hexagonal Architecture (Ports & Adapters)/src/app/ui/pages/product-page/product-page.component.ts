import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../../domain/models/product';
import { ProductUseCasesPort } from '../../../domain/ports/inbound/product-use-cases.port';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ADAPTER_PROVIDERS } from '../../../infrastructure/adapters.config';

@Component({
    selector: 'app-product-page',
    standalone: true,
    imports: [CommonModule, ProductCardComponent],
    providers: [ADAPTER_PROVIDERS], // Providing adapters here for demo, usually in app.config
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
    products$!: Observable<Product[]>;

    // Injecting the Port (Interface), NOT the implementation
    constructor(private productUseCases: ProductUseCasesPort) { }

    ngOnInit(): void {
        this.products$ = this.productUseCases.getAllProducts();
    }
}
