# Angular Reactive Architecture with NgRx

This project demonstrates a **Reactive Architecture** using NgRx for comprehensive state management, following the Redux pattern with Angular-specific optimizations.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Key Concepts](#key-concepts)
- [When to Use This Architecture](#when-to-use-this-architecture)
- [Benefits & Drawbacks](#benefits--drawbacks)
- [Project Structure](#project-structure)
- [NgRx Flow Explained](#ngrx-flow-explained)
- [Getting Started](#getting-started)
- [Code Examples](#code-examples)
- [Best Practices](#best-practices)
- [Testing Approach](#testing-approach)
- [Further Reading](#further-reading)

## Architecture Overview

Reactive Architecture with NgRx provides **predictable state management** using the Redux pattern. All application state is stored in a single immutable store, and changes are made through dispatched actions that flow through reducers.

### Core Principles

1. **Single Source of Truth** - All state in one centralized store
2. **State is Read-Only** - Only modified through actions
3. **Changes via Pure Functions** - Reducers are pure functions
4. **Unidirectional Data Flow** - Actions → Reducers → State → View

### Visual Flow

```
┌─────────────────────────────────────────────────────────┐
│                     Component (View)                     │
│  - Displays data from Store via Selectors               │
│  - Dispatches Actions on user interactions               │
└──────────────┬─────────────────────────┬─────────────────┘
               │                         │
               │ Dispatch Action         │ Select State
               ▼                         ▼
┌──────────────────────┐      ┌──────────────────────┐
│      Actions         │      │     Selectors        │
│  - User clicked      │      │  - Select products   │
│  - Data loaded       │      │  - Select loading    │
└──────────┬───────────┘      └──────────┬───────────┘
           │                             │
           │                             │
           ▼                             │
┌──────────────────────┐                 │
│     Reducer          │                 │
│  - Pure function     │                 │
│  - Returns new state │                 │
└──────────┬───────────┘                 │
           │                             │
           ▼                             │
┌──────────────────────────────────────┐ │
│          Store (State Tree)          │ │
│  {                                   │◄┘
│    products: [...],                  │
│    orders: [...],                    │
│    user: {...}                       │
│  }                                   │
└───────────┬──────────────────────────┘
            │
            │ Side Effect?
            ▼
┌──────────────────────┐
│      Effects         │
│  - API calls         │
│  - Dispatch new      │
│    actions           │
└──────────┬───────────┘
           │
           │ HTTP Request
           ▼
┌──────────────────────┐
│      Service         │
│  - HTTP calls        │
│  - Business logic    │
└──────────────────────┘
```

## Key Concepts

### 1. **Store**
The single source of truth that holds the entire application state tree.

```typescript
interface AppState {
  products: ProductsState;
  orders: OrdersState;
  user: UserState;
}
```

### 2. **Actions**
Describe unique events that happen in the application.

```typescript
export const loadProducts = createAction('[Products Page] Load Products');
export const loadProductsSuccess = createAction(
  '[Products API] Load Products Success',
  props<{ products: Product[] }>()
);
```

### 3. **Reducers**
Pure functions that take the current state and an action, and return a new state.

```typescript
const reducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products }))
);
```

### 4. **Selectors**
Pure functions that select slices of state from the store.

```typescript
export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state.products
);
```

### 5. **Effects**
Handle side effects (API calls, routing, etc.) and dispatch new actions.

```typescript
loadProducts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.loadProducts),
    switchMap(() =>
      this.productsService.getAll().pipe(
        map(products => ProductsActions.loadProductsSuccess({ products }))
      )
    )
  )
);
```

### 6. **Facade (Optional)**
Provides a simpler API that hides NgRx complexity from components.

## When to Use This Architecture

✅ **Best suited for:**
- **Complex applications** with significant state management needs
- **Large teams** needing predictable state patterns
- Applications requiring **time-travel debugging**
- **Enterprise applications** with strict testing requirements
- Projects needing **state persistence** and replay
- Applications with **complex async operations**
- Projects requiring **audit trails** of state changes

✅ **Ideal scenarios:**
- Admin dashboards with complex data flows
- Real-time applications (chat, collaboration tools)
- E-commerce platforms with cart, wishlist, and user state
- Financial applications requiring state history
- Applications with offline-first requirements

❌ **Avoid when:**
- Building simple CRUD applications (overhead not justified)
- Small projects with minimal state
- Rapid prototyping (too much boilerplate)
- Team unfamiliar with reactive programming and Redux
- Projects with very tight deadlines

## Benefits & Drawbacks

### ✅ Benefits

| Benefit | Description |
|---------|-------------|
| **Predictability** | Same inputs always produce same outputs |
| **Centralized State** | One place to look for all application state |
| **Time-Travel Debugging** | Step backward/forward through state changes |
| **DevTools** | Powerful debugging with Redux DevTools |
| **Testability** | Pure functions are easy to test |
| **Type Safety** | Full TypeScript support |
| **Scalability** | Proven pattern for large applications |
| **State Persistence** | Easy to save/restore state |
| **Undo/Redo** | Natural fit for undo/redo functionality |

### ❌ Drawbacks

| Drawback | Description |
|----------|-------------|
| **Boilerplate** | Lots of files (actions, reducers, effects, selectors) |
| **Learning Curve** | Steep for developers new to reactive programming |
| **Complexity** | Can be over-engineering for simple apps |
| **Initial Setup** | Takes time to set up properly |
| **Verbosity** | More code to achieve simple tasks |
| **Performance** | Can have overhead if not optimized properly |

## Project Structure

```
src/
└── app/
    ├── core/
    │   ├── guards/
    │   ├── interceptors/
    │   └── state/                 ← Global App State
    │       ├── app.actions.ts
    │       ├── app.reducer.ts
    │       ├── app.effects.ts
    │       ├── app.selectors.ts
    │       ├── app.state.ts
    │       └── index.ts
    │
    ├── shared/
    │   ├── components/
    │   ├── pipes/
    │   └── directives/
    │
    ├── features/
    │   ├── products/
    │   │   ├── products.routes.ts
    │   │   │
    │   │   ├── components/         ← Dumb Components
    │   │   │   ├── product-card/
    │   │   │   │   ├── product-card.component.ts
    │   │   │   │   ├── product-card.component.html
    │   │   │   │   └── product-card.component.scss
    │   │   │   ├── product-list/
    │   │   │   │   ├── product-list.component.ts
    │   │   │   │   ├── product-list.component.html
    │   │   │   │   └── product-list.component.scss
    │   │   │   ├── product-filter/
    │   │   │   └── product-form/
    │   │   │
    │   │   ├── containers/         ← Smart Components
    │   │   │   ├── product-page/
    │   │   │   │   ├── product-page.component.ts
    │   │   │   │   ├── product-page.component.html
    │   │   │   │   └── product-page.component.scss
    │   │   │   ├── product-list-page/
    │   │   │   └── product-details-page/
    │   │   │
    │   │   ├── services/
    │   │   │   ├── products.service.ts
    │   │   │   └── products-api.service.ts
    │   │   │
    │   │   ├── models/
    │   │   │   ├── product.model.ts
    │   │   │   └── product-state.model.ts
    │   │   │
    │   │   └── state/              ← Feature State (NgRx)
    │   │       ├── products.actions.ts
    │   │       ├── products.reducer.ts
    │   │       ├── products.effects.ts
    │   │       ├── products.selectors.ts
    │   │       ├── products.state.ts
    │   │       ├── products.facade.ts    ← Optional
    │   │       └── index.ts
    │   │
    │   └── orders/
    │       ├── orders.routes.ts
    │       ├── components/
    │       ├── containers/
    │       ├── services/
    │       │   └── orders.service.ts
    │       ├── models/
    │       │   └── order.model.ts
    │       └── state/
    │           ├── orders.actions.ts
    │           ├── orders.reducer.ts
    │           ├── orders.effects.ts
    │           ├── orders.selectors.ts
    │           ├── orders.state.ts
    │           └── index.ts
    │
    ├── layout/
    │   ├── header/
    │   ├── sidebar/
    │   └── footer/
    │
    ├── store/                     ← Root Store Configuration
    │   ├── index.ts
    │   └── root.reducer.ts
    │
    ├── assets/
    └── environments/
```

## NgRx Flow Explained

### Step-by-Step Example: Loading Products

#### 1. User Interaction
```typescript
// Component dispatches an action
ngOnInit() {
  this.store.dispatch(ProductsActions.loadProducts());
}
```

#### 2. Action Dispatched
```typescript
// products.actions.ts
export const loadProducts = createAction('[Products Page] Load Products');
```

#### 3. Effect Intercepts Action
```typescript
// products.effects.ts
loadProducts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.loadProducts),
    switchMap(() =>
      this.productsService.getAll().pipe(
        map(products => ProductsActions.loadProductsSuccess({ products })),
        catchError(error => of(ProductsActions.loadProductsFailure({ error })))
      )
    )
  )
);
```

#### 4. New Action Dispatched (Success)
```typescript
export const loadProductsSuccess = createAction(
  '[Products API] Load Products Success',
  props<{ products: Product[] }>()
);
```

#### 5. Reducer Updates State
```typescript
// products.reducer.ts
on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
  ...state,
  products,
  loading: false,
  error: null
}))
```

#### 6. Selector Retrieves Updated State
```typescript
// products.selectors.ts
export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state.products
);
```

#### 7. Component Receives Update
```typescript
// Component subscribes to selector
products$ = this.store.select(selectAllProducts);
```

#### 8. View Updates
```html
<app-product-list [products]="products$ | async"></app-product-list>
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Angular CLI 17.x or higher
- Understanding of:
  - RxJS and Observables
  - Redux pattern
  - TypeScript
  - Reactive programming

### Installation

```bash
cd "d:\Angular Architecture\Reactive Architecture"
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

### Redux DevTools

Install the [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) for Chrome or Firefox to inspect state changes in real-time.

## Code Examples

### Example 1: Define State Interface

```typescript
// state/products.state.ts
import { Product } from '../models/product.model';

export interface ProductsState {
  products: Product[];
  selectedProductId: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProductsState = {
  products: [],
  selectedProductId: null,
  loading: false,
  error: null
};
```

### Example 2: Create Actions

```typescript
// state/products.actions.ts
import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

// Load Products
export const loadProducts = createAction('[Products Page] Load Products');

export const loadProductsSuccess = createAction(
  '[Products API] Load Products Success',
  props<{ products: Product[] }>()
);

export const load ProductsFailure = createAction(
  '[Products API] Load Products Failure',
  props<{ error: string }>()
);

// Load Single Product
export const loadProduct = createAction(
  '[Product Details Page] Load Product',
  props<{ id: string }>()
);

export const loadProductSuccess = createAction(
  '[Products API] Load Product Success',
  props<{ product: Product }>()
);

// Create Product
export const createProduct = createAction(
  '[Product Form] Create Product',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Products API] Create Product Success',
  props<{ product: Product }>()
);

// Update Product
export const updateProduct = createAction(
  '[Product Form] Update Product',
  props<{ id: string; changes: Partial<Product> }>()
);

export const updateProductSuccess = createAction(
  '[Products API] Update Product Success',
  props<{ product: Product }>()
);

// Delete Product
export const deleteProduct = createAction(
  '[Product List] Delete Product',
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  '[Products API] Delete Product Success',
  props<{ id: string }>()
);
```

### Example 3: Create Reducer

```typescript
// state/products.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { ProductsState, initialState } from './products.state';
import * as ProductsActions from './products.actions';

export const productsReducer = createReducer(
  initialState,

  // Load Products
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false
  })),

  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create Product
  on(ProductsActions.createProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product]
  })),

  // Update Product
  on(ProductsActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map(p => p.id === product.id ? product : p)
  })),

  // Delete Product
  on(ProductsActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter(p => p.id !== id)
  }))
);
```

### Example 4: Create Effects

```typescript
// state/products.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { ProductsService } from '../services/products.service';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        this.productsService.getAll().pipe(
          map(products => ProductsActions.loadProductsSuccess({ products })),
          catchError(error => 
            of(ProductsActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      mergeMap(({ product }) =>
        this.productsService.create(product).pipe(
          map(createdProduct => 
            ProductsActions.createProductSuccess({ product: createdProduct })
          ),
          catchError(error => 
            of(ProductsActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      mergeMap(({ id, changes }) =>
        this.productsService.update(id, changes).pipe(
          map(product => ProductsActions.updateProductSuccess({ product })),
          catchError(error => 
            of(ProductsActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsService.delete(id).pipe(
          map(() => ProductsActions.deleteProductSuccess({ id })),
          catchError(error => 
            of(ProductsActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
```

### Example 5: Create Selectors

```typescript
// state/products.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state) => state.error
);

export const selectSelectedProductId = createSelector(
  selectProductsState,
  (state) => state.selectedProductId
);

export const selectSelectedProduct = createSelector(
  selectAllProducts,
  selectSelectedProductId,
  (products, selectedId) => 
    selectedId ? products.find(p => p.id === selectedId) : null
);

// Parameterized selector
export const selectProductById = (id: string) => createSelector(
  selectAllProducts,
  (products) => products.find(p => p.id === id)
);

// Computed selector
export const selectProductCount = createSelector(
  selectAllProducts,
  (products) => products.length
);

// Complex selector
export const selectExpensiveProducts = createSelector(
  selectAllProducts,
  (products) => products.filter(p => p.price > 100)
);
```

### Example 6: Configure Store

```typescript
// store/root.reducer.ts
import { ActionReducerMap } from '@ngrx/store';
import { productsReducer } from '../features/products/state/products.reducer';
import { ordersReducer } from '../features/orders/state/orders.reducer';
import { ProductsState } from '../features/products/state/products.state';
import { OrdersState } from '../features/orders/state/orders.state';

export interface RootState {
  products: ProductsState;
  orders: OrdersState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  products: productsReducer,
  orders: ordersReducer
};
```

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { rootReducer } from './store/root.reducer';
import { ProductsEffects } from './features/products/state/products.effects';
import { OrdersEffects } from './features/orders/state/orders.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(rootReducer),
    provideEffects([ProductsEffects, OrdersEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
```

### Example 7: Component Using Store

```typescript
// containers/product-page/product-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import * as ProductsActions from '../../state/products.actions';
import * as ProductsSelectors from '../../state/products.selectors';

@Component({
  selector: 'app-product-page',
  template: `
    <div class="product-page">
      <h1>Products</h1>
      
      <app-loader *ngIf="loading$ | async"></app-loader>
      <app-error *ngIf="error$ | async as error" [message]="error"></app-error>
      
      <app-product-list
        [products]="products$ | async"
        (productDeleted)="onDelete($event)">
      </app-product-list>
    </div>
  `
})
export class ProductPageComponent implements OnInit {
  products$ = this.store.select(ProductsSelectors.selectAllProducts);
  loading$ = this.store.select(ProductsSelectors.selectProductsLoading);
  error$ = this.store.select(ProductsSelectors.selectProductsError);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  onDelete(id: string): void {
    this.store.dispatch(ProductsActions.deleteProduct({ id }));
  }
}
```

## Best Practices

### ✅ DO

1. **Use Action Hygiene**
   ```typescript
   // ✅ Good - descriptive with source and event
   export const loadProducts = createAction('[Products Page] Load Products');
   export const loadProductsSuccess = createAction('[Products API] Load Products Success');
   
   // ❌ Bad - unclear source
   export const loadProducts = createAction('Load Products');
   ```

2. **Keep Reducers Pure**
   ```typescript
   // ✅ Good - pure function, returns new object
   on(action, (state, { data }) => ({ ...state, data }))
   
   // ❌ Bad - mutates state
   on(action, (state, { data }) => {
     state.data = data;
     return state;
   })
   ```

3. **Use Selectors**
   ```typescript
   // ✅ Good - memoized selector
   this.products$ = this.store.select(selectAllProducts);
   
   // ❌ Bad - direct state access
   this.products$ = this.store.select(state => state.products.products);
   ```

4. **Handle All Effect Outcomes**
   ```typescript
   // ✅ Good - handles success and error
   loadProducts$ = createEffect(() =>
     this.actions$.pipe(
       ofType(loadProducts),
       switchMap(() =>
         this.service.get().pipe(
           map(data => loadProductsSuccess({ data })),
           catchError(error => of(loadProductsFailure({ error })))
         )
       )
     )
   );
   ```

5. **Use Entity Adapter for Collections**
   ```typescript
   import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
   
   const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();
   export interface ProductsState extends EntityState<Product> {
     selectedId: string | null;
   }
   ```

### ❌ DON'T

1. **Don't Subscribe in Effects**
   ```typescript
   // ❌ Bad - subscribe inside effect
   loadProducts$ = createEffect(() =>
     this.actions$.pipe(
       ofType(loadProducts),
       tap(() => {
         this.service.get().subscribe(/* ... */);
       })
     ),
     { dispatch: false }
   );
   ```

2. **Don't Put Business Logic in Components**
   ```typescript
   // ❌ Bad - calculation in component
   totalPrice = this.products.reduce((sum, p) => sum + p.price, 0);
   
   // ✅ Good - use selector
   totalPrice$ = this.store.select(selectTotalPrice);
   ```

3. **Don't Dispatch Actions in Reducers**
   ```typescript
   // ❌ Very Bad - NEVER do this
   on(someAction, (state) => {
     this.store.dispatch(anotherAction());
     return state;
   })
   ```

4. **Don't Use switchMap for All Effects**
   ```typescript
   // ❌ Bad - cancels previous delete request
   deleteProduct$ = createEffect(() =>
     this.actions$.pipe(
       ofType(deleteProduct),
       switchMap(({ id }) => this.service.delete(id))
     )
   );
   
   // ✅ Good - all deletes complete
   deleteProduct$ = createEffect(() =>
     this.actions$.pipe(
       ofType(deleteProduct),
       mergeMap(({ id }) => this.service.delete(id))
     )
   );
   ```

## Testing Approach

### Testing Reducers

```typescript
describe('ProductsReducer', () => {
  it('should return initial state', () => {
    const action = {} as any;
    const result = productsReducer(undefined, action);
    expect(result).toEqual(initialState);
  });

  it('should set loading on loadProducts', () => {
    const action = ProductsActions.loadProducts();
    const result = productsReducer(initialState, action);
    expect(result.loading).toBe(true);
  });

  it('should set products on loadProductsSuccess', () => {
    const products = [{ id: '1', name: 'Test' }];
    const action = ProductsActions.loadProductsSuccess({ products });
    const result = productsReducer(initialState, action);
    expect(result.products).toEqual(products);
    expect(result.loading).toBe(false);
  });
});
```

### Testing Selectors

```typescript
describe('ProductsSelectors', () => {
  const state: ProductsState = {
    products: [
      { id: '1', name: 'Product 1', price: 100 },
      { id: '2', name: 'Product 2', price: 200 }
    ],
    loading: false,
    error: null,
    selectedProductId: '1'
  };

  it('should select all products', () => {
    const result = selectAllProducts.projector(state);
    expect(result.length).toBe(2);
  });

  it('should select expensive products', () => {
    const result = selectExpensiveProducts.projector(state.products);
    expect(result.length).toBe(2);
  });
});
```

### Testing Effects

```typescript
describe('ProductsEffects', () => {
  let actions$: Observable<Action>;
  let effects: ProductsEffects;
  let service: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    service = jasmine.createSpyObj('ProductsService', ['getAll']);
    
    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        { provide: ProductsService, useValue: service }
      ]
    });

    effects = TestBed.inject(ProductsEffects);
  });

  it('should return loadProductsSuccess on success', () => {
    const products = [{ id: '1', name: 'Test' }];
    const action = ProductsActions.loadProducts();
    const outcome = ProductsActions.loadProductsSuccess({ products });

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: products });
    const expected = cold('--c', { c: outcome });
    service.getAll.and.returnValue(response);

    expect(effects.loadProducts$).toBeObservable(expected);
  });
});
```

## Further Reading

- [NgRx Official Documentation](https://ngrx.io/)
- [Redux Pattern](https://redux.js.org/understanding/thinking-in-redux/three-principles)
- [RxJS Official Guide](https://rxjs.dev/guide/overview)
- [NgRx Best Practices](https://ngrx.io/guide/eslint-plugin)
- [Entity Adapter](https://ngrx.io/guide/entity/adapter)
- [Component Store](https://ngrx.io/guide/component-store)

---

## License

MIT