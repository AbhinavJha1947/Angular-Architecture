# Angular Module-Based Architecture

A complete Angular application structure following the **Module-Based Architecture** pattern. This architecture organizes code by feature modules, making it scalable, maintainable, and easy to understand.

## 📁 Project Structure

```
src/
└── app/
    ├── app.module.ts                    # Root module
    ├── app.component.ts                 # Root component
    ├── app-routing.module.ts            # Main routing configuration
    │
    ├── layout/                          # Layout components
    │   ├── header/                      # Header with navigation
    │   ├── sidebar/                     # Sidebar navigation
    │   └── footer/                      # Footer component
    │
    ├── modules/                         # Feature modules
    │   ├── auth/                        # Authentication module
    │   │   ├── auth.module.ts
    │   │   ├── auth-routing.module.ts
    │   │   ├── pages/                   # Auth pages (login, register, reset)
    │   │   ├── components/              # Auth-specific components
    │   │   └── services/                # Auth & token services
    │   │
    │   ├── dashboard/                   # Dashboard module
    │   │   ├── pages/home/              # Dashboard home page
    │   │   ├── components/              # Dashboard widgets, charts, stats
    │   │   └── services/                # Dashboard service
    │   │
    │   ├── products/                    # Products module
    │   │   ├── pages/                   # CRUD pages (list, details, create, edit)
    │   │   ├── components/              # Product card, filter, search
    │   │   ├── services/                # Products & cache services
    │   │   └── models/                  # Product & category models
    │   │
    │   └── orders/                      # Orders module
    │       ├── pages/                   # Order pages
    │       ├── components/              # Order status, timeline
    │       ├── services/                # Orders service
    │       └── models/                  # Order models
    │
    ├── shared/                          # Shared module
    │   ├── shared.module.ts
    │   ├── components/                  # Reusable UI components
    │   │   ├── button/
    │   │   ├── modal/
    │   │   ├── table/
    │   │   └── pagination/
    │   ├── directives/                  # Custom directives
    │   │   ├── tooltip.directive.ts
    │   │   └── debounce.directive.ts
    │   └── pipes/                       # Custom pipes
    │       ├── truncate.pipe.ts
    │       └── highlight.pipe.ts
    │
    ├── core/                            # Core module (singleton services)
    │   ├── core.module.ts
    │   ├── guards/                      # Route guards
    │   │   ├── auth.guard.ts
    │   │   └── admin.guard.ts
    │   ├── interceptors/                # HTTP interceptors
    │   │   ├── jwt.interceptor.ts
    │   │   └── http-error.interceptor.ts
    │   └── services/                    # Core services
    │       ├── api.service.ts
    │       ├── storage.service.ts
    │       └── notification.service.ts
    │
    └── environments/                    # Environment configurations
        ├── environment.ts
        └── environment.prod.ts
```

## 🏗️ Architecture Principles

### Module-Based Organization

This architecture follows these key principles:

1. **Feature Modules**: Each major feature (auth, dashboard, products, orders) is encapsulated in its own module
2. **Lazy Loading**: Feature modules are lazy-loaded for better performance
3. **Shared Module**: Reusable components, directives, and pipes are centralized
4. **Core Module**: Singleton services, guards, and interceptors are in the core module
5. **Clear Separation**: Business logic is separated from presentation logic

### Module Types

#### 1. **Feature Modules** (`modules/`)
- Self-contained units of functionality
- Include pages, components, services, and models specific to the feature
- Lazy-loaded via routing
- Examples: Auth, Dashboard, Products, Orders

#### 2. **Shared Module** (`shared/`)
- Contains reusable UI components
- Includes custom directives and pipes
- Imported by feature modules that need these components
- Should NOT have services (use Core module instead)

#### 3. **Core Module** (`core/`)
- Singleton services used across the app
- Route guards and HTTP interceptors
- Imported ONLY in AppModule
- Prevents re-instantiation of services

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📦 Key Features

### Authentication Module
- Login, Register, and Reset Password pages
- JWT token management
- Auth guard for protected routes
- Token service for localStorage operations

### Dashboard Module
- Statistics cards with real-time data
- Chart visualizations
- Widget components
- Activity feed

### Products Module
- Complete CRUD operations
- Product list with search and filter
- Product details view
- Create and edit forms
- Product card component
- Category management

### Orders Module
- Order list with status tracking
- Order details view
- Order status component with color coding
- Order timeline for tracking progress

### Shared Components
- **Button**: Reusable button with variants (primary, secondary, danger)
- **Modal**: Customizable modal dialog
- **Table**: Styled table component
- **Pagination**: Page navigation component

### Custom Directives
- **Tooltip**: Show tooltips on hover
- **Debounce**: Debounce click events

### Custom Pipes
- **Truncate**: Shorten long text with ellipsis
- **Highlight**: Highlight search terms in text

## 🔒 Security Features

- **JWT Interceptor**: Automatically adds auth tokens to HTTP requests
- **Auth Guard**: Protects routes requiring authentication
- **Admin Guard**: Restricts access to admin-only routes
- **HTTP Error Interceptor**: Global error handling

## 🎨 Styling

- SCSS for component styles
- Modular CSS architecture
- Responsive design
- Modern UI with animations and transitions

## 📝 Code Organization Best Practices

1. **One component per file**: Each component has its own file
2. **Naming conventions**: Use kebab-case for files, PascalCase for classes
3. **Barrel exports**: Use index.ts files for cleaner imports
4. **Type safety**: Use TypeScript interfaces and models
5. **Reactive programming**: Use RxJS observables for async operations

## 🧪 Testing

The project includes:
- Unit tests for components
- Service tests with mocked dependencies
- Guard and interceptor tests

Run tests with:
```bash
npm test
```

## 🔧 Configuration

### Environment Variables

Development (`environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

Production (`environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.production.com/api'
};
```

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import { AuthService } from '@modules/auth/services/auth.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AuthGuard } from '@core/guards/auth.guard';
```

## 📚 Module Dependencies

```
AppModule
├── CoreModule (singleton)
├── SharedModule (imported by feature modules)
├── Layout Components
└── Feature Modules (lazy-loaded)
    ├── AuthModule
    ├── DashboardModule
    ├── ProductsModule
    └── OrdersModule
```

## 🎯 When to Use This Architecture

This Module-Based architecture is ideal for:

- **Medium to large applications** with multiple features
- **Team projects** where different teams work on different modules
- **Applications requiring lazy loading** for performance
- **Projects with clear feature boundaries**
- **Enterprise applications** with complex business logic

## 🔄 Comparison with Other Architectures

| Architecture | Best For | Complexity | Scalability |
|--------------|----------|------------|-------------|
| Module-Based | Medium-large apps | Medium | High |
| Feature-Based | Large enterprise apps | High | Very High |
| MVVM | Apps with complex UI logic | Medium | Medium |
| Simple | Small apps, prototypes | Low | Low |

## 📖 Additional Resources

- [Angular Official Documentation](https://angular.io/docs)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [RxJS Documentation](https://rxjs.dev/)

## 📄 License

This project structure is provided as a template for Angular applications.

---

**Built with ❤️ using Angular**
