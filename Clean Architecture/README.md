# Clean Architecture in Angular

This project demonstrates **Clean Architecture** principles in Angular, organizing code into distinct layers with clear dependencies that flow inward, ensuring business logic remains independent of frameworks, UI, and external concerns.

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

Clean Architecture, introduced by Robert C. Martin (Uncle Bob), organizes code into concentric layers where dependencies point inward. The core business logic sits at the center, completely isolated from external concerns like databases, frameworks, and UI.

**The Dependency Rule**: Source code dependencies can only point **inward**. Inner layers know nothing about outer layers.

### The Four Layers

1. **Domain (Entities)** - Enterprise business rules
2. **Application (Use Cases)** - Application-specific business rules
3. **Infrastructure (Interface Adapters)** - Converts data between use cases and external systems
4. **Presentation (Frameworks & Drivers)** - UI, Web, Devices, External interfaces

```
┌─────────────────────────────────────┐
│      Presentation (UI/Web)          │  ← Frameworks & Drivers
├─────────────────────────────────────┤
│    Infrastructure (Adapters)        │  ← Interface Adapters
├─────────────────────────────────────┤
│    Application (Use Cases)          │  ← Application Business Rules
├─────────────────────────────────────┤
│    Domain (Entities)                │  ← Enterprise Business Rules
└─────────────────────────────────────┘
        Dependencies flow inward →
```

## Key Concepts

### 1. **The Dependency Inversion Principle**
Outer layers depend on abstractions (interfaces) defined in inner layers, not concrete implementations.

### 2. **Use Cases**
Each use case represents a single business operation (e.g., "Create Order", "Get User By ID"). Use cases orchestrate the flow of data between entities and external systems.

### 3. **Repository Pattern**
Repositories are interfaces defined in the Domain layer but implemented in Infrastructure. This allows swapping data sources without changing business logic.

### 4. **DTOs (Data Transfer Objects)**
Objects that carry data between layers, preventing tight coupling to domain entities.

### 5. **Mappers**
Transform data between different representations (e.g., API responses to domain models).

## When to Use This Architecture

✅ **Best suited for:**
- Complex business domains with rich business logic
- Long-term projects requiring high maintainability
- Applications that need to support multiple interfaces (web, mobile, API)
- Projects where business rules must be testable in isolation
- Systems that integrate with multiple external services
- Enterprise applications with strict testing requirements

❌ **Avoid when:**
- Building simple CRUD applications
- Rapid prototyping or MVPs with uncertain requirements
- Small projects with limited lifespan
- Teams unfamiliar with Clean Architecture (steep learning curve)
- Projects with very tight deadlines

## Benefits & Drawbacks

### ✅ Benefits

| Benefit | Description |
|---------|-------------|
| **Independence** | Business logic is independent of frameworks, UI, database, and external agencies |
| **Testability** | Business rules can be tested without UI, database, web server, or any external element |
| **Maintainability** | Clear separation makes it easier to understand and modify code |
| **Flexibility** | Easy to swap out databases, frameworks, or UI without affecting business logic |
| **Scalability** | Well-organized code scales better as the application grows |
| **Team Collaboration** | Teams can work on different layers simultaneously without conflicts |

### ❌ Drawbacks

| Drawback | Description |
|----------|-------------|
| **Complexity** | Introduces significant boilerplate and additional layers |
| **Learning Curve** | Requires team understanding of architecture principles |
| **Over-engineering** | Can be overkill for simple applications |
| **Initial Setup Time** | Takes longer to set up compared to simpler architectures |
| **Performance Overhead** | Multiple layers and mapping can introduce minor performance overhead |

## Project Structure

