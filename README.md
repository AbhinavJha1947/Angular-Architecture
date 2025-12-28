# Angular Architecture Patterns & Best Practices 🏛️

Welcome to the **Angular Architecture** repository. This project serves as a comprehensive reference for various architectural patterns, design principles, and scalability strategies in Angular.

Whether you are building a small feature or a massive enterprise monorepo, you will find a pattern here that suits your needs.

---

## 🚀 Quick Links

- **[ Interview Guide](./Interview-Questions.md)**: A curated list of advanced architecture interview questions and answers.
- **[Clean Architecture](./Clean%20Architecture)**: Domain-centric layering.
- **[Micro-Frontends](./Micro-Frontend)**: Scaling with Module Federation.

---

## 📂 Architecture Patterns Index

| Architecture Pattern | Description | Link |
|----------------------|-------------|------|
| **Clean Architecture** | Organizes code into concentric layers (Entities, Use Cases) independent of frameworks. | [View](./Clean%20Architecture) |
| **Hexagonal Architecture** | Also known as "Ports & Adapters". Decouples the core domain from external services via interfaces. | [View](./Hexagonal%20Architecture%20(Ports%20&%20Adapters)) |
| **Micro-Frontends** | Scales large applications by splitting them into independent, deployable remotes using Module Federation. | [View](./Micro-Frontend) |
| **MVVM** | **Model-View-ViewModel**. Explicit separation of View (Template) and ViewModel (Component Logic). | [View](./MVVM) |
| **Smart & Dumb** | Separates **Container** components (logic/state) from **Presentational** components (UI/rendering). | [View](./Smart%20Dumb) |
| **Facade Pattern** | Abstracts complex state management and business logic behind a simplified service API. | [View](./Facade) |
| **Reactive Architecture** | Fully declarative architecture using RxJS streams as the single source of truth. | [View](./Reactive%20Architecture) |
| **Feature-Based** | "Vertical Slice" architecture. Organizes code by business feature rather than technical type. | [View](./Feature-Based) |
| **Module-Based** | Classic Angular organization using NgModules (Legacy/Standard approach). | [View](./Module-Based) |
| **Core & Shared** | Strategies for organizing reusable utilities and UI libraries in a Monorepo/Large app. | [View](./Core-Shared) |

---

## 🎓 How to Use This Repository

1.  **Explore by Pattern**: meaningful logic is separated into different folders. Click the "View" links above to dive deep into a specific architecture.
2.  **Study the Code**: Each folder contains a complete or reference implementation of that specific pattern.
3.  **Prepare for Interviews**: Use the `Interview-Questions.md` file to test your knowledge on these advanced topics.

---

## 🤝 Contributing

Feel free to open issues or PRs if you want to add a new pattern or improve an existing one!
