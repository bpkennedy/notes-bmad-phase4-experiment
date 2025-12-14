## 📝 Minimal Notes Service Product Requirements Document (PRD) v1.0

### 1. Goal

To deliver a minimal, robust, and well-structured backend service for managing Note resources, strictly adhering to the specified technology stack and scope constraints. This service will serve as a clean, conventional REST API foundation for potential future expansion or consumption by a frontend client.

---

### 2. Scope & Constraints

| Feature | Status | Constraint |
| :--- | :--- | :--- |
| **Notes CRUD** | **IN SCOPE** | Create, List, Get by ID, Delete |
| **Tech Stack** | **FIXED** | Node.js/TypeScript, Express, MySQL, Prisma |
| **Authentication** | OUT OF SCOPE | No user accounts or login |
| **Deployment** | OUT OF SCOPE | Local development via Docker Compose only |
| **Frontend** | OUT OF SCOPE | API-only service |

---

### 3. Data Model

The primary entity is the **Note**.

| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| `id` | UUID (String) | Unique identifier for the Note. | Primary Key, Server-Generated |
| `title` | String | A short, descriptive title for the Note. | Required, Min 1 character |
| `content` | String | The main body of the Note. | Required |
| `createdAt` | DateTime | Timestamp of Note creation. | Server-Generated, ISO 8601 format |

---

### 4. API Endpoints (RESTful)

All endpoints utilize the base path `/notes`. JSON response bodies will use `camelCase`.

| Operation | HTTP Method | Endpoint | Request Body | Success Response | Error Codes | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Create Note** | `POST` | `/notes` | `{title: string, content: string}` | `201 Created`, Full Note object | `400 Bad Request` (Validation errors) | Returns the newly created Note object. |
| **List Notes** | `GET` | `/notes` | N/A | `200 OK`, Array of Note summaries | `500 Internal Server Error` | Summary includes only `id`, `title`, and `createdAt`. |
| **Get Note** | `GET` | `/notes/:id` | N/A | `200 OK`, Full Note object | `404 Not Found` | Retrieves full details including `content`. |
| **Delete Note** | `DELETE` | `/notes/:id` | N/A | `204 No Content` | `404 Not Found` | No response body on success. |

---

### 5. Non-Functional Requirements

* **Code Quality:** Strict adherence to TypeScript typing and conventional separation of concerns (Layered Architecture).
* **Local Setup:** The service must be easily runnable via a single `docker-compose up` command, managing both the Node.js application and the MySQL database.
* **Error Handling:** All error responses must use standard HTTP status codes and provide a consistent JSON error body format: `{"error": "A detailed message about the issue"}`.
* **Testing:** Basic unit and integration tests must be included to cover all core CRUD operations and validation rules defined in the Acceptance Criteria.
