# Angular Facade Architecture

This project demonstrates the **Facade Pattern** in Angular, providing a simplified interface to complex state management systems and abstracting implementation details from components.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Key Concepts](#key-concepts)
- [When to Use This Architecture](#when-to-use-this-architecture)
- [Benefits & Drawbacks](#benefits--drawbacks)
- [Project Structure](#project-structure)
- [Facade Pattern Deep Dive](#facade-pattern-deep-dive)
- [Getting Started](#getting-started)
- [Code Examples](#code-examples)
- [Best Practices](#best-practices)
- [Testing Approach](#testing-approach)
- [Further Reading](#further-reading)

## Architecture Overview

The Facade Pattern provides a **unified, simplified API** that hides complex subsystems. In Angular applications, Facades sit between components and state management (NgRx, Signals, Services), offering several benefits:

1. **Abstraction** - Components don't need to know about Actions, Reducers, or Selectors
2. **Simplified API** - One service with clear methods instead of dispatching actions
3. **Flexibility** - Swap state management libraries without changing components
4. **Testability** - Easy to mock the Facade in tests

### Visual Representation

```
┌─────────────────────────────────────────────┐
│          Components (View Layer)            │
│   - ProductListComponent                    │
│   - ProductDetailsComponent                 │
└──────────────────┬──────────────────────────┘
                   │ Simple API calls
                   │ (facade.loadProducts())
                   ▼
┌─────────────────────────────────────────────┐
│        Facade (Abstraction Layer)           │
│   - products$: Observable<Product[]>        │
│   - loadProducts(): void                    │
│   - createProduct(product): void            │
└──────────────────┬──────────────────────────┘
                   │ Complex state management
                   ▼
┌─────────────────────────────────────────────┐
│      State Management (NgRx/Signals)        │
│   - Store / Signal Store                    │
│   - Actions, Reducers, Effects              │
│   - Selectors                               │
└─────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│        Services (Data Layer)                │
│   - HTTP Services, API Calls                │
└─────────────────────────────────────────────┘
```

**Without Facade:**
```typescript
// Component knows about NgRx internals
this.store.dispatch(ProductsActions.loadProducts());
this.products$ = this.store.select(selectAllProducts);
```

**With Facade:**
```typescript
// Component uses simple API
this.facade.loadProducts();
this.products$ = this.facade.products$;
```

## Key Concepts

### 1. **The Facade Pattern**
A structural design pattern that provides a simplified interface to a complex subsystem. The Facade doesn't hide the subsystem but provides an easier way to access it.

### 2. **Separation of Concerns**
- **Components** - Focus on presentation
- **Facade** - Orchestrates state operations
- **State Management** - Handles data flow
- **Services** - Manages API calls

### 3. **Observable Streams**
Facades expose Observable streams that components can subscribe to, maintaining reactive data flow.

### 4. **Command Methods**
Facades provide command methods (e.g., `loadProducts()`, `updateProduct()`) that trigger state changes.

## When to Use This Architecture

✅ **Best suited for:**
- Applications using complex state management (NgRx, Akita, NGXS)
- Teams with mixed experience levels (Facade simplifies for junior devs)
- Large applications with multiple features needing consistent patterns
- Projects requiring flexibility to swap state management solutions
- Applications with complex business logic
- When you want to hide implementation details from components

✅ **Ideal scenarios:**
- E-commerce platforms with complex product/cart state
- Enterprise dashboards with multiple data sources
- Applications with real-time data synchronization
- Projects with strict testing requirements

❌ **Avoid when:**
- Building simple CRUD apps (overhead not justified)
- Using only local component state
- Team is unfamiliar with reactive programming
- Rapid prototyping where architecture may change frequently

## Benefits & Drawbacks

### ✅ Benefits

| Benefit | Description |
|---------|-------------|
| **Simplified Component Code** | Components don't need to know about Actions, Reducers, Effects |
| **Consistent API** | All features use the same pattern |
| **Easy to Test** | Mock the Facade instead of Store + Selectors + Actions |
| **Flexibility** | Swap NgRx for Signals without changing components |
| **Better Onboarding** | New developers use simple API, don't need NgRx expertise |
| **Encapsulation** | Hides complex state logic |
| **Reusability** | Facades can be reused across multiple components |

### ❌ Drawbacks

| Drawback | Description |
|----------|-------------|
| **Additional Layer** | More files and abstraction |
| **Memory Concerns** | Multiple subscriptions if not careful |
| **Learning Curve** | Team needs to understand when to use Facades |
| **Potential Duplication** | Facade methods might mirror store actions |
| **Over-Abstraction** | Can hide too much, making debugging harder |

## Project Structure

```
src/
└── app/
    ├── core/                  # Singleton services, guards, interceptors (loaded once)
    │   ├── guards/
    │   ├── interceptors/
    │   └── services/
    │
    ├── shared/                # Reusable components, pipes, directives (imported by features)
    │   ├── components/
    │   ├── pipes/
    │   └── directives/
    │
    ├── features/              # Feature modules
    │   ├── products/
    │   │   ├── products.routes.ts
    │   │   │
    │   │   ├── containers/    # Smart Components (interact with Facade)
    │   │   │   └── product-page/
    │   │   │       ├── product-page.component.ts
    │   │   │       ├── product-page.component.html
    │   │   │       └── product-page.component.scss
    │   │   │
    │   │   ├── components/    # Dumb Components (presentational only)
    │   │   │   ├── product-card/
    │   │   │   ├── product-list/
    │   │   │   └── product-filter/
    │   │   │
    │   │   ├── state/         # State Management
    │   │   │   ├── products.facade.ts      # ⭐ FACADE (main entry point for components)
    │   │   │   ├── products.store.ts       # State container (Signals/Store)
    │   │   │   ├── products.actions.ts     # NgRx Actions (optional)
    │   │   │   ├── products.reducer.ts     # NgRx Reducer (optional)
    │   │   │   ├── products.effects.ts     # NgRx Effects (optional)
    │   │   │   ├── products.selectors.ts   # NgRx Selectors (optional)
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── services/      # Data services (HTTP calls)
    │   │   │   ├── products.service.ts
    │   │   │   └── products-api.service.ts
    │   │   │
    │   │   ├── models/        # Interfaces and Types
    │   │   │   ├── product.model.ts
    │   │   │   └── product-filter.model.ts
    │   │   │
    │   │   └── utils/         # Helper functions and validators
    │   │       ├── product.helpers.ts
    │   │       └── product.validators.ts
    │   │
    │   └── orders/            # Another feature module
    │       ├── orders.routes.ts
    │       ├── containers/
    │       ├── components/
    │       ├── state/
    │       │   ├── orders.facade.ts
    │       │   └── orders.store.ts
    │       ├── services/
    │       └── models/
    │
    ├── layout/                # Layout components (shell)
    │   ├── header/
    │   ├── sidebar/
    │   └── footer/
    │
    ├── assets/                # Static assets (images, fonts)
    └── environments/          # Environment configuration
```

## Facade Pattern Deep Dive

### Anatomy of a Facade

A typical Facade service includes:

1. **Observable Streams** - Expose data (e.g., `products$`, `loading$`, `error$`)
2. **Command Methods** - Trigger operations (e.g., `loadProducts()`, `createProduct()`)
3. **Query Methods** - Get specific data (e.g., `getProductById()`)
4. **Computed Properties** - Derived state (e.g., `selectedProduct$`)

### Facade Responsibilities

✅ **What a Facade SHOULD do:**
- Expose Observable streams from the store
- Provide methods to dispatch actions
- Combine multiple selectors
- Handle complex queries
- Provide computed/derived state
- Orchestrate multiple stores if needed

❌ **What a Facade SHOULD NOT do:**
- Contain business logic (that goes in services/reducers)
- Make HTTP calls directly (delegate to services)
- Manipulate data (that's reducer's job)
- Have too many responsibilities

### Facade with Different State Solutions

#### Option 1: NgRx
```typescript
@Injectable()
export class ProductsFacade {
  products$ = this.store.select(selectAllProducts);
  
  loadProducts() {
    this.store.dispatch(ProductsActions.loadProducts());
  }
}
```

#### Option 2: Component Store (NgRx)
```typescript
@Injectable()
export class ProductsFacade extends ComponentStore<ProductsState> {
  readonly products$ = this.select(state => state.products);
  
  readonly loadProducts = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() => this.productsService.getAll())
    )
  );
}
```

#### Option 3: Signals (Angular 16+)
```typescript
@Injectable()
export class ProductsFacade {
  private store = inject(ProductsStore); // Signal store
  
  products = this.store.products;
  loading = this.store.loading;
  
  loadProducts() {
    this.store.loadProducts();
  }
}
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Angular CLI 17.x or higher
- Understanding of:
  - RxJS and Observables
  - Angular services and dependency injection
  - State management concepts (optional)

### Installation

```bash
cd "d:\Angular Architecture\Facade"
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

### Example 1: Complete Facade with NgRx

```typescript
// state/products.facade.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import * as ProductsActions from './products.actions';
import * as ProductsSelectors from './products.selectors';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  // Observable Streams (Data)
  products$: Observable<Product[]> = this.store.select(
    ProductsSelectors.selectAllProducts
  );
  
  loading$: Observable<boolean> = this.store.select(
    ProductsSelectors.selectProductsLoading
  );
  
  error$: Observable<string | null> = this.store.select(
    ProductsSelectors.selectProductsError
  );
  
  selectedProduct$: Observable<Product | null> = this.store.select(
    ProductsSelectors.selectSelectedProduct
  );

  constructor(private store: Store) {}

  // Command Methods (Actions)
  loadProducts(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  loadProduct(id: string): void {
    this.store.dispatch(ProductsActions.loadProduct({ id }));
  }

  createProduct(product: Product): void {
    this.store.dispatch(ProductsActions.createProduct({ product }));
  }

  updateProduct(id: string, changes: Partial<Product>): void {
    this.store.dispatch(ProductsActions.updateProduct({ id, changes }));
  }

  deleteProduct(id: string): void {
    this.store.dispatch(ProductsActions.deleteProduct({ id }));
  }

  selectProduct(id: string): void {
    this.store.dispatch(ProductsActions.selectProduct({ id }));
  }

  clearSelection(): void {
    this.store.dispatch(ProductsActions.clearSelection());
  }

  // Query Methods
  getProductById(id: string): Observable<Product | undefined> {
    return this.store.select(ProductsSelectors.selectProductById(id));
  }
}
```

### Example 2: Smart Component Using Facade

```typescript
// containers/product-page/product-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductsFacade } from '../../state/products.facade';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-page',
  template: `
    <div class="product-page">
      <h1>Products</h1>
      
      <!-- Loading indicator -->
      <app-loader *ngIf="loading$ | async"></app-loader>
      
      <!-- Error message -->
      <app-error *ngIf="error$ | async as error" [message]="error"></app-error>
      
      <!-- Product list -->
      <app-product-list
        [products]="products$ | async"
        (productSelected)="onProductSelected($event)"
        (productDeleted)="onProductDeleted($event)">
      </app-product-list>
      
      <!-- Selected product details -->
      <app-product-details
        *ngIf="selectedProduct$ | async as product"
        [product]="product"
        (productUpdated)="onProductUpdated($event)">
      </app-product-details>
    </div>
  `
})
export class ProductPageComponent implements OnInit {
  // Expose facade streams
  products$ = this.facade.products$;
  loading$ = this.facade.loading$;
  error$ = this.facade.error$;
  selectedProduct$ = this.facade.selectedProduct$;

  constructor(private facade: ProductsFacade) {}

  ngOnInit(): void {
    this.facade.loadProducts();
  }

  onProductSelected(id: string): void {
    this.facade.selectProduct(id);
  }

  onProductDeleted(id: string): void {
    this.facade.deleteProduct(id);
  }

  onProductUpdated(product: Product): void {
    this.facade.updateProduct(product.id, product);
  }
}
```

### Example 3: Facade with Signal Store

```typescript
// state/products.facade.ts (using Angular Signals)
import { Injectable, computed, signal } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedId: string | null;
}

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  // Private state
  private state = signal<ProductsState>({
    products: [],
    loading: false,
    error: null,
    selectedId: null
  });

  // Public signals (read-only)
  products = computed(() => this.state().products);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);
  selectedProduct = computed(() => {
    const id = this.state().selectedId;
    return this.state().products.find(p => p.id === id) ?? null;
  });

  constructor(private productsService: ProductsService) {}

  // Command methods
  async loadProducts(): Promise<void> {
    this.state.update(s => ({ ...s, loading: true, error: null }));
    
    try {
      const products = await this.productsService.getAll().toPromise();
      this.state.update(s => ({ ...s, products, loading: false }));
    } catch (error) {
      this.state.update(s => ({ 
        ...s, 
        loading: false, 
        error: 'Failed to load products' 
      }));
    }
  }

  selectProduct(id: string): void {
    this.state.update(s => ({ ...s, selectedId: id }));
  }

  clearSelection(): void {
    this.state.update(s => ({ ...s, selectedId: null }));
  }
}
```

### Example 4: Testing a Facade

```typescript
// products.facade.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ProductsFacade } from './products.facade';
import * as ProductsActions from './products.actions';
import { Product } from '../models/product.model';

describe('ProductsFacade', () => {
  let facade: ProductsFacade;
  let store: MockStore;
  const initialState = { products: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsFacade,
        provideMockStore({ initialState })
      ]
    });

    facade = TestBed.inject(ProductsFacade);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should dispatch loadProducts action', () => {
    facade.loadProducts();
    expect(store.dispatch).toHaveBeenCalledWith(
      ProductsActions.loadProducts()
    );
  });

  it('should dispatch createProduct action with product', () => {
    const product: Product = { id: '1', name: 'Test' };
    facade.createProduct(product);
    expect(store.dispatch).toHaveBeenCalledWith(
      ProductsActions.createProduct({ product })
    );
  });
});
```

### Example 5: Component Test with Mocked Facade

```typescript
// product-page.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductPageComponent } from './product-page.component';
import { ProductsFacade } from '../../state/products.facade';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let mockFacade: jasmine.SpyObj<ProductsFacade>;

  beforeEach(() => {
    mockFacade = jasmine.createSpyObj('ProductsFacade', [
      'loadProducts',
      'selectProduct',
      'deleteProduct'
    ]);
    
    // Mock observable properties
    mockFacade.products$ = of([]);
    mockFacade.loading$ = of(false);
    mockFacade.error$ = of(null);
    mockFacade.selectedProduct$ = of(null);

    TestBed.configureTestingModule({
      declarations: [ProductPageComponent],
      providers: [
        { provide: ProductsFacade, useValue: mockFacade }
      ]
    });

    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
  });

  it('should load products on init', () => {
    component.ngOnInit();
    expect(mockFacade.loadProducts).toHaveBeenCalled();
  });

  it('should select product when clicked', () => {
    component.onProductSelected('product-1');
    expect(mockFacade.selectProduct).toHaveBeenCalledWith('product-1');
  });
});
```

## Best Practices

### ✅ DO

1. **One Facade per Feature**
   - Each feature module should have its own Facade
   - Don't create god facades that handle everything

2. **Expose Observables, Not Values**
   ```typescript
   // ✅ Good
   products$: Observable<Product[]>
   
   // ❌ Bad
   getProducts(): Product[]
   ```

3. **Keep Facades Thin**
   - Facades should orchestrate, not implement
   - Business logic goes in services/reducers

4. **Name Methods Clearly**
   ```typescript
   loadProducts()      // Command
   createProduct()     // Command
   products$           // Observable stream
   selectedProduct$    // Observable stream
   ```

5. **Use Type Safety**
   ```typescript
   createProduct(product: Product): void {
     // TypeScript ensures correct type
   }
   ```

6. **Provide in Root (Usually)**
   ```typescript
   @Injectable({ providedIn: 'root' })
   ```

### ❌ DON'T

1. **Don't Put Business Logic in Facades**
   ```typescript
   // ❌ Bad - business logic in facade
   calculateTotal(items: CartItem[]): number {
     return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
   }
   
   // ✅ Good - delegate to service
   calculateTotal(items: CartItem[]): number {
     return this.cartService.calculateTotal(items);
   }
   ```

2. **Don't Make HTTP Calls in Facades**
   ```typescript
   // ❌ Bad
   loadProducts() {
     this.http.get('/api/products').subscribe(/* ... */);
   }
   
   // ✅ Good
   loadProducts() {
     this.store.dispatch(ProductsActions.loadProducts());
   }
   ```

3. **Don't Subscribe in Facades**
   ```typescript
   // ❌ Bad - creates memory leaks
   loadProducts() {
     this.products$.subscribe(products => {
       // Do something
     });
   }
   ```

4. **Don't Expose Store Directly**
   ```typescript
   // ❌ Bad - defeats the purpose
   constructor(public store: Store) {}
   ```

5. **Don't Create Circular Dependencies**
   - Facades should depend on Store/Services
   - Services should NOT depend on Facades

## Testing Approach

### Unit Testing Facades

```typescript
describe('ProductsFacade', () => {
  it('should expose correct selectors', (done) => {
    facade.products$.subscribe(products => {
      expect(products).toEqual(mockProducts);
      done();
    });
  });
});
```

### Integration Testing Components with Facades

```typescript
describe('ProductPageComponent Integration', () => {
  let facade: ProductsFacade;
  
  beforeEach(() => {
    facade = TestBed.inject(ProductsFacade);
  });

  it('should display products from facade', () => {
    const products = [{ id: '1', name: 'Test' }];
    facade.products$ = of(products);
    
    fixture.detectChanges();
    
    const productElements = fixture.nativeElement.querySelectorAll('.product');
    expect(productElements.length).toBe(1);
  });
});
```

## Further Reading

- [Facade Pattern - Gang of Four](https://refactoring.guru/design-patterns/facade)
- [NgRx Facade Pattern](https://ngrx.io/guide/store/recipes/facade)
- [Angular Architecture Best Practices](https://angular.dev/style-guide)
- [RxJS Best Practices](https://rxjs.dev/guide/overview)
- [Component Store](https://ngrx.io/guide/component-store)

---

## License

MIT