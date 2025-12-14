## 📐 Minimal Notes Service Architecture Document

### 1\. Architectural Style

The service utilizes a **Layered/Clean Architecture** approach. This separates the application into distinct layers—Presentation, Business Logic, and Data Access—to achieve high cohesion, loose coupling, and testability. This approach ensures that changes to the database (Data Layer) or the API framework (Presentation Layer) do not require significant changes to the core business rules (Service Layer).

-----

### 2\. Component Structure and Responsibilities

The application is structured into the following primary directories, each representing a logical layer:

#### `src/` Directory Structure

```
src/
├── **api/** # Presentation/Controller Layer (Express)
│   ├── notes/
│   │   ├── notes.controller.ts # Handles HTTP requests/responses, calls service
│   │   └── notes.router.ts     # Defines URL routes
│   └── index.ts          # Express application initialization
├── **core/** # Business Logic/Service Layer
│   ├── notes/
│   │   └── notes.service.ts    # Core CRUD logic, validation, data orchestration
│   └── errors.ts         # Custom application error classes (e.g., NotFoundError)
├── **data/** # Data Access Layer (Repository)
│   ├── notes/
│   │   └── notes.repository.ts # Abstracts Prisma; interacts directly with DB
│   └── prisma/           # Prisma schema and generated client
│       └── schema.prisma
├── **types/** # Shared TypeScript interfaces for data models (DTOs)
│   └── note.types.ts
└── **server.ts** # Application entry point (initializes services and starts Express)
```

#### Layer Responsibilities

| Component/Layer | Primary Responsibility | Key Dependencies |
| :--- | :--- | :--- |
| **Presentation (Controller/Router)** | Maps HTTP requests to service calls; handles request body validation; formats and sends final HTTP responses (status codes, JSON structure). | Service Layer, Types |
| **Business Logic (Service)** | Contains all primary business rules (e.g., ensuring required fields exist beyond basic type checking); orchestrates data flow; enforces data structure rules. | Repository Layer, Types |
| **Data Access (Repository)** | Provides an interface for the Service layer to access data; handles all direct database interaction (Prisma ORM calls); abstracts database specifics away from the Service. | Prisma Client, Types |

-----

### 3\. Data Flow Example: Create Note (`POST /notes`)

This illustrates the request lifecycle through the layers:

1.  **Client $\rightarrow$ Router:** A client sends a `POST` request to `/notes`. The `notes.router.ts` receives it.
2.  **Router $\rightarrow$ Controller:** The router forwards the request payload and context to the `NotesController.createNote` method.
3.  **Controller $\rightarrow$ Service:** The Controller performs basic sanity checks (e.g., fields are present) then calls `NotesService.createNote(data)`.
4.  **Service $\rightarrow$ Repository:** The Service applies business validation (if any) and calls `NotesRepository.create(data)`.
5.  **Repository $\rightarrow$ Prisma/DB:** The Repository executes the Prisma client command (`prisma.note.create(...)`).
6.  **DB $\rightarrow$ Repository:** MySQL returns the newly created record.
7.  **Repository $\rightarrow$ Service:** The Repository returns the raw data (or a clean type) to the Service.
8.  **Service $\rightarrow$ Controller:** The Service returns the final Note object to the Controller.
9.  **Controller $\rightarrow$ Client:** The Controller sets the `201 Created` status code and sends the Note object back as a JSON response.

-----

### 4\. Technology Stack Detail

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Runtime** | Node.js | Server environment for Express and TypeScript execution. |
| **Language** | TypeScript | Provides static typing for improved code quality and maintainability. |
| **Web Framework** | Express | Minimalist framework for defining the REST API endpoints. |
| **Database** | MySQL (via Docker) | Relational database for persistent storage. |
| **ORM** | Prisma | Modern ORM used by the Repository to interact with MySQL, simplifying data access and ensuring type safety. |
| **Local Environment** | Docker Compose | Used to manage and link the MySQL database container and the Node.js application environment. |

-----

### 5\. Local Environment Configuration

The local development environment is defined via a single `docker-compose.yml` file.

  * **Database Service:** A `mysql` container (e.g., `mysql:8.0`) is configured with environment variables for credentials and port mapping. A persistent volume is mounted for data integrity.
  * **Application Service:** A Node.js container is defined, linking to the database service. It runs the TypeScript build and starts the Express server.
  * **Prisma Setup:** The `DATABASE_URL` environment variable within the application service points directly to the linked MySQL service host name (e.g., `mysql://user:pass@db:3306/notes_db`).
  * **Initialization:** The `docker-compose up` command handles the entire setup, and Prisma is used to manage migrations against the local MySQL instance.
