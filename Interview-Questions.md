# Angular Architecture Interview Guide 🏗️

This guide covers advanced **Angular Architecture** scenarios, specifically designed for technical interviews. It focuses on structural patterns, scalability, and enterprise-grade solutions found in this repository.

For more details on each architecture, check the specific folders in the [root directory](.).

---

## 📖 Table of Contents

- [**General Architecture Patterns**](#general-architecture-patterns)
  - [1. What is the difference between Smart (Container) and Dumb (Presentational) components?](#1-what-is-the-difference-between-smart-container-and-dumb-presentational-components)
  - [2. Explain the Facade Pattern and why it is used in Angular.](#2-explain-the-facade-pattern-and-why-it-is-used-in-angular)
  - [3. What is Vertical Slice Architecture (Feature-Based) vs. Horizontal Slice (Layer-Based)?](#3-what-is-vertical-slice-architecture-feature-based-vs-horizontal-slice-layer-based)
- [**Clean & Hexagonal Architecture**](#clean--hexagonal-architecture)
  - [4. What is Clean Architecture and what are its core layers?](#4-what-is-clean-architecture-and-what-are-its-core-layers)
  - [5. Example of "Dependency Rule" in Clean Architecture.](#5-example-of-dependency-rule-in-clean-architecture)
  - [6. What is the difference between Clean Architecture and Hexagonal Architecture?](#6-what-is-the-difference-between-clean-architecture-and-hexagonal-architecture)
- [**Reactive Architecture**](#reactive-architecture)
  - [7. What is Reactive Architecture and how is it different from Imperative?](#7-what-is-reactive-architecture-and-how-is-it-different-from-imperative)
  - [8. How do you handle "Race Conditions" in a Reactive API call?](#8-how-do-you-handle-race-conditions-in-a-reactive-api-call)
- [**Micro-Frontends**](#micro-frontends)
  - [9. What is Module Federation and how does it enable Micro-Frontends?](#9-what-is-module-federation-and-how-does-it-enable-micro-frontends)
  - [10. How do you handle shared state and dependencies in Micro-Frontends?](#10-how-do-you-handle-shared-state-and-dependencies-in-micro-frontends)
- [**Scalability & Performance**](#scalability--performance)
  - [11. How does MVVM (Model-View-ViewModel) differ from standard MVC in Angular?](#11-how-does-mvvm-model-view-viewmodel-differ-from-standard-mvc-in-angular)
  - [12. Strategies for optimizing large Monorepos?](#12-strategies-for-optimizing-large-monorepos)

---

## General Architecture Patterns

### 1. What is the difference between Smart (Container) and Dumb (Presentational) components?

**Smart Components** (Containers) care about *how things work*. They interact with services, manage state, and pass data down. **Dumb Components** (Presentational) care about *how things look*. They receive data via `@Input()` and emit events via `@Output()`, with no dependency on services.

| Feature | Smart Component (Container) | Dumb Component (Presentational) |
| :--- | :--- | :--- |
| **Focus** | Data fetching, State Logic | UI Rendering, Styling |
| **Dependencies** | Services, Store (NGRX), Facades | Minimal / None |
| **Inputs/Outputs** | Rarely used | Heavily used |
| **Reusability** | Low (Specific to feature) | High (Generic UI) |

```typescript
// Smart Component
@Component({
  template: `<app-user-list [users]="users$ | async" (select)="onSelect($event)"></app-user-list>`
})
export class UserPageContainer {
  users$ = this.userFacade.users$;
  constructor(private userFacade: UserFacade) {}
  onSelect(user: User) { this.userFacade.selectUser(user); }
}

// Dumb Component
@Component({
  selector: 'app-user-list',
  template: `<ul><li *ngFor="let u of users" (click)="select.emit(u)">{{u.name}}</li></ul>`
})
export class UserListComponent {
  @Input() users: User[];
  @Output() select = new EventEmitter<User>();
}
```

[⬆️ Back to Top](#table-of-contents)

---

### 2. Explain the Facade Pattern and why it is used in Angular.

The **Facade Pattern** provides a simplified interface to a complex subsystem. In Angular, it is often used to abstract state management (NGRX, Signals, or Services) from components. This allows you to refactor your state management library without touching your UI components.

| without Facade | with Facade |
| :--- | :--- |
| Components inject `Store`, `HttpClient`, etc. | Components inject `UserFacade` only. |
| Business logic leaks into components. | Business logic stays in the Facade/Service. |
| Hard to refactor state library. | Easy to swap State implementations. |

```typescript
@Injectable({ providedIn: 'root' })
export class ProductFacade {
  // Abstraction over Store or BehaviorSubject
  products$ = this.store.select(getAllProducts);

  constructor(private store: Store) {}

  loadProducts() {
    this.store.dispatch(loadProductsAction());
  }
}
```

[⬆️ Back to Top](#table-of-contents)

---

### 3. What is Vertical Slice Architecture (Feature-Based) vs. Horizontal Slice (Layer-Based)?

**Vertical Slice** organizes code by **Features** (e.g., `Orders`, `Products`, `Users`), where each folder contains everything needed for that feature (Components, Services, State). **Horizontal Slice** organizes code by **Type** (e.g., `Components`, `Services`, `Models`).

| Architecture | Folder Structure | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **Vertical (Feature)** | `src/features/orders/{component, service, store}` | Scalable, Isolated, Easy to Delete | Can duplicate generic logic |
| **Horizontal (Layer)** | `src/components/`, `src/services/` | DRY (Don't Repeat Yourself) | Context Switching, "Pasta" Code |

```text
// Vertical Slice Example
features/
  ├── orders/
  │   ├── order-list.component.ts
  │   ├── order.service.ts
  │   └── order.state.ts
  └── users/
```

[⬆️ Back to Top](#table-of-contents)

---

## Clean & Hexagonal Architecture

### 4. What is Clean Architecture and what are its core layers?

**Clean Architecture** organizes code into concentric circles where **Dependencies flow inwards**. The inner layers (Domain) rely on nothing. The outer layers (UI, API) rely on the inner layers.

1.  **Domain (Entities)**: Enterprise business rules. Pure logic. No Angular, no HTTP.
2.  **Application (Use Cases)**: Application specific rules. Orchestrates data flow.
3.  **Infrastructure (Adapters)**: Implements interfaces. HTTP calls, Storage, 3rd party libs.
4.  **Presentation (UI)**: Angular Components.

```typescript
// Domain Layer (Pure TS)
export class User {
  constructor(public id: string, public name: string) {}
  isValid() { return this.name.length > 0; }
}

// Application Layer (Use Case)
@Injectable()
export class RegisterUserUseCase {
  execute(user: User) { /* ... */ }
}
```

[⬆️ Back to Top](#table-of-contents)

---

### 5. Example of "Dependency Rule" in Clean Architecture.

The **Dependency Rule** states that source code dependencies can only point **inward**. Inner circles know nothing about outer circles.

*   **Wrong**: Your Domain Model importing an Angular Service.
*   **Right**: Your Angular Service implementing a Domain Repository Interface.

```typescript
// 1. DOMAIN (Inner): Defines Interface
export interface UserRepository {
  getById(id: string): Observable<User>;
}

// 2. INFRASTRUCTURE (Outer): Implements Interface
@Injectable()
export class UserApiService implements UserRepository {
  constructor(private http: HttpClient) {}
  getById(id: string) { return this.http.get<User>(`/api/users/${id}`); }
}
```

[⬆️ Back to Top](#table-of-contents)

---

### 6. What is the difference between Clean Architecture and Hexagonal Architecture?

They are very similar (both isolate domain logic), but use different terminology:

| Feature | Clean Architecture | Hexagonal (Ports & Adapters) |
| :--- | :--- | :--- |
| **Key Term** | Layers (Concentric) | Ports (Interfaces) & Adapters |
| **Input** | Controllers / Presenters | Driving Adapters (UI, Tests) |
| **Output** | Gateways / Repositories | Driven Adapters (DB, API) |
| **Core** | Entities / Use Cases | Domain / Application Core |

**Hexagonal** focuses on the "Ports" (Interfaces) that allow the application to be driven by Users, Programs, or Tests equally.

[⬆️ Back to Top](#table-of-contents)

---

## Reactive Architecture

### 7. What is Reactive Architecture and how is it different from Imperative?

**Reactive Architecture** relies on **Streams** (`Observable$`) as the single source of truth. Data is "pushed" to consumers. **Imperative Architecture** relies on calling methods to "pull" or "set" data manually.

| Feature | Imperative | Reactive |
| :--- | :--- | :--- |
| **Data Flow** | Pull (passive) | Push (active) |
| **State** | Mutable variables (`this.data = ...`) | Immutable Streams (`data$ = ...`) |
| **Change Detection** | Manual / Default | OnPush (Higher Performance) |
| **Complexity** | Low (initially) | High (Requires RxJS mastery) |

```typescript
// Reactive (Declarative)
this.searchResults$ = this.searchTerm$.pipe(
  switchMap(term => this.service.search(term))
); // Stream handles timing, cancellation, and data flow automatically
```

[⬆️ Back to Top](#table-of-contents)

---

### 8. How do you handle "Race Conditions" in a Reactive API call?

In a reactive architecture, race conditions (e.g., user types fast, first request finishes after second) are handled using RxJS **Flattening Operators**:

*   **`switchMap`**: Cancels the previous inner observable. (Best for Search/Get).
*   **`concatMap`**: Queues requests. Preserves order. (Best for Saves/Updates).
*   **`mergeMap`**: Runs in parallel. No order guarantee. (Best for Independent deletes).
*   **`exhaustMap`**: Ignores new emissions while one is pending. (Best for Login buttons).

```typescript
// Solves Race Condition automatically
this.search$ = this.term$.pipe(
  debounceTime(300),
  switchMap(term => this.api.search(term)) // Cancels old request if new term arrives
);
```

[⬆️ Back to Top](#table-of-contents)

---

## Micro-Frontends

### 9. What is Module Federation and how does it enable Micro-Frontends?

**Module Federation** is a Webpack 5 feature that allows multiple independent builds to share code at runtime. It enables **Micro-Frontends** by allowing a "Shell" application to load "Remote" applications (like `ProductsMFE` or `OrdersMFE`) on demand, without refreshing the page.

*   **Host (Shell)**: The main container app.
*   **Remote**: A separately deployed app exposed as a module.
*   **Shared**: Libraries (e.g., `@angular/core`) loaded only once (singleton).

```javascript
// webpack.config.js (Shell)
new ModuleFederationPlugin({
    remotes: {
        products: "products@http://localhost:4201/remoteEntry.js",
    },
    shared: ["@angular/core", "@angular/common"]
})
```

[⬆️ Back to Top](#table-of-contents)

---

### 10. How do you handle shared state and dependencies in Micro-Frontends?

Sharing state in Micro-Frontends should be minimized to avoid coupling. However, when necessary:

1.  **Shared Library**: Create a Core/Shared library published to NPM (or in a monorepo) containing State interfaces or Subjects.
2.  **Window Object / Custom Events**: For loose coupling (not recommended for complex data).
3.  **Query Params / URL**: Source of truth for navigation state.
4.  **Version Mismatch**: configuring `singleton: true` and `strictVersion: true` in Module Federation ensures all MFEs use the same Angular version to prevent runtime errors.

[⬆️ Back to Top](#table-of-contents)

---

## Scalability & Performance

### 11. How does MVVM (Model-View-ViewModel) differ from standard MVC in Angular?

Angular components naturally follow an MVVM-like pattern, but explicitly enforcing it separates UI logic further:

*   **View**: The HTML Template (Passive).
*   **ViewModel**: The Component Class. Exposes streams (`Observable<ViewState>`) to the view. Handles user interaction logic.
*   **Model**: The Services/Domain entities.

In explicit MVVM, the Component (ViewModel) often does not set properties directly, but pushes updates to a reactive state stream.

```typescript
// ViewModel (Component)
readonly state$ = combineLatest([this.users$, this.filter$]).pipe(
  map(([users, filter]) => ({ users: this.filterUsers(users, filter) }))
);
```

[⬆️ Back to Top](#table-of-contents)

---

### 12. Strategies for optimizing large Monorepos?

1.  **Nx / Turbo**: Use smart build tools that support **Computation Caching** (don't rebuild what hasn't changed).
2.  **Affected Command**: Only lint/test/build projects affected by a PR (`nx affected:build`).
3.  **Strict Boundaries**: Enforce `eslint` rules so features cannot import from other features, only from shared libraries.
4.  **Barrel Files**: Be careful with `index.ts` files to avoiding circular dependencies and tree-shaking issues.

[⬆️ Back to Top](#table-of-contents)
