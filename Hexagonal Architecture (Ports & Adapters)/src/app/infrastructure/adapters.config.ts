import { Provider } from '@angular/core';
import { ProductRepositoryPort } from '../domain/ports/outbound/product-repository.port';
import { ProductHttpAdapter } from './http/product-http.adapter';
import { ProductUseCasesPort } from '../domain/ports/inbound/product-use-cases.port';
import { GetProductsUseCase } from '../application/use-cases/products/get-products.usecase';

export const ADAPTER_PROVIDERS: Provider[] = [
    // Bind Outbound Port (Repository) to Infrastructure Adapter
    { provide: ProductRepositoryPort, useClass: ProductHttpAdapter },

    // Bind Inbound Port (Use Case) to Application Service
    { provide: ProductUseCasesPort, useClass: GetProductsUseCase }
];