```
src/
└── app/
    ├── domain/                        ← Enterprise business rules (pure)
    │   ├── models/
    │   │   ├── product.ts
    │   │   ├── user.ts
    │   │   ├── order.ts
    │   │   └── payment.ts
    │   │
    │   ├── repositories/
    │   │   ├── product.repository.ts  ← abstract interface
    │   │   ├── user.repository.ts
    │   │   └── order.repository.ts
    │   │
    │   ├── services/                  ← Pure business logic
    │   │   ├── calculate-price.service.ts
    │   │   ├── validation.service.ts
    │   │   ├── tax-calculator.service.ts
    │   │   └── discount.service.ts
    │   │
    │   └── value-objects/
    │       ├── money.ts
    │       ├── email.ts
    │       └── address.ts
    │
    ├── application/                   ← Use cases (application business rules)
    │   ├── use-cases/
    │   │   ├── products/
    │   │   │   ├── get-products.usecase.ts
    │   │   │   ├── get-product-by-id.usecase.ts
    │   │   │   ├── add-product.usecase.ts
    │   │   │   ├── update-product.usecase.ts
    │   │   │   └── delete-product.usecase.ts
    │   │   ├── orders/
    │   │   │   ├── create-order.usecase.ts
    │   │   │   ├── cancel-order.usecase.ts
    │   │   │   └── get-order-history.usecase.ts
    │   │   └── auth/
    │   │       ├── login.usecase.ts
    │   │       ├── register.usecase.ts
    │   │       └── logout.usecase.ts
    │   │
    │   ├── dto/                       ← Data transfer objects
    │   │   ├── product.dto.ts
    │   │   ├── order.dto.ts
    │   │   └── user.dto.ts
    │   │
    │   ├── mappers/
    │   │   ├── product.mapper.ts
    │   │   ├── order.mapper.ts
    │   │   └── user.mapper.ts
    │   │
    │   └── ports/
    │       ├── product-repository.port.ts
    │       └── notification.port.ts
    │
    ├── infrastructure/                ← API/DB implementations (frameworks)
    │   ├── http/
    │   │   ├── product-api.service.ts   ← implements domain repository
    │   │   ├── user-api.service.ts
    │   │   └── order-api.service.ts
    │   │
    │   ├── adapters/
    │   │   ├── product.adapter.ts
    │   │   ├── user.adapter.ts
    │   │   └── order.adapter.ts
    │   │
    │   ├── interceptors/
    │   │   ├── auth.interceptor.ts
    │   │   ├── error.interceptor.ts
    │   │   └── logging.interceptor.ts
    │   │
    │   ├── guards/
    │   │   ├── auth.guard.ts
    │   │   └── role.guard.ts
    │   │
    │   └── persistence/
    │       ├── local-storage.service.ts
    │       └── session-storage.service.ts
    │
    ├── presentation/                  ← Angular UI (frameworks & drivers)
    │   ├── products/
    │   │   ├── containers/
    │   │   │   ├── product-list-page/
    │   │   │   │   ├── product-list-page.component.ts
    │   │   │   │   ├── product-list-page.component.html
    │   │   │   │   └── product-list-page.component.scss
    │   │   │   ├── product-details-page/
    │   │   │   └── product-edit-page/
    │   │   ├── components/
    │   │   │   ├── product-card/
    │   │   │   ├── product-form/
    │   │   │   └── product-filter/
    │   │   ├── products.routes.ts
    │   │   └── products.module.ts
    │   │
    │   ├── auth/
    │   │   ├── login/
    │   │   ├── register/
    │   │   └── auth.routes.ts
    │   │
    │   ├── orders/
    │   │   ├── containers/
    │   │   ├── components/
    │   │   └── orders.routes.ts
    │   │
    │   └── shared/
    │       ├── components/
    │       ├── pipes/
    │       └── directives/
    │
    ├── core/                           ← Singletons (optional)
    │   ├── guards/
    │   ├── services/
    │   │   ├── logger.service.ts
    │   │   └── notification.service.ts
    │   └── state/
    │
    └── environments/
        ├── environment.ts
        └── environment.prod.ts
```

## Layer Responsibilities

