# Angular Feature-Based Architecture

This project follows a **Feature-Based Architecture** pattern, organizing code by business features rather than technical layers. This approach improves scalability, maintainability, and team collaboration in large Angular applications.

## Project Structure

```
src/
├── app/
│   ├── core/                          # Singleton services
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── permission.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── error.interceptor.ts
│   │   │   └── cache.interceptor.ts
│   │   ├── services/
│   │   │   ├── api.service.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── logger.service.ts
│   │   │   └── config.service.ts
│   │   └── core.module.ts
│   │
│   ├── shared/                        # Shared reusable UI
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── modal/
│   │   │   ├── card/
│   │   │   ├── table/
│   │   │   └── form-controls/
│   │   ├── pipes/
│   │   │   ├── date-format.pipe.ts
│   │   │   ├── filter.pipe.ts
│   │   │   └── safe-html.pipe.ts
│   │   ├── directives/
│   │   │   ├── click-outside.directive.ts
│   │   │   └── lazy-load.directive.ts
│   │   ├── models/
│   │   │   ├── base.model.ts
│   │   │   └── pagination.model.ts
│   │   ├── utils/
│   │   │   ├── validation.utils.ts
│   │   │   └── date.utils.ts
│   │   └── shared.module.ts
│   │
│   ├── features/                      # Feature-Based Architecture
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.model.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── users/
│   │   │   ├── list/
│   │   │   ├── details/
│   │   │   ├── create/
│   │   │   ├── edit/
│   │   │   ├── users.service.ts
│   │   │   ├── users.model.ts
│   │   │   ├── users.routes.ts
│   │   │   └── users.module.ts
│   │   │
│   │   ├── products/
│   │   │   ├── list/
│   │   │   ├── create/
│   │   │   ├── edit/
│   │   │   ├── details/
│   │   │   ├── components/
│   │   │   │   ├── product-card/
│   │   │   │   └── product-filter/
│   │   │   ├── products.service.ts
│   │   │   ├── products.model.ts
│   │   │   ├── products.routes.ts
│   │   │   └── products.module.ts
│   │   │
│   │   └── dashboard/
│   │       ├── dashboard.component.ts
│   │       ├── dashboard.component.html
│   │       ├── dashboard.component.scss
│   │       ├── components/
│   │       │   ├── stats-widget/
│   │       │   └── recent-activity/
│   │       ├── dashboard.service.ts
│   │       ├── dashboard.model.ts
│   │       ├── dashboard.routes.ts
│   │       └── dashboard.module.ts
│   │
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.ts
│
├── assets/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── styles.scss
```

## Architecture Breakdown

### 1. Core Module (`app/core`)
**Purpose**: Contains singleton services and components loaded once in `AppModule`.

**Contents**:
- **Guards**: Route protection (`AuthGuard`, `PermissionGuard`)
- **Interceptors**: HTTP request/response handling (auth tokens, error handling, caching)
- **Services**: Global singleton services (`ApiService`, `AuthService`, `LoggerService`, `ConfigService`)

**Key Principle**: Core module should only be imported once in `AppModule`. It throws an error if imported elsewhere.

### 2. Shared Module (`app/shared`)
**Purpose**: Contains reusable UI components, pipes, directives, and utilities used across multiple features.

**Contents**:
- **Components**: Presentational components (button, modal, card, table)
- **Pipes**: Data transformation (date formatting, filtering, safe HTML)
- **Directives**: DOM manipulation (click-outside, lazy-load)
- **Models**: Shared interfaces (base model, pagination)
- **Utils**: Helper functions (validation, date utilities)

**Key Principle**: Shared module is imported by feature modules as needed. Components should be "dumb" and receive data via `@Input()`.

### 3. Features Module (`app/features`)
**Purpose**: Organizes code by business features, each feature is self-contained with its own components, services, models, and routes.

#### Feature Structure
Each feature module follows this pattern:
```
feature-name/
├── components/              # Feature-specific components
│   ├── component-1/
│   └── component-2/
├── feature-name.service.ts  # Feature-specific business logic
├── feature-name.model.ts    # Feature-specific data models
├── feature-name.routes.ts   # Feature routing configuration
└── feature-name.module.ts   # Feature module definition
```

#### Available Features

**Auth Feature**
- Login, Register, Forgot Password components
- Authentication service with mock login
- Auth models for credentials

**Users Feature**
- User list, details, create, edit components
- Users service with CRUD operations
- User model extending BaseModel

**Products Feature**
- Product list, details, create, edit components
- Product-specific components (product-card, product-filter)
- Products service with CRUD operations
- Product model with pricing and inventory

**Dashboard Feature**
- Dashboard overview component
- Dashboard widgets (stats, recent activity)
- Dashboard service for analytics
- Dashboard stats model

## Key Principles

### 1. Feature Isolation
Each feature is self-contained and can be developed, tested, and deployed independently.

### 2. Lazy Loading
Features are lazy-loaded using Angular's router for better performance:
```typescript
{
  path: 'users',
  loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
}
```

### 3. Clear Separation of Concerns
- **Core**: Application-wide singleton services
- **Shared**: Reusable UI components
- **Features**: Business logic organized by domain

### 4. Scalability
Adding new features is straightforward - create a new feature folder with its own module, components, services, and routes.

### 5. Team Collaboration
Different teams can work on different features without conflicts, as each feature is isolated.

## Benefits

✅ **Maintainability**: Easy to locate and modify feature-specific code  
✅ **Scalability**: Add new features without affecting existing ones  
✅ **Reusability**: Shared components and services reduce duplication  
✅ **Performance**: Lazy loading improves initial load time  
✅ **Team Collaboration**: Features can be developed independently  
✅ **Testing**: Features can be tested in isolation  

## Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm start
# Navigate to http://localhost:4200
```

### Build
```bash
npm run build
```

### Testing
```bash
npm test
```

## Feature Module Best Practices

1. **Keep features independent** - Avoid cross-feature dependencies
2. **Use shared module** - For common UI components
3. **Use core services** - For application-wide functionality
4. **Lazy load features** - For better performance
5. **Follow naming conventions** - `feature-name.service.ts`, `feature-name.model.ts`
6. **Create feature-specific components** - In the `components/` subfolder
7. **Define clear routes** - In `feature-name.routes.ts`

## Comparison with Other Architectures

| Aspect | Feature-Based | Layer-Based | MVVM |
|--------|--------------|-------------|------|
| Organization | By business feature | By technical layer | By pattern role |
| Scalability | Excellent | Good | Good |
| Team Collaboration | Excellent | Moderate | Good |
| Learning Curve | Low | Low | Medium |
| Best For | Large apps, multiple teams | Small-medium apps | Apps with complex UI logic |
