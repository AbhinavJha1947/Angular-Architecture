# Smart-Dumb (Container-Presentational) Architecture

This project demonstrates the **Smart-Dumb** (also known as **Container-Presentational**) architecture pattern in Angular, separating components by responsibility into those that manage logic and state (Smart) and those that handle pure presentation (Dumb).

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Key Concepts](#key-concepts)
- [When to Use This Architecture](#when-to-use-this-architecture)
- [Benefits & Drawbacks](#benefits--drawbacks)
- [Project Structure](#project-structure)
- [Component Responsibilities](#component-responsibilities)
- [Getting Started](#getting-started)
- [Code Examples](#code-examples)
- [Best Practices](#best-practices)
- [Common Mistakes](#common-mistakes)
- [Testing Approach](#testing-approach)
- [Further Reading](#further-reading)

## Architecture Overview

The Smart-Dumb pattern divides components into two distinct categories:

- **Smart Components (Containers)** - Handle business logic, state management, and data fetching
- **Dumb Components (Presentational)** - Focus purely on displaying UI and emitting user interactions

This separation of concerns leads to more maintainable, testable, and reusable code.

### Visual Representation

```
┌─────────────────────────────────────────────┐
│      Smart Component (Container)            │
│  - Fetches data from services               │
│  - Manages local state                      │
│  - Handles business logic                   │
│  - Subscribes to observables                │
└───────────────┬─────────────────────────────┘
                │ Data flows down via @Input
                │
                ▼
┌─────────────────────────────────────────────┐
│      Dumb Component (Presentational)        │
│  - Pure presentation logic                  │
│  - No service dependencies                  │
│  - Receives data via @Input                 │
│  - Emits events via @Output                 │
└───────────────┬─────────────────────────────┘
                │ Events flow up via @Output
                │
                ▼
┌─────────────────────────────────────────────┐
│      Smart Component (Container)            │
│  - Handles emitted events                   │
│  - Updates state or calls services          │
└─────────────────────────────────────────────┘
```

## Key Concepts

### 1. **Smart Components (Containers)**
- Located in `containers/` folders
- Manage application state
- Interact with services and APIs
- Handle routing
- Subscribe to observables
- Pass data down to dumb components
- React to events from dumb components

### 2. **Dumb Components (Presentational)**
- Located in `components/` folders
- Pure UI rendering
- No business logic
- No service injection (except utility services)
- Configurable via `@Input()` properties
- Communicate via `@Output()` events
- Highly reusable across features

### 3. **Data Flow**
- **Downward**: Smart → Dumb via `@Input()`
- **Upward**: Dumb → Smart via `@Output()`
- Unidirectional and predictable

### 4. **Reusability**
Dumb components can be reused across different features because they have no dependencies on specific business logic.

## When to Use This Architecture

✅ **Best suited for:**
- **All Angular applications** - This pattern is universally applicable
- Projects of any size (small to large)
- Teams wanting clear component responsibilities
- Applications requiring reusable UI components
- Projects with multiple developers (clear boundaries)
- When testing is a priority (dumb components are easy to test)

✅ **Ideal scenarios:**
- Dashboard applications with reusable widgets
- E-commerce sites with product cards, filters, etc.
- Admin panels with data tables and forms
- Any application with repeated UI patterns

❌ **Less beneficial when:**
- Building entirely unique, one-off components
- Very small apps with minimal component reuse
- Prototyping where speed trumps architecture

## Benefits & Drawbacks

### ✅ Benefits

| Benefit | Description |
|---------|-------------|
| **Reusability** | Dumb components can be used across features |
| **Testability** | Dumb components are easy to unit test (no dependencies) |
| **Maintainability** | Clear separation makes code easier to understand |
| **Predictability** | Data flows in one direction |
| **Team Collaboration** | Clear boundaries for different developers |
| **Performance** | Dumb components can use OnPush change detection |
| **Simple to Learn** | Easy pattern for new Angular developers |

### ❌ Drawbacks

| Drawback | Description |
|----------|-------------|
| **Boilerplate** | More `@Input()` and `@Output()` declarations |
| **Prop Drilling** | Passing data through multiple levels |
| **Verbosity** | More files and component communication code |
| **Over-Engineering** | Can be overkill for very simple UIs |

## Project Structure

```
src/
└── app/
    ├── core/
    │   ├── guards/
    │   ├── interceptors/
    │   └── services/
    │
    ├── shared/
    │   ├── components/
    │   ├── pipes/
    │   └── directives/
    │
    ├── features/
    │   ├── products/
    │   │   ├── containers/              ← Smart Components (logic + state)
    │   │   │   ├── product-page/
    │   │   │   │   ├── product-page.component.ts
    │   │   │   │   ├── product-page.component.html
    │   │   │   │   ├── product-page.component.scss
    │   │   │   │   ├── product-page.component.spec.ts
    │   │   │   │   └── product-page.facade.ts   ← Optional (for clean logic)
    │   │   │   ├── product-edit-page/
    │   │   │   │   ├── product-edit-page.component.ts
    │   │   │   │   ├── product-edit-page.component.html
    │   │   │   │   └── product-edit-page.component.scss
    │   │   │   └── product-list-page/
    │   │   │       ├── product-list-page.component.ts
    │   │   │       ├── product-list-page.component.html
    │   │   │       └── product-list-page.component.scss
    │   │   │
    │   │   ├── components/              ← Dumb Components (UI only)
    │   │   │   ├── product-card/
    │   │   │   │   ├── product-card.component.ts
    │   │   │   │   ├── product-card.component.html
    │   │   │   │   ├── product-card.component.scss
    │   │   │   │   └── product-card.component.spec.ts
    │   │   │   ├── product-list/
    │   │   │   │   ├── product-list.component.ts
    │   │   │   │   ├── product-list.component.html
    │   │   │   │   └── product-list.component.scss
    │   │   │   ├── product-filter/
    │   │   │   │   ├── product-filter.component.ts
    │   │   │   │   ├── product-filter.component.html
    │   │   │   │   └── product-filter.component.scss
    │   │   │   ├── product-form/
    │   │   │   │   ├── product-form.component.ts
    │   │   │   │   ├── product-form.component.html
    │   │   │   │   └── product-form.component.scss
    │   │   │   └── product-details/
    │   │   │       ├── product-details.component.ts
    │   │   │       ├── product-details.component.html
    │   │   │       └── product-details.component.scss
    │   │   │
    │   │   ├── services/
    │   │   │   ├── products.service.ts
    │   │   │   └── product-validator.service.ts
    │   │   ├── models/
    │   │   │   ├── product.model.ts
    │   │   │   └── product-filter.model.ts
    │   │   ├── utils/
    │   │   │   └── product.helpers.ts
    │   │   └── products.routes.ts
    │   │
    │   └── orders/
    │       ├── containers/
    │       │   ├── order-list-page/
    │       │   └── order-details-page/
    │       ├── components/
    │       │   ├── order-card/
    │       │   ├── order-status/
    │       │   └── order-timeline/
    │       ├── services/
    │       │   └── orders.service.ts
    │       └── models/
    │           └── order.model.ts
    │
    ├── layout/
    │   ├── header/
    │   ├── sidebar/
    │   └── footer/
    │
    ├── assets/
    └── environments/
```

## Component Responsibilities

### 💡 Smart Components (Containers)

**Responsibilities:**
- Manage component state
- Fetch data from services or store
- Handle routing and navigation
- React to user events (from dumb components)
- Orchestrate business logic
- Subscribe to observables
- Inject services

**Naming Convention:**
```
product-page.component.ts
product-list-page.component.ts
product-edit-page.component.ts
```

**Example:**
```typescript
@Component({
  selector: 'app-product-list-page',
  template: `
    <app-product-filter 
      [filters]="filters"
      (filterChanged)="onFilterChanged($event)">
    </app-product-filter>
    
    <app-product-list
      [products]="products$ | async"
      [loading]="loading$ | async"
      (productSelected)="onProductSelected($event)">
    </app-product-list>
  `
})
export class ProductListPageComponent {
  products$ = this.productsService.getAll();
  loading$ = this.productsService.loading$;
  filters = {};

  constructor(private productsService: ProductsService) {}

  onFilterChanged(filters: any): void {
    this.products$ = this.productsService.getFiltered(filters);
  }

  onProductSelected(id: string): void {
    this.router.navigate(['/products', id]);
  }
}
```

### 🎨 Dumb Components (Presentational)

**Responsibilities:**
- Render UI based on inputs
- Emit events based on user interactions
- No business logic
- No service dependencies (except maybe utility services)
- Use OnPush change detection for performance

**Naming Convention:**
```
product-card.component.ts
product-list.component.ts
product-filter.component.ts
```

**Example:**
```typescript
@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product-card" (click)="handleClick()">
      <img [src]="product.image" [alt]="product.name">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
      <button (click)="addToCart.emit(); $event.stopPropagation()">
        Add to Cart
      </button>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() productClicked = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<void>();

  handleClick(): void {
    this.productClicked.emit(this.product.id);
  }
}
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Angular CLI 17.x or higher

### Installation

```bash
cd "d:\Angular Architecture\Smart Dumb"
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

### Example 1: Complete Smart Component

```typescript
// containers/product-list-page/product-list-page.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { ProductFilter } from '../../models/product-filter.model';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  loading = false;
  filters: ProductFilter = {};
  private destroy$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts(): void {
    this.loading = true;
    this.productsService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          this.products = products;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  onFilterChanged(filters: ProductFilter): void {
    this.filters = filters;
    this.loading = true;
    this.productsService
      .getFiltered(filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          this.products = products;
          this.loading = false;
        }
      });
  }

  onProductSelected(id: string): void {
    this.router.navigate(['/products', id]);
  }

  onProductDeleted(id: string): void {
    if (confirm('Delete this product?')) {
      this.productsService.delete(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
```

```html
<!-- containers/product-list-page/product-list-page.component.html -->
<div class="product-list-page">
  <h1>Products</h1>
  
  <app-product-filter
    [filters]="filters"
    (filterChanged)="onFilterChanged($event)">
  </app-product-filter>
  
  <app-product-list
    [products]="products"
    [loading]="loading"
    (productSelected)="onProductSelected($event)"
    (productDeleted)="onProductDeleted($event)">
  </app-product-list>
</div>
```

### Example 2: Complete Dumb Component

```typescript
// components/product-list/product-list.component.ts
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush  // Performance optimization
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() loading = false;
  @Output() productSelected = new EventEmitter<string>();
  @Output() productDeleted = new EventEmitter<string>();

  onProductClick(id: string): void {
    this.productSelected.emit(id);
  }

  onDeleteClick(id: string, event: Event): void {
    event.stopPropagation();
    this.productDeleted.emit(id);
  }

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }
}
```

``` html
<!-- components/product-list/product-list.component.html -->
<div class="product-list">
  <div *ngIf="loading" class="loading">Loading products...</div>
  
  <div class="empty-state" *ngIf="!loading && products.length === 0">
    No products found
  </div>
  
  <div class="product-grid">
    <app-product-card
      *ngFor="let product of products; trackBy: trackByProductId"
      [product]="product"
      (productClicked)="onProductClick($event)"
      (deleteClicked)="onDeleteClick($event, $event)">
    </app-product-card>
  </div>
</div>
```

### Example 3: Dumb Component with OnPush

```typescript
// components/product-card/product-card.component.ts
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showActions = true;
  @Output() productClicked = new EventEmitter<string>();
  @Output() deleteClicked = new EventEmitter<string>();

  onClick(): void {
    this.productClicked.emit(this.product.id);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.deleteClicked.emit(this.product.id);
  }
}
```

### Example 4: Form Handling

```typescript
// components/product-form/product-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit {
  @Input() product?: Product;
  @Input() loading = false;
  @Output() formSubmitted = new EventEmitter<Partial<Product>>();
  @Output() formCancelled = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.product?.name || '', Validators.required],
      price: [this.product?.price || 0, [Validators.required, Validators.min(0)]],
      description: [this.product?.description || '']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }

  onCancel(): void {
    this.formCancelled.emit();
  }
}
```

## Best Practices

### ✅ DO

1. **Use ChangeDetection.OnPush for Dumb Components**
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

2. **Keep Dumb Components Pure**
   ```typescript
   // ✅ Good - no dependencies
   @Component({ selector: 'app-product-card' })
   export class ProductCardComponent {
     @Input() product!: Product;
     @Output() clicked = new EventEmitter<string>();
   }
   ```

3. **Name Components Clearly**
   - Smart: `ProductListPageComponent`, `ProductEditPageComponent`
   - Dumb: `ProductCardComponent`, `ProductFilterComponent`

4. **Use TrackBy Functions**
   ```typescript
   trackByProductId(index: number, product: Product): string {
     return product.id;
   }
   ```

5. **Emit Primitive Values**
   ```typescript
   // ✅ Good - emit primitive
   @Output() productSelected = new EventEmitter<string>();  // ID
   
   // ❌ Bad - emit complex object
   @Output() productSelected = new EventEmitter<Product>();
   ```

6. **Test Dumb Components in Isolation**
   ```typescript
   it('should emit event when clicked', () => {
     spyOn(component.productClicked, 'emit');
     component.onClick();
     expect(component.productClicked.emit).toHaveBeenCalledWith('product-1');
   });
   ```

### ❌ DON'T

1. **Don't Inject Services in Dumb Components**
   ```typescript
   // ❌ Bad - service in dumb component
   export class ProductCardComponent {
     constructor(private productsService: ProductsService) {}
   }
   ```

2. **Don't Put Business Logic in Dumb Components**
   ```typescript
   // ❌ Bad - business logic
   calculateDiscount(product: Product): number {
     return product.price * 0.1;
   }
   
   // ✅ Good - pass computed value
   @Input() discountedPrice!: number;
   ```

3. **Don't Subscribe in Dumb Components**
   ```typescript
   // ❌ Bad - subscription
   ngOnInit(): void {
     this.service.getData().subscribe(/*...*/);
   }
   ```

4. **Don't Use Router in Dumb Components**
   ```typescript
   // ❌ Bad
   onClick(): void {
     this.router.navigate(['/products', this.product.id]);
   }
   
   // ✅ Good
   onClick(): void {
     this.productClicked.emit(this.product.id);
   }
   ```

## Common Mistakes

### 1. **Mixing Concerns**
```typescript
// ❌ Bad - smart component doing UI
@Component({
  template: `
    <div class="product-card">
      <h3>{{ product.name }}</h3>
      <!-- Lots of HTML -->
    </div>
  `
})
export class ProductListPageComponent { }

// ✅ Good - delegate to dumb component
@Component({
  template: `<app-product-list [products]="products$ | async"></app-product-list>`
})
export class ProductListPageComponent { }
```

### 2. **Prop Drilling Too Deep**
```typescript
// ❌ Bad - passing through many levels
Page → List → Item → Button → Icon

// ✅ Better - flatten hierarchy or use services for global state
```

### 3. **Making Everything Dumb**
```typescript
// ❌ Bad - no smart component to orchestrate
Every component is dumb, no one manages state

// ✅ Good - have at least one smart component per feature
```

## Testing Approach

### Testing Dumb Components

```typescript
describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCardComponent]
    });
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
  });

  it('should display product name', () => {
    component.product = { id: '1', name: 'Test Product', price: 100 };
    fixture.detectChanges();
    
    const nameElement = fixture.nativeElement.querySelector('h3');
    expect(nameElement.textContent).toBe('Test Product');
  });

  it('should emit productClicked when clicked', () => {
    spyOn(component.productClicked, 'emit');
    component.product = { id: '1', name: 'Test', price: 100 };
    
    component.onClick();
    
    expect(component.productClicked.emit).toHaveBeenCalledWith('1');
  });
});
```

### Testing Smart Components

```typescript
describe('ProductListPageComponent', () => {
  let component: ProductListPageComponent;
  let mockProductsService: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    mockProductsService = jasmine.createSpyObj('ProductsService', ['getAll', 'delete']);
    
    TestBed.configureTestingModule({
      declarations: [ProductListPageComponent],
      providers: [
        { provide: ProductsService, useValue: mockProductsService }
      ]
    });

    component = TestBed.createComponent(ProductListPageComponent).componentInstance;
  });

  it('should load products on init', () => {
    const mockProducts = [{ id: '1', name: 'Test' }];
    mockProductsService.getAll.and.returnValue(of(mockProducts));
    
    component.ngOnInit();
    
    expect(component.products).toEqual(mockProducts);
  });

  it('should handle product selection', () => {
    spyOn(component['router'], 'navigate');
    
    component.onProductSelected('product-1');
    
    expect(component['router'].navigate).toHaveBeenCalledWith(['/products', 'product-1']);
  });
});
```

## Further Reading

- [Presentational and Container Components by Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [Angular Component Patterns](https://angular.dev/guide/components)
- [Change Detection OnPush](https://angular.dev/guide/components/advanced)
- [Angular Best Practices](https://angular.dev/style-guide)

---

## License

MIT