# Hexagonal Architecture (Ports & Adapters) in Angular

This project demonstrates **Hexagonal Architecture** (also known as **Ports & Adapters**) in Angular, where the core business logic is completely isolated from external concerns, making it framework-independent, highly test able, and easy to adapt to changing requirements.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Key Concepts](#key-concepts)
- [When to Use This Architecture](#when-to-use-this-architecture)
- [Benefits & Drawbacks](#benefits--drawbacks)
- [Project Structure](#project-structure)
- [Layer Responsibilities](#layer-responsibilities)
- [Getting Started](#getting-started)
- [Code Examples](#code-examples)
- [Best Practices](#best-practices)
- [Testing Approach](#testing-approach)
- [Further Reading](#further-reading)

## Architecture Overview

Hexagonal Architecture places the **business logic at the center** (the hexagon), surrounded by ports (interfaces) and adapters (implementations). The core business logic has no knowledge of the outside world.

### The Hexagon Principle

```
External World          Ports           Core (Hexagon)          Ports          External World
┌──────────────┐    ┌────────────┐    ┌──────────────┐    ┌────────────┐    ┌──────────────┐
│              │    │            │    │              │    │            │    │              │
│  Angular UI  │───▶│  UI Port   │───▶│   Domain     │◀───│ Data Port  │◀───│   Database   │
│  Components  │    │ (Interface)│    │   Models     │    │(Interface) │    │    / API     │
│              │    │            │    │   Services   │    │            │    │              │
└──────────────┘    └────────────┘    │              │    └────────────┘    └──────────────┘
                          ▲            │  Use Cases   │            ▲
                          │            │              │            │
                    ┌────────────┐    │  Value       │    ┌────────────┐
                    │  Adapters  │    │  Objects     │    │  Adapters  │
                    │(HTTP, Mock)│    │              │    │(HTTP, Mock)│
                    └────────────┘    └──────────────┘    └────────────┘
```

**Key Idea**: The core doesn't depend on anything. Everything depends on the core.

## Key Concepts

### 1. **The Hexagon (Domain)**
The center of the architecture containing pure business logic, completely independent of frameworks, databases, or UI.

### 2. **Ports**
Interfaces that define how the outside world can interact with the core.

**Two types:**
- **Inbound (Driving) Ports** - How the application is used (e.g., `ProductUseCases` interface)
- **Outbound (Driven) Ports** - What the application needs (e.g., `ProductRepository` interface)

### 3. **Adapters**
Concrete implementations of ports that connect the core to the external world.

**Two types:**
- **Primary (Driving) Adapters** - Drive the application (e.g., Angular components, REST controllers)
- **Secondary (Driven) Adapters** - Provide functionality (e.g., HTTP repositories, database adapters)

### 4. **Dependency Rule**
Dependencies point **inward**. The core knows nothing about the outer layers.

### 5. **Use Cases**
Application-specific business rules that orchestrate the flow between domain models and repositories.

## When to Use This Architecture

✅ **Best suited for:**
- Complex business domains requiring framework independence
- Applications that may need to support multiple interfaces (web, mobile, CLI)
- Projects with strict testing requirements
- Long-term applications where technology may change
- Systems integrating with multiple external services
- When business logic must be portable across platforms
- Microservices where core logic is shared

✅ **Ideal scenarios:**
- Financial applications with complex business rules
- Healthcare systems with regulatory requirements
- E-commerce platforms with multiple payment providers
- Applications with both web and mobile interfaces
- Systems requiring extensive integration testing

❌ **Avoid when:**
- Simple CRUD applications
- Rapid prototyping or MVPs
- Small projects with limited lifespan
- Teams unfamiliar with hexagonal concepts
- Very tight deadlines

## Benefits & Drawbacks

### ✅ Benefits

| Benefit | Description |
|---------|-------------|
| **Framework Independence** | Core logic works with any framework (Angular, React, Vue, etc.) |
| **Testability** | Business logic tested without UI, database, or external dependencies |
| **Flexibility** | Easy to swap out adapters (e.g., from REST API to GraphQL) |
| **Maintainability** | Clear boundaries make code easier to understand |
| **Portability** | Core logic can be reused across platforms |
| **Technology Agnostic** | Change databases, APIs, or UI without affecting core |

### ❌ Drawbacks

| Drawback | Description |
|----------|-------------|
| **Complexity** | Many layers and interfaces |
| **Boilerplate** | Lots of interface definitions and mappings |
| **Learning Curve** | Team must understand ports and adapters concept |
| **Over-Engineering** | Can be overkill for simple applications |
| **Initial Setup** | Takes longer to set up than simpler architectures |

## Project Structure

```
src/
└── app/
    ├── domain/                          ← The core of the hexagon (business logic)
    │   ├── models/
    │   │   ├── product.ts
    │   │   ├── order.ts
    │   │   ├── user.ts
    │   │   └── payment.ts
    │   │
    │   ├── services/
    │   │   ├── price-calculator.service.ts
    │   │   ├── stock-validation.service.ts
    │   │   ├── order-processor.service.ts
    │   │   └── payment-validator.service.ts
    │   │
    │   ├── ports/                       ← Interfaces (contracts)
    │   │   ├── inbound/                 ← Driving ports
    │   │   │   ├── product-use-cases.port.ts
    │   │   │   ├── order-use-cases.port.ts
    │   │   │   └── user-use-cases.port.ts
    │   │   └── outbound/                ← Driven ports
    │   │       ├── product-repository.port.ts
    │   │       ├── order-repository.port.ts
    │   │       ├── user-repository.port.ts
    │   │       ├── notification.port.ts
    │   │       └── payment-gateway.port.ts
    │   │
    │   └── value-objects/
    │       ├── money.ts
    │       ├── email.ts
    │       └── address.ts
    │
    ├── application/                     ← Use Cases (orchestration)
    │   ├── use-cases/
    │   │   ├── products/
    │   │   │   ├── get-products.usecase.ts
    │   │   │   ├── create-product.usecase.ts
    │   │   │   ├── update-product.usecase.ts
    │   │   │   └── delete-product.usecase.ts
    │   │   ├── orders/
    │   │   │   ├── create-order.usecase.ts
    │   │   │   ├── process-payment.usecase.ts
    │   │   │   └── update-stock.usecase.ts
    │   │   └── users/
    │   │       ├── register-user.usecase.ts
    │   │       └── authenticate-user.usecase.ts
    │   │
    │   └── dto/
    │       ├── product.dto.ts
    │       ├── order.dto.ts
    │       └── user.dto.ts
    │
    ├── infrastructure/                  ← Adapters (implementations)
    │   ├── http/                        ← Primary adapters (inbound)
    │   │   ├── product-http.adapter.ts   ← implements product-repository.port.ts
    │   │   ├── product-api.mapper.ts
    │   │   ├── order-http.adapter.ts
    │   │   ├── user-http.adapter.ts
    │   │   └── interceptors/
    │   │       ├── auth.interceptor.ts
    │   │       └── error.interceptor.ts
    │   │
    │   ├── local-storage/               ← Secondary adapters (outbound)
    │   │   ├── product-local.adapter.ts
    │   │   └── user-local.adapter.ts
    │   │
    │   ├── mocks/                       ← Mock adapters for testing
    │   │   ├── product.mock.adapter.ts
    │   │   └── order.mock.adapter.ts
    │   │
    │   ├── notification/
    │   │   ├── email-notification.adapter.ts
    │   │   └── push-notification.adapter.ts
    │   │
    │   ├── payment/
    │   │   ├── stripe-payment.adapter.ts
    │   │   └── paypal-payment.adapter.ts
    │   │
    │   └── adapters.config.ts           ← Injection token mapping port → adapter
    │
    ├── ui/                              ← Angular Presentation Layer
    │   ├── pages/
    │   │   ├── product-page/
    │   │   │   ├── product-page.component.ts
    │   │   │   ├── product-page.component.html
    │   │   │   └── product-page.component.scss
    │   │   ├── product-edit-page/
    │   │   ├── product-list-page/
    │   │   ├── order-page/
    │   │   └── checkout-page/
    │   │
    │   ├── components/
    │   │   ├── product-card/
    │   │   │   ├── product-card.component.ts
    │   │   │   ├── product-card.component.html
    │   │   │   └── product-card.component.scss
    │   │   ├── order-summary/
    │   │   ├── payment-form/
    │   │   └── user-profile/
    │   │
    │   ├── state/                       ← Optional (NgRx/Signals)
    │   │   ├── products.state.ts
    │   │   └── orders.state.ts
    │   │
    │   └── ui.routes.ts
    │
    ├── core/                            ← Singleton technical stuff
    │   ├── auth/
    │   │   ├── auth.service.ts
    │   │   └── token.service.ts
    │   ├── guards/
    │   │   ├── auth.guard.ts
    │   │   └── role.guard.ts
    │   └── shared-services/
    │       ├── logger.service.ts
    │       └── config.service.ts
    │
    └── environments/
        ├── environment.ts
        └── environment.prod.ts
```

## Layer Responsibilities

### 🎯 Domain Layer (The Hexagon)

**What goes here:**
- **Models**: Pure TypeScript classes/interfaces
- **Value Objects**: Immutable domain concepts (Money, Email, Address)
- **Domain Services**: Pure business logic
- **Ports (Interfaces)**: Contracts for external interactions

**Rules:**
- NO imports from outer layers
- NO Angular dependencies
- NO HTTP, database, or framework code
- Pure TypeScript/JavaScript only

**Example:**
```typescript
// domain/models/product.ts
export interface Product {
  id: string;
  name: string;
  price: Money;
  stock: number;
}

// domain/ports/outbound/product-repository.port.ts
export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  save(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
```

### 🔧 Application Layer (Use Cases)

**What goes here:**
- Use case implementations
- Application-specific business rules
- DTOs for data transfer
- Mappers between domain and DTOs

**Rules:**
- Can depend on Domain layer
- NO UI dependencies
- NO framework-specific code (except DI)

### 🔌 Infrastructure Layer (Adapters)

**What goes here:**
- HTTP adapters implementing repository ports
- Database adapters
- External API integrations
- File system access
- Mock implementations for testing

**Rules:**
- Implements port interfaces from Domain
- Contains all framework-specific code
- Can use Angular, HTTP, etc.

### 🎨 UI Layer (Presentation)

**What goes here:**
- Angular components
- Pages and routing
- UI state management
- Presentation logic

**Rules:**
- Can call use cases from Application layer
- Should not call infrastructure directly
- UI-specific concerns only

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Angular CLI 17.x or higher

### Installation

```bash
cd "d:\Angular Architecture\Hexagonal Architecture (Ports & Adapters)"
npm install
```

### Running the Application

```bash
npm start
# Navigate to http://localhost:4200/
```

### Running Tests

```bash
npm test
npm run test:coverage
```

### Building

```bash
npm run build
```

## Code Examples

### Example 1: Port Definition (Domain)

```typescript
// domain/ports/outbound/product-repository.port.ts
import { Product } from '../../models/product';

export abstract class ProductRepository {
  abstract findAll(): Promise<Product[]>;
  abstract findById(id: string): Promise<Product | null>;
  abstract save(product: Product): Promise<Product>;
  abstract delete(id: string): Promise<void>;
}
```

### Example 2: Use Case (Application)

```typescript
// application/use-cases/products/get-products.usecase.ts
import { Injectable } from '@angular/core';
import { ProductRepository } from '../../../domain/ports/outbound/product-repository.port';
import { Product } from '../../../domain/models/product';

@Injectable({ providedIn: 'root' })
export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
```

### Example 3: HTTP Adapter (Infrastructure)

```typescript
// infrastructure/http/product-http.adapter.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProductRepository } from '../../domain/ports/outbound/product-repository.port';
import { Product } from '../../domain/models/product';
import { ProductApiMapper } from './product-api.mapper';

@Injectable({ providedIn: 'root' })
export class ProductHttpAdapter implements ProductRepository {
  private readonly baseUrl = '/api/products';

  constructor(
    private http: HttpClient,
    private mapper: ProductApiMapper
  ) {}

  async findAll(): Promise<Product[]> {
    const response = await firstValueFrom(
      this.http.get<any[]>(this.baseUrl)
    );
    return response.map(dto => this.mapper.toDomain(dto));
  }

  async findById(id: string): Promise<Product | null> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.baseUrl}/${id}`)
      );
      return this.mapper.toDomain(response);
    } catch {
      return null;
    }
  }

  async save(product: Product): Promise<Product> {
    const dto = this.mapper.toDto(product);
    const response = product.id
      ? await firstValueFrom(this.http.put<any>(`${this.baseUrl}/${product.id}`, dto))
      : await firstValueFrom(this.http.post<any>(this.baseUrl, dto));
    return this.mapper.toDomain(response);
  }

  async delete(id: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
  }
}
```

### Example 4: Mock Adapter (Infrastructure - Testing)

```typescript
// infrastructure/mocks/product.mock.adapter.ts
import { Injectable } from '@angular/core';
import { ProductRepository } from '../../domain/ports/outbound/product-repository.port';
import { Product } from '../../domain/models/product';

@Injectable()
export class ProductMockAdapter implements ProductRepository {
  private products: Product[] = [
    { id: '1', name: 'Product 1', price: { amount: 100, currency: 'USD' }, stock: 10 },
    { id: '2', name: 'Product 2', price: { amount: 200, currency: 'USD' }, stock: 5 }
  ];

  async findAll(): Promise<Product[]> {
    return Promise.resolve([...this.products]);
  }

  async findById(id: string): Promise<Product | null> {
    return Promise.resolve(this.products.find(p => p.id === id) || null);
  }

  async save(product: Product): Promise<Product> {
    if (product.id) {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index >= 0) {
        this.products[index] = product;
      }
    } else {
      product.id = String(this.products.length + 1);
      this.products.push(product);
    }
    return Promise.resolve(product);
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter(p => p.id !== id);
    return Promise.resolve();
  }
}
```

### Example 5: Dependency Injection Configuration

```typescript
// infrastructure/adapters.config.ts
import { Provider} from '@angular/core';
import { ProductRepository } from '../domain/ports/outbound/product-repository.port';
import { ProductHttpAdapter } from './http/product-http.adapter';
import { ProductMockAdapter } from './mocks/product.mock.adapter';
import { environment } from '../environments/environment';

export const INFRASTRUCTURE_PROVIDERS: Provider[] = [
  {
    provide: ProductRepository,
    useClass: environment.production 
      ? ProductHttpAdapter 
      : ProductMockAdapter
  }
  // Add other repository mappings here
];
```

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { INFRASTRUCTURE_PROVIDERS } from './infrastructure/adapters.config';

export const appConfig: ApplicationConfig = {
  providers: [
    ...INFRASTRUCTURE_PROVIDERS,
    // Other providers
  ]
};
```

### Example 6: Component Using Use Case

```typescript
// ui/pages/product-list-page/product-list-page.component.ts
import { Component, OnInit } from '@angular/core';
import { GetProductsUseCase } from '../../../application/use-cases/products/get-products.usecase';
import { DeleteProductUseCase } from '../../../application/use-cases/products/delete-product.usecase';
import { Product } from '../../../domain/models/product';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html'
})
export class ProductListPageComponent implements OnInit {
  products: Product[] = [];
  loading = false;

  constructor(
    private getProductsUseCase: GetProductsUseCase,
    private deleteProductUseCase: DeleteProductUseCase
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    this.loading = true;
    try {
      this.products = await this.getProductsUseCase.execute();
    } finally {
      this.loading = false;
    }
  }

  async onDelete(id: string): Promise<void> {
    if (confirm('Delete this product?')) {
      await this.deleteProductUseCase.execute(id);
      await this.loadProducts();
    }
  }
}
```

## Best Practices

### ✅ DO

1. **Keep Domain Pure**
   - No framework dependencies
   - Pure TypeScript/JavaScript only

2. **Define Clear Port Interfaces**
   ```typescript
   export abstract class ProductRepository {
     abstract findAll(): Promise<Product[]>;
   }
   ```

3. **Use Dependency Injection for Adapters**
   ```typescript
   {
     provide: ProductRepository,
     useClass: ProductHttpAdapter
   }
   ```

4. **Test Domain in Isolation**
   ```typescript
   // No Angular TestBed needed
   const service = new PriceCalculator();
   expect(service.calculate(100, 0.2)).toBe(120);
   ```

5. **Create Multiple Adapters**
   - HTTP adapter for production
   - Mock adapter for testing
   - LocalStorage adapter for offline

6. **Map Between Layers**
   - API DTOs → Domain Models
   - Domain Models → API DTOs

### ❌ DON'T

1. **Don't Import from Outer Layers in Domain**
   ```typescript
   // ❌ Bad - Angular in domain
   import { Injectable } from '@angular/core';
   
   // ✅ Good - pure TypeScript
   export class PriceCalculator { }
   ```

2. **Don't Bypass Ports**
   ```typescript
   // ❌ Bad - component calling adapter directly
   constructor(private adapter: ProductHttpAdapter) {}
   
   // ✅ Good - component calling use case/port
   constructor(private useCase: GetProductsUseCase) {}
   ```

3. **Don't Put Business Logic in Adapters**
   ```typescript
   // ❌ Bad - business logic in adapter
   async save(product: Product): Promise<Product> {
     product.discount = product.price * 0.1; // Business logic!
     return this.http.post(...);
   }
   
   // ✅ Good - adapter only handles I/O
   async save(product: Product): Promise<Product> {
     const dto = this.mapper.toDto(product);
     return this.http.post(...);
   }
   ```

4. **Don't Create God Ports**
   - Keep ports focused and cohesive
   - Split large interfaces

## Testing Approach

### Testing Domain Logic

```typescript
describe('PriceCalculator', () => {
  let calculator: PriceCalculator;

  beforeEach(() => {
    calculator = new PriceCalculator(); // No Angular dependencies!
  });

  it('should calculate price with tax', () => {
    const result = calculator.calculateWithTax(100, 0.2);
    expect(result).toBe(120);
  });
});
```

### Testing Use Cases

```typescript
describe('GetProductsUseCase', () => {
  let useCase: GetProductsUseCase;
  let mockRepository: ProductRepository;

  beforeEach(() => {
    mockRepository = new ProductMockAdapter();
    useCase = new GetProductsUseCase(mockRepository);
  });

  it('should get all products', async () => {
    const products = await useCase.execute();
    expect(products.length).toBeGreaterThan(0);
  });
});
```

### Testing Adapters

```typescript
describe('ProductHttpAdapter', () => {
  let adapter: ProductHttpAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductHttpAdapter, ProductApiMapper]
    });
    adapter = TestBed.inject(ProductHttpAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch products from API', async () => {
    const mockResponse = [{ id: '1', name: 'Test' }];
    
    const promise = adapter.findAll();
    
    const req = httpMock.expectOne('/api/products');
    req.flush(mockResponse);
    
    const result = await promise;
    expect(result.length).toBe(1);
  });
});
```

## Further Reading

- [Hexagonal Architecture by Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Ports and Adapters Pattern](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs/)
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/)

---

## License

MIT