### 🎯 Domain Layer (Innermost)
- **Contains**: Entities, value objects, domain services, repository interfaces
- **Knows about**: Nothing (pure TypeScript/JavaScript)
- **Responsibilities**: 
  - Define business entities and rules
  - Enforce invariants
  - Domain logic that applies across use cases

### 🔧 Application Layer
- **Contains**: Use cases, DTOs, mappers, application services
- **Knows about**: Domain layer only
- **Responsibilities**:
  - Orchestrate domain objects to fulfill business scenarios
  - Define application-specific business rules
  - Transform data between presentation and domain

### 🔌 Infrastructure Layer
- **Contains**: API services, adapters, interceptors, guards, persistence
- **Knows about**: Domain and Application layers
- **Responsibilities**:
  - Implement repository interfaces
  - Handle HTTP requests
  - Manage external integrations
  - Convert external data formats to domain models

### 🎨 Presentation Layer (Outermost)
- **Contains**: Angular components, pages, routing, UI state management
- **Knows about**: All inner layers (through dependency injection)
- **Responsibilities**:
  - Display information to users
  - Handle user interactions
  - Route to use cases
  - Manage UI state

## Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** 8.x or higher
- **Angular CLI** 17.x or higher
- Basic understanding of:
  - TypeScript
  - Angular fundamentals
  - SOLID principles
  - Dependency injection

### Installation

```bash
# Clone the repository (if applicable)
cd "d:\Angular Architecture\Clean Architecture"

# Install dependencies
npm install
```

### Running the Application

```bash
# Development server
npm start
# or
ng serve

# Navigate to http://localhost:4200/
# The app will automatically reload if you change any source files
```

### Running Tests

```bash
# Unit tests
npm test
# or
ng test

# End-to-end tests
npm run e2e
# or
ng e2e

# Test coverage
ng test --code-coverage
```

### Building for Production

```bash
# Production build
npm run build
# or
ng build --configuration production

# Output will be in the dist/ directory
```

## Code Examples

### Example 1: Repository Interface (Domain Layer)

```typescript
// domain/repositories/product.repository.ts
export interface ProductRepository {
  getAll(): Observable<Product[]>;
  getById(id: string): Observable<Product>;
  create(product: Product): Observable<Product>;
  update(id: string, product: Product): Observable<Product>;
  delete(id: string): Observable<void>;
}
```

### Example 2: Use Case (Application Layer)

```typescript
// application/use-cases/products/get-product-by-id.usecase.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/models/product';

@Injectable({ providedIn: 'root' })
export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  execute(id: string): Observable<Product> {
    return this.productRepository.getById(id);
  }
}
```

### Example 3: Adapter Implementation (Infrastructure Layer)

```typescript
// infrastructure/adapters/product.adapter.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/models/product';
import { ProductApiService } from '../http/product-api.service';
import { ProductMapper } from '../../application/mappers/product.mapper';

@Injectable({ providedIn: 'root' })
export class ProductAdapter implements ProductRepository {
  constructor(
    private apiService: ProductApiService,
    private mapper: ProductMapper
  ) {}

  getAll(): Observable<Product[]> {
    return this.apiService.fetchProducts().pipe(
      map(dtos => dtos.map(dto => this.mapper.toDomain(dto)))
    );
  }

  getById(id: string): Observable<Product> {
    return this.apiService.fetchProduct(id).pipe(
      map(dto => this.mapper.toDomain(dto))
    );
  }

  // ... other methods
}
```

### Example 4: Component Using Use Case (Presentation Layer)

```typescript
// presentation/products/containers/product-list-page/product-list-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../domain/models/product';
import { GetProductsUseCase } from '../../../../application/use-cases/products/get-products.usecase';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private getProductsUseCase: GetProductsUseCase) {}

  ngOnInit(): void {
    this.products$ = this.getProductsUseCase.execute();
  }
}
```

### Example 5: Dependency Injection Configuration

```typescript
// app.config.ts or providers array
import { ProductRepository } from './domain/repositories/product.repository';
import { ProductAdapter } from './infrastructure/adapters/product.adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    // Map interface to implementation
    { provide: ProductRepository, useClass: ProductAdapter },
    // ... other providers
  ]
};
```

