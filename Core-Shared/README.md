# Core-Shared Architecture in Angular

This project demonstrates the **Core-Shared Architecture** pattern in Angular, one of the most widely adopted organizational strategies that clearly separates singleton application-wide services (Core) from reusable UI components and utilities (Shared).

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
- [Common Pitfalls](#common-pitfalls)
- [Testing Approach](#testing-approach)
- [Further Reading](#further-reading)

## Architecture Overview

The Core-Shared Architecture organizes Angular applications into three primary areas:

1. **Core Module/Folder** - Singleton services, guards, interceptors loaded once
2. **Shared Module/Folder** - Reusable components, pipes, directives used across features
3. **Features** - Business logic organized by domain/feature

This pattern is the foundation for most Angular applications and is often combined with other architectural patterns.

### Visual Representation

```
┌──────────────────────────────────────────┐
│         Application Root                 │
└──────────────────────────────────────────┘
           │
           ├─── Core (Loaded Once - Singletons)
           │    ├─ Services
           │    ├─ Guards
           │    ├─ Interceptors
           │    └─ State
           │
           ├─── Shared (Imported Multiple Times)
           │    ├─ Components
           │    ├─ Pipes
           │    ├─ Directives
           │    └─ Utilities
           │
           └─── Features (Lazy Loaded)
                ├─ Products
                ├─ Orders
                └─ Auth
```

## Key Concepts

### 1. **Core Module/Folder**
Contains **singleton services** that should be instantiated only once for the entire application. These are typically global services like authentication, logging, and HTTP services.

**Key Rule**: Core should be imported **only once** in the root module/config.

### 2. **Shared Module/Folder**
Contains **reusable components, pipes, and directives** that will be used across multiple feature modules. These are stateless, presentational elements.

**Key Rule**: Shared can be imported **multiple times** by different feature modules.

### 3. **Feature Modules/Folders**
Encapsulate specific business functionality. Features can be lazy-loaded for better performance.

### 4. **Module vs Standalone**
This architecture works with both:
- **NgModules** - Traditional approach with `CoreModule` and `SharedModule`
- **Standalone Components** - Modern approach with `core/` and `shared/` folders

## When to Use This Architecture

✅ **Best suited for:**
- **Most Angular applications** - This is the de facto standard
- Small to medium-sized applications (10-100 components)
- Teams new to Angular (easy to understand)
- Applications with clear feature boundaries
- Projects with both global and reusable UI concerns
- Rapid application development

✅ **Ideal scenarios:**
- E-commerce applications
- Admin dashboards
- Content management systems
- Business applications

❌ **Consider alternatives when:**
- Building micro-frontends (use Module Federation instead)
- Extremely simple applications (single feature)
- Complex domain logic (consider Clean/Hexagonal Architecture)
- Large enterprise apps (consider combining with other patterns)

## Benefits & Drawbacks

### ✅ Benefits

| Benefit | Description |
|---------|-------------|
| **Simple & Intuitive** | Easy to understand and explain to new team members |
| **Clear Organization** | Obvious where to place new code |
| **Reusability** | Shared components reduce code duplication |
| **Singleton Services** | Core ensures services are created only once |
| **Angular Standard** | Widely adopted, lots of community resources |
| **Scalable** | Works well up to medium-large applications |
| **Lazy Loading Ready** | Features can be lazy-loaded easily |

### ❌ Drawbacks

| Drawback | Description |
|----------|-------------|
| **Shared Can Grow Large** | Without discipline, Shared becomes a dumping ground |
| **Unclear Boundaries** | Developers may be unsure: Core vs Shared vs Feature |
| **Tight Coupling Risk** | Features can become tightly coupled through Shared |
| **Not Enforced** | Relies on team discipline to maintain structure |
| **Circular Dependencies** | Possible if not careful with imports |

## Project Structure

```
src/
└── app/
    ├── app.config.ts            ← Standalone or root configuration
    ├── app.routes.ts            ← Root routing
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.scss
    │
    ├── core/                    ← SINGLETONS & GLOBAL SERVICES
    │   ├── interceptors/
    │   │   ├── auth.interceptor.ts
    │   │   ├── error.interceptor.ts
    │   │   ├── loading.interceptor.ts
    │   │   └── retry.interceptor.ts
    │   ├── guards/
    │   │   ├── auth.guard.ts
    │   │   ├── role.guard.ts
    │   │   └── unsaved-changes.guard.ts
    │   ├── services/
    │   │   ├── http.service.ts
    │   │   ├── storage.service.ts
    │   │   ├── auth.service.ts
    │   │   ├── logger.service.ts
    │   │   └── theme.service.ts
    │   ├── state/
    │   │   ├── user-store.service.ts
    │   │   ├── app-store.service.ts
    │   │   └── notification-store.service.ts
    │   ├── utils/
    │   │   ├── form.helper.ts
    │   │   ├── date.helper.ts
    │   │   ├── validation.helper.ts
    │   │   └── crypto.helper.ts
    │   ├── config/
    │   │   ├── app.config.ts
    │   │   └── api.config.ts
    │   └── core.module.ts (if non-standalone)
    │
    ├── shared/                  ← REUSABLE FOR WHOLE APP
    │   ├── components/
    │   │   ├── button/
    │   │   │   ├── button.component.ts
    │   │   │   ├── button.component.html
    │   │   │   └── button.component.scss
    │   │   ├── modal/
    │   │   │   ├── modal.component.ts
    │   │   │   ├── modal.component.html
    │   │   │   └── modal.component.scss
    │   │   ├── card/
    │   │   ├── table/
    │   │   ├── pagination/
    │   │   ├── loader/
    │   │   └── breadcrumb/
    │   ├── directives/
    │   │   ├── click-outside.directive.ts
    │   │   ├── lazy-load.directive.ts
    │   │   ├── tooltip.directive.ts
    │   │   └── auto-focus.directive.ts
    │   ├── pipes/
    │   │   ├── date-format.pipe.ts
    │   │   ├── currency-format.pipe.ts
    │   │   ├── truncate.pipe.ts
    │   │   ├── safe-html.pipe.ts
    │   │   └── filter.pipe.ts
    │   ├── models/
    │   │   ├── user.model.ts
    │   │   ├── base-entity.model.ts
    │   │   ├── pagination.model.ts
    │   │   └── api-response.model.ts
    │   ├── utils/
    │   │   ├── array.utils.ts
    │   │   ├── string.utils.ts
    │   │   └── object.utils.ts
    │   ├── validators/
    │   │   ├── custom-validators.ts
    │   │   └── async-validators.ts
    │   └── shared.module.ts (if non-standalone)
    │
    ├── features/               ← Feature modules or standalone pages
    │   ├── auth/
    │   │   ├── login/
    │   │   │   ├── login.component.ts
    │   │   │   ├── login.component.html
    │   │   │   └── login.component.scss
    │   │   ├── register/
    │   │   │   └── register.component.ts
    │   │   ├── forgot-password/
    │   │   │   └── forgot-password.component.ts
    │   │   ├── auth.routes.ts
    │   │   ├── auth.service.ts
    │   │   └── auth.model.ts
    │   │
    │   ├── products/
    │   │   ├── list/
    │   │   ├── details/
    │   │   ├── create/
    │   │   ├── edit/
    │   │   ├── products.routes.ts
    │   │   ├── products.service.ts
    │   │   └── products.model.ts
    │   │
    │   ├── dashboard/
    │   │   ├── dashboard.component.ts
    │   │   ├── dashboard.component.html
    │   │   ├── dashboard.component.scss
    │   │   ├── dashboard.routes.ts
    │   │   └── dashboard.service.ts
    │   │
    │   └── orders/
    │       ├── order-list/
    │       ├── order-details/
    │       ├── orders.routes.ts
    │       └── orders.service.ts
    │
    ├── layout/
    │   ├── header/
    │   │   ├── header.component.ts
    │   │   ├── header.component.html
    │   │   └── header.component.scss
    │   ├── sidebar/
    │   │   ├── sidebar.component.ts
    │   │   ├── sidebar.component.html
    │   │   └── sidebar.component.scss
    │   └── footer/
    │       ├── footer.component.ts
    │       ├── footer.component.html
    │       └── footer.component.scss
    │
    ├── assets/
    │   ├── images/
    │   ├── icons/
    │   ├── fonts/
    │   └── i18n/
    │
    └── environments/
        ├── environment.ts
        ├── environment.staging.ts
        └── environment.prod.ts
```

## Layer Responsibilities

### 🎯 Core

**What goes in Core?**
- Services that should be **singletons** (only one instance)
- Global application state
- HTTP interceptors
- Route guards
- Global error handlers
- Authentication/Authorization services
- Logging services
- Configuration services

**What does NOT go in Core?**
- UI components
- Pipes or directives
- Feature-specific services
- Anything that needs multiple instances

### 🔧 Shared

**What goes in Shared?**
- **Dumb/Presentational components** (button, card, modal, etc.)
- Reusable pipes (date, currency, truncate, etc.)
- Reusable directives (tooltip, lazy-load, etc.)
- Common models/interfaces used across features
- Utility functions used across features
- Validators used by multiple features

**What does NOT go in Shared?**
- Services (these go in Core or Features)
- Feature-specific components
- Business logic
- State management

### 🎨 Features

**What goes in Features?**
- Feature-specific components
- Feature-specific services (API calls for that feature)
- Feature-specific models
- Feature routing
- Feature state (if using state management)
- Business logic specific to the feature

**Characteristics:**
- Should be **lazy-loadable**
- Should import from Shared (for UI components)
- Should inject from Core (for global services)
- Should be independent of other features

## Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** 8.x or higher
- **Angular CLI** 17.x or higher
- Basic understanding of:
  - TypeScript
  - Angular fundamentals
  - Dependency injection
  - Angular modules (if using NgModules)

### Installation

```bash
# Navigate to project directory
cd "d:\Angular Architecture\Core-Shared"

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
# The application will automatically reload when you change source files
```

### Running Tests

```bash
# Unit tests
npm test

# Unit tests with coverage
npm test -- --code-coverage

# E2E tests
npm run e2e
```

### Building

```bash
# Production build
npm run build

# Build with specific environment
ng build --configuration staging
ng build --configuration production
```

## Code Examples

### Example 1: Core Service (Singleton)

```typescript
// core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'  // Singleton
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  login(username: string, password: string): Observable<User> {
    // Login logic
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
```

### Example 2: HTTP Interceptor (Core)

```typescript
// core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  return next(req);
};
```

### Example 3: Shared Component (Reusable Button)

```typescript
// shared/components/button/button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button 
      [type]="type"
      [disabled]="disabled"
      [class]="'btn btn-' + variant"
      (click)="handleClick()">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  handleClick(): void {
    this.clicked.emit();
  }
}
```

### Example 4: Shared Pipe

```typescript
// shared/pipes/truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, trail: string = '...'): string {
    if (!value) return '';
    return value.length > limit 
      ? value.substring(0, limit) + trail 
      : value;
  }
}
```

### Example 5: Feature Component Using Shared & Core

```typescript
// features/products/list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service'; // Feature service
import { LoggerService } from '../../../core/services/logger.service'; // Core service
import { ButtonComponent } from '../../../shared/components/button/button.component'; // Shared component
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe'; // Shared pipe

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ButtonComponent, TruncatePipe],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products$ = this.productsService.getAll();

  constructor(
    private productsService: ProductsService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.logger.info('Product list loaded');
  }

  onProductClick(id: string): void {
    this.logger.debug(`Product ${id} clicked`);
  }
}
```

### Example 6: App Configuration (Standalone)

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    // Core services are provided in 'root' via @Injectable
  ]
};
```

## Best Practices

### ✅ DO

1. **Keep Core Lean**
   - Only truly global, singleton services
   - Review periodically and move feature-specific code to features

2. **Make Shared Components Dumb**
   - No business logic
   - Only `@Input()` and `@Output()`
   - No service dependencies (except maybe utility services)

3. **Use `providedIn: 'root'` for Core Services**
   ```typescript
   @Injectable({ providedIn: 'root' })
   ```
   This ensures singleton behavior

4. **Organize Shared by Type**
   - `/components`, `/pipes`, `/directives`
   - Makes it easy to find things

5. **Import Shared in Features**
   - Features should import shared components as needed
   - Use standalone or SharedModule

6. **Lazy Load Features**
   ```typescript
   {
     path: 'products',
     loadChildren: () => import('./features/products/products.routes')
   }
   ```

### ❌ DON'T

1. **Don't Import Core Multiple Times**
   - Core should only be imported/initialized once
   - For NgModules, add a guard:
   ```typescript
   constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
     if (parentModule) {
       throw new Error('CoreModule is already loaded.');
     }
   }
   ```

2. **Don't Put Services in Shared**
   - Services belong in Core (global) or Features (feature-specific)
   - Exception: Pure utility services with no state

3. **Don't Let Shared Depend on Features**
   - Shared is lower-level than Features
   - Dependencies: Features → Shared, never the reverse

4. **Don't Make Shared Components Smart**
   - Avoid injecting services
   - Avoid complex business logic

5. **Don't Create Circular Dependencies**
   ```
   ❌ Core → Shared → Core  (BAD)
   ✅ Feature → Shared, Feature → Core  (GOOD)
   ```

## Common Pitfalls

### 1. **Shared Module Bloat**
**Problem**: Shared becomes a dumping ground for everything.

**Solution**:
- Be strict about what goes in Shared
- Create multiple shared modules if needed (`SharedUiModule`, `SharedUtilsModule`)
- Regularly refactor and move feature-specific code out

### 2. **Incorrect Service Placement**
**Problem**: Services in the wrong place break singleton pattern or create tight coupling.

**Solution**:
- Global services → Core
- Feature services → Feature folder
- Pure utilities → Shared (rarely)

### 3. **Feature Coupling via Shared**
**Problem**: Features become coupled because they use the same Shared components with specific assumptions.

**Solution**:
- Keep Shared components generic
- Use `@Input()` to configure behavior
- Don't hardcode feature-specific logic

### 4. **Import Confusion**
**Problem**: Developers unsure what to import where.

**Solution**:
- Document your rules clearly
- Code review to enforce patterns
- Use linting rules (e.g., `nx` enforce module boundaries)

## Testing Approach

### Testing Core Services

```typescript
// auth.service.spec.ts
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created as singleton', () => {
    const service2 = TestBed.inject(AuthService);
    expect(service).toBe(service2); // Same instance
  });

  it('should authenticate user', () => {
    // Test authentication logic
  });
});
```

### Testing Shared Components

```typescript
// button.component.spec.ts
describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonComponent] // Standalone
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should emit clicked event', () => {
    spyOn(component.clicked, 'emit');
    component.handleClick();
    expect(component.clicked.emit).toHaveBeenCalled();
  });
});
```

### Testing Feature Components

```typescript
// product-list.component.spec.ts
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let mockProductsService: jasmine.SpyObj<ProductsService>;
  let mockLogger: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    mockProductsService = jasmine.createSpyObj('ProductsService', ['getAll']);
    mockLogger = jasmine.createSpyObj('LoggerService', ['info', 'debug']);

    TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: LoggerService, useValue: mockLogger }
      ]
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should load products on init', () => {
    mockProductsService.getAll.and.returnValue(of([]));
    component.ngOnInit();
    expect(mockLogger.info).toHaveBeenCalledWith('Product list loaded');
  });
});
```

## Further Reading

- [Angular Style Guide - Application Structure](https://angular.dev/style-guide#application-structure)
- [Angular Architecture Patterns](https://angular.io/guide/architecture)
- [NgModules](https://angular.dev/guide/ngmodules)
- [Standalone Components](https://angular.dev/guide/components)
- [Dependency Injection in Angular](https://angular.dev/guide/di)

---

## License

MIT