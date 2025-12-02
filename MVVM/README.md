# Angular MVVM Architecture

This project follows a strict **Model-View-ViewModel (MVVM)** architecture pattern, organized to ensure scalability, maintainability, and clear separation of concerns.

## Project Structure

The `src/` directory is organized as follows:

```
src/
├── app/
│   ├── core/                           # Singleton services (global layer)
│   │   ├── guards/                     # Route guards (Auth, Role)
│   │   ├── interceptors/               # HTTP Interceptors (Auth, Error, Logging)
│   │   ├── services/                   # Global singleton services (Auth, API, Storage)
│   │   ├── layouts/                    # App-wide layouts (Header, Sidebar, Footer)
│   │   ├── core.module.ts              # Imports/Exports core components
│   │   └── index.ts                    # Barrel file for core exports
│   │
│   ├── shared/                         # Reusable UI Components, Pipes, Directives
│   │   ├── components/                 # Dumb/Presentational components (Buttons, Modals)
│   │   ├── directives/                 # Custom directives (Highlight, Tooltip)
│   │   ├── pipes/                      # Custom pipes (DateFormat, Currency)
│   │   ├── models/                     # Shared UI models (Pagination, Response)
│   │   └── shared.module.ts            # Exports shared assets to Feature Modules
│   │
│   ├── models/                         # Global Domain Models (MVVM MODEL)
│   │   ├── user.model.ts
│   │   ├── product.model.ts
│   │   └── order.model.ts
│   │
│   ├── services/                       # App-level Business Logic Services (MVVM MODEL)
│   │   ├── user.service.ts
│   │   ├── product.service.ts
│   │   └── order.service.ts
│   │
│   ├── pages/                          # Feature Pages (MVVM VIEW + VIEWMODEL)
│   │   ├── home/
│   │   │   ├── home.component.ts       # ViewModel: Handles logic & state
│   │   │   ├── home.component.html     # View: Template & UI
│   │   │   ├── home.model.ts           # Model: Page-specific data structure
│   │   │   └── home.service.ts         # Service: Page-specific data fetching
│   │   ├── login/
│   │   └── dashboard/
│   │
│   ├── app-routing.module.ts           # Root Routing Configuration
│   ├── app.component.ts                # Root Component
│   └── app.module.ts                   # Root Module
│
├── assets/                             # Static Assets
│   ├── images/
│   ├── fonts/
│   ├── icons/
│   └── mock-data/
│
└── environments/                       # Environment Configuration
    ├── environment.ts                  # Development
    └── environment.prod.ts             # Production
```

## Architecture Breakdown

### 1. Core Module (`app/core`)
- **Purpose**: Contains singleton services and components that are loaded once (usually in `AppModule`).
- **Contents**:
    - **Guards**: Protect routes (e.g., `AuthGuard`).
    - **Interceptors**: Handle HTTP requests/responses globally (e.g., attaching tokens).
    - **Services**: Global services like `AuthService`, `ApiService`.
    - **Layouts**: Structural components like Header and Footer.

### 2. Shared Module (`app/shared`)
- **Purpose**: Contains reusable artifacts imported by multiple feature modules.
- **Contents**:
    - **Components**: "Dumb" components that receive data via `@Input()` and emit events via `@Output()`.
    - **Directives & Pipes**: Reusable UI logic and transformations.
    - **Models**: Shared interfaces/types.

### 3. Global Models & Services (`app/models`, `app/services`)
- **Purpose**: Represents the **Model** layer in MVVM.
- **Contents**:
    - **Models**: Interfaces defining the shape of data (e.g., `User`, `Product`).
    - **Services**: Business logic and data manipulation methods.

### 4. Pages (`app/pages`)
- **Purpose**: Represents the **View** and **ViewModel** layers.
- **Structure**:
    - **View (`.html`)**: The template displaying the UI.
    - **ViewModel (`.ts`)**: The component class managing state and handling user interactions. It delegates data fetching to Services.
    - **Model (`.model.ts`)**: Specific data structures used only by this page.

## Key Principles
- **Separation of Concerns**: Logic is separated from UI.
- **Reusability**: Shared components are kept in `SharedModule`.
- **Scalability**: Feature-based folder structure allows easy expansion.
- **Maintainability**: Strict typing and modular design make the codebase easy to understand and modify.