## Best Practices

### ✅ DO

1. **Keep the Domain Layer Pure**
   - No Angular dependencies
   - No framework-specific code
   - Only pure TypeScript/JavaScript

2. **Use Dependency Injection**
   - Inject abstractions, not concrete implementations
   - Use Angular's DI for wiring up dependencies

3. **Define Clear Boundaries**
   - Use interfaces for all layer interactions
   - Keep dependencies pointing inward

4. **Write Use Case-Driven Code**
   - Each use case should be a single, testable operation
   - Name use cases after business operations

5. **Implement Repository Pattern**
   - Abstract data access behind interfaces
   - Make repositories easy to mock for testing

6. **Use DTOs for Data Transfer**
   - Don't expose domain entities to external systems
   - Transform at the boundaries

### ❌ DON'T

1. **Don't Let Domain Know About Outer Layers**
   - No imports from infrastructure or presentation in domain
   - No Angular decorators in domain models

2. **Don't Skip the Mapper Layer**
   - Always map between DTOs and domain models
   - Don't reuse the same model across layers

3. **Don't Put Business Logic in Components**
   - Components should only handle presentation
   - Business logic belongs in use cases and domain services

4. **Don't Bypass Use Cases**
   - Components should call use cases, not repositories directly
   - Even for simple operations

5. **Don't Over-Abstract**
   - Balance between clean architecture and pragmatism
   - Sometimes a simple approach is better

## Testing Approach

### Domain Layer Tests
```typescript
// Pure unit tests, no Angular dependencies
describe('PriceCalculationService', () => {
  let service: PriceCalculationService;

  beforeEach(() => {
    service = new PriceCalculationService(); // No Angular TestBed needed
  });

  it('should calculate price with tax', () => {
    const result = service.calculateTotal(100, 0.2);
    expect(result).toBe(120);
  });
});
```

### Use Case Tests
```typescript
// Mock repositories
describe('GetProductByIdUseCase', () => {
  let useCase: GetProductByIdUseCase;
  let mockRepository: jasmine.SpyObj<ProductRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('ProductRepository', ['getById']);
    useCase = new GetProductByIdUseCase(mockRepository);
  });

  it('should get product by id', (done) => {
    const mockProduct: Product = { id: '1', name: 'Test' };
    mockRepository.getById.and.returnValue(of(mockProduct));

    useCase.execute('1').subscribe(product => {
      expect(product).toEqual(mockProduct);
      done();
    });
  });
});
```

### Adapter Tests
```typescript
// Test that adapters correctly implement interfaces
describe('ProductAdapter', () => {
  let adapter: ProductAdapter;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    const apiService = new ProductApiService(httpClient);
    const mapper = new ProductMapper();
    adapter = new ProductAdapter(apiService, mapper);
  });

  // Test implementation details
});
```

### Component Integration Tests
```typescript
// Test that components integrate correctly with use cases
describe('ProductListPageComponent', () => {
  let component: ProductListPageComponent;
  let mockUseCase: jasmine.SpyObj<GetProductsUseCase>;

  beforeEach(() => {
    mockUseCase = jasmine.createSpyObj('GetProductsUseCase', ['execute']);
    component = new ProductListPageComponent(mockUseCase);
  });

  it('should load products on init', () => {
    const mockProducts: Product[] = [{ id: '1', name: 'Test' }];
    mockUseCase.execute.and.returnValue(of(mockProducts));

    component.ngOnInit();

    component.products$.subscribe(products => {
      expect(products).toEqual(mockProducts);
    });
  });
});
```

## Further Reading

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [The Clean Code Blog](https://blog.cleancoder.com/)
- [Clean Architecture in TypeScript](https://dev.to/angular/clean-architecture-in-angular-applications-3p9n)
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/)
- [SOLID Principles](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)

---

## License

MIT
