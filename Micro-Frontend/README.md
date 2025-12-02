# Micro-Frontend Architecture with Module Federation

This project demonstrates a complete **Micro-Frontend (MFE) Architecture** using Angular and Webpack Module Federation, enabling independent deployment and development of application features.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Key Concepts](#key-concepts)
- [When to Use This Architecture](#when-to-use-this-architecture)
- [Benefits & Drawbacks](#benefits--drawbacks)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Module Federation Configuration](#module-federation-configuration)
- [Code Examples](#code-examples)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Further Reading](#further-reading)

## Architecture Overview

Micro-Frontend Architecture divides a monolithic frontend into smaller, independently deployable applications that work together seamlessly.

### Application Components

- **Shell Application** (Host) - Main container (port 4200)
- **Products MFE** (Remote) - Product catalog (port 4201)
- **Orders MFE** (Remote) - Order management (port 4202)
- **Auth MFE** (Remote) - Authentication (port 4203)
- **Shared Library** - Common components and utilities

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│         Shell Application (Host) :4200              │
│  - Main navigation                                  │
│  - Routing configuration                            │
│  - Layout components                                │
└───────┬──────────────────┬──────────────────┬───────┘
        │                  │                  │
        │ Module Federation│                  │
        ▼                  ▼                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Products MFE│    │  Orders MFE │    │   Auth MFE  │
│    :4201    │    │    :4202    │    │    :4203    │
│             │    │             │    │             │
│ - Product   │    │ - Order     │    │ - Login     │
│   List      │    │   History   │    │ - Register  │
│ - Details   │    │ - Details   │    │             │
└─────────────┘    └─────────────┘    └─────────────┘
        │                  │                  │
        └──────────────────┴──────────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │ Shared Library│
                  │ - Components  │
                  │ - Services    │
                  │ - Utils       │
                  └───────────────┘
```

## Key Concepts

### 1. **Module Federation**
Webpack plugin that allows multiple independent builds to share code at runtime without bundling dependencies multiple times.

### 2. **Host (Shell)**
The main application that loads and orchestrates remote micro-frontends.

### 3. **Remote (Micro-Frontend)**
Independent applications that can be loaded into the host at runtime.

### 4. **Shared Dependencies**
Common libraries (e.g., @angular/core) shared as singletons across all micro-frontends.

### 5. **Federated Modules**
Modules exposed by remotes that can be consumed by the host.

## When to Use This Architecture

✅ **Best suited for:**
- Large-scale applications with multiple teams
- Organizations with different product domains
- Applications requiring independent deployment cycles
- Teams working with different tech stacks (Angular, React, Vue)
- Enterprise applications with multiple business units
- Applications that need to scale team size
- Systems requiring feature toggles and gradual rollouts

✅ **Ideal scenarios:**
- E-commerce platforms (checkout, products, user account)
- Banking applications (accounts, transfers, loans)
- SaaS platforms with multiple products
- Enterprise portals with many modules

❌ **Avoid when:**
- Small applications (< 5 features)
- Single team projects
- Projects requiring tight integration between features
- Applications with very tight performance budgets
- Simple websites or blogs

## Benefits & Drawbacks

### ✅ Benefits

| Benefit | Description |
|---------|-------------|
| **Team Autonomy** | Teams can work independently on their MFE |
| **Independent Deployment** | Deploy features without deploying entire app |
| **Technology Flexibility** | Different MFEs can use different framework versions |
| **Scalability** | Easy to add new micro-frontends |
| **Faster Build Times** | Build only the MFE you're working on |
| **Code Isolation** | Better encapsulation and separation |
| **Parallel Development** | Multiple teams work simultaneously |

### ❌ Drawbacks

| Drawback | Description |
|----------|-------------|
| **Complexity** | More complex than monolithic architecture |
| **Runtime Overhead** | Loading multiple apps can impact performance |
| **Versioning Challenges** | Managing shared dependency versions |
| **Debugging Difficulty** | Harder to debug across multiple MFEs |
| **Development Setup** | Need to run multiple dev servers |
| **State Management** | Sharing state between MFEs is complex |
| **Testing Complexity** | Integration testing across MFEs |

## Project Structure

```
apps/
├── shell/                            ← Main host application (container)
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.config.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   ├── app.component.scss
│   │   │   ├── app.routes.ts
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── header/
│   │   │   │   │   ├── header.component.ts
│   │   │   │   │   ├── header.component.html
│   │   │   │   │   └── header.component.scss
│   │   │   │   ├── sidebar/
│   │   │   │   │   ├── sidebar.component.ts
│   │   │   │   │   ├── sidebar.component.html
│   │   │   │   │   └── sidebar.component.scss
│   │   │   │   └── footer/
│   │   │   │
│   │   │   ├── core/
│   │   │   │   ├── services/
│   │   │   │   │   ├── auth.service.ts
│   │   │   │   │   └── navigation.service.ts
│   │   │   │   └── guards/
│   │   │   │
│   │   │   └── remote-entry.config.ts  ← Loads MFE remotes
│   │   │
│   │   ├── assets/
│   │   ├── environments/
│   │   │   ├── environment.ts
│   │   │   └── environment.prod.ts
│   │   └── bootstrap.ts
│   │
│   ├── webpack.config.js              ← Module Federation config
│   ├── module-federation.manifest.json
│   ├── project.json
│   └── tsconfig.json
│
├── products-mfe/                     ← Micro-frontend (Remote)
│   ├── src/app/
│   │   ├── remote-entry/
│   │   │   ├── entry.component.ts
│   │   │   ├── entry.routes.ts
│   │   │   │
│   │   │   ├── product-page/
│   │   │   │   ├── product-page.component.ts
│   │   │   │   ├── product-page.component.html
│   │   │   │   └── product-page.component.scss
│   │   │   │
│   │   │   └── product-list/
│   │   │       ├── product-list.component.ts
│   │   │       ├── product-list.component.html
│   │   │       └── product-list.component.scss
│   │   │
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   │   └── products.service.ts
│   │   │   └── models/
│   │   │       └── product.model.ts
│   │   │
│   │   └── mfe.config.ts
│   │
│   ├── webpack.config.js
│   ├── module-federation.config.js
│   └── project.json
│
├── orders-mfe/                       ← Another micro-frontend
│   ├── src/app/
│   │   ├── remote-entry/
│   │   │   ├── entry.component.ts
│   │   │   ├── entry.routes.ts
│   │   │   │
│   │   │   ├── order-list/
│   │   │   │   ├── order-list.component.ts
│   │   │   │   ├── order-list.component.html
│   │   │   │   └── order-list.component.scss
│   │   │   │
│   │   │   └── order-details/
│   │   │       ├── order-details.component.ts
│   │   │       ├── order-details.component.html
│   │   │       └── order-details.component.scss
│   │   │
│   │   ├── components/
│   │   │   ├── order-status/
│   │   │   └── order-timeline/
│   │   │
│   │   ├── services/
│   │   │   └── order.service.ts
│   │   │
│   │   └── models/
│   │       └── order.model.ts
│   │
│   ├── webpack.config.js
│   ├── module-federation.config.js
│   └── project.json
│
├── auth-mfe/                          ← Another remote
│   ├── src/app/
│   │   ├── remote-entry/
│   │   │   ├── entry.component.ts
│   │   │   ├── entry.routes.ts
│   │   │   │
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.scss
│   │   │   │
│   │   │   └── register/
│   │   │       ├── register.component.ts
│   │   │       ├── register.component.html
│   │   │       └── register.component.scss
│   │   │
│   │   ├── components/
│   │   │   ├── auth-form/
│   │   │   └── password-strength/
│   │   │
│   │   └── services/
│   │       └── auth.service.ts
│   │
│   ├── webpack.config.js
│   ├── module-federation.config.js
│   └── project.json
│
└── shared-lib/                       ← Shared library across MFEs
    ├── src/
    │   ├── components/
    │   │   ├── button/
    │   │   ├── modal/
    │   │   └── card/
    │   ├── services/
    │   │   ├── api.service.ts
    │   │   └── logger.service.ts
    │   ├── models/
    │   │   └── base.model.ts
    │   └── utils/
    │       └── helpers.ts
    └── project.json
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Angular CLI 17.x or higher

### Installation

```bash
cd "d:\Angular Architecture\Micro-Frontend"
npm install
```

### Running the Applications

You need to run each application in separate terminals:

```bash
# Terminal 1 - Shell (Host)
cd apps/shell
npm start
# Runs on http://localhost:4200

# Terminal 2 - Products MFE
cd apps/products-mfe
npm start
# Runs on http://localhost:4201

# Terminal 3 - Orders MFE
cd apps/orders-mfe
npm start
# Runs on http://localhost:4202

# Terminal 4 - Auth MFE
cd apps/auth-mfe
npm start
# Runs on http://localhost:4203
```

### Demo Credentials

**Login:**
- Username: `demo`
- Password: `password123`

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Module Federation Configuration

### Shell (Host) Configuration

```javascript
// apps/shell/webpack.config.js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        productsMfe: "productsMfe@http://localhost:4201/remoteEntry.js",
        ordersMfe: "ordersMfe@http://localhost:4202/remoteEntry.js",
        authMfe: "authMfe@http://localhost:4203/remoteEntry.js",
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true },
      }
    })
  ]
};
```

### Remote (MFE) Configuration

```javascript
// apps/products-mfe/webpack.config.js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "productsMfe",
      filename: "remoteEntry.js",
      exposes: {
        "./Routes": "./src/app/remote-entry/entry.routes.ts",
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true },
      }
    })
  ]
};
```

## Code Examples

### Example 1: Shell Routing Configuration

```typescript
// apps/shell/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Routes'
      }).then(m => m.PRODUCT_ROUTES)
  },
  {
    path: 'orders',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './Routes'
      }).then(m => m.ORDER_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './Routes'
      }).then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];
```

### Example 2: Remote Routes Definition

```typescript
// apps/products-mfe/src/app/remote-entry/entry.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: ':id',
    component: ProductDetailsComponent
  }
];
```

### Example 3: Shared State Management

```typescript
// shared-lib/src/services/state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedStateService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  setUser(user: any): void {
    this.userSubject.next(user);
  }

  getUser(): any {
    return this.userSubject.value;
  }
}
```

## Best Practices

### ✅ DO

1. **Version Shared Dependencies Carefully**
   - Use singleton for Angular core libraries
   - Use strict versioning to avoid conflicts

2. **Keep MFEs Independent**
   - Each MFE should work standalone
   - Avoid tight coupling between MFEs

3. **Use Shared Library for Common Code**
   - Components used by multiple MFEs
   - Utilities and helpers
   - Models and interfaces

4. **Implement Error Boundaries**
   - Handle remote loading failures gracefully
   - Provide fallback UI

5. **Use Environment Configuration**
   - Different remote URLs for dev/prod
   - Centralized configuration

6. **Optimize Loading**
   - Lazy load MFEs
   - Preload critical MFEs

### ❌ DON'T

1. **Don't Create Circular Dependencies**
   - MFEs should not import from each other directly

2. **Don't Share Too Much**
   - Only share what's truly common
   - Avoid creating a monolithic shared library

3. **Don't Ignore Version Conflicts**
   - Test thoroughly with different versions
   - Use version range carefully

4. **Don't Deploy Without Testing Integration**
   - Always test Shell + all MFEs together

## Troubleshooting

### Issue: Remote Entry Not Loading

**Error**: `Failed to load remote entry`

**Solution**:
- Ensure the remote MFE is running
- Check the URL in Module Federation config
- Verify CORS settings

### Issue: Shared Dependency Conflicts

**Error**: `Module not found` or version mismatch

**Solution**:
```javascript
shared: {
  "@angular/core": { 
    singleton: true, 
    strictVersion: false,  // Allow version range
    requiredVersion: "^17.0.0"
  }
}
```

### Issue: Routing Not Working

**Solution**:
- Ensure routes are properly exposed in remote
- Check that Shell routing configuration is correct
- Verify base href in index.html

## Further Reading

- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [@angular-architects/module-federation](https://github.com/angular-architects/module-federation-plugin)
- [Micro Frontends](https://micro-frontends.org/)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)

---

## License

MIT