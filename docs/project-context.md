## 📰 Project Context Document: Minimal Notes Service

### 1. Executive Summary

This project delivers a **Minimal Notes Service**, a foundational backend API that adheres strictly to RESTful principles and the specified technology stack. Its primary purpose is to provide standard CRUD (Create, Read, Update, Delete) functionality for a single entity, the `Note`. The service is scoped intentionally narrow to prioritize clarity, maintainability, and best practices in application architecture (Clean/Layered) and local developer setup.

| Key Constraint | Value/Decision |
| :--- | :--- |
| **Scope** | API-only (No Frontend, No Auth, No Cloud) |
| **Technology Stack** | TypeScript, Node.js, Express, MySQL, Prisma ORM |
| **Primary Goal** | Deliver a clean, conventional, and testable codebase foundation. |

---

### 2. Stakeholder Alignment (The "Why" and "Who")

The primary "stakeholder" or consumer of this project is a **hypothetical consuming application (developer)**. The success of this project is measured by the **usability and robustness of the API contract** and the **clarity of the codebase**.

| Role/Concern | How This Project Addresses It |
| :--- | :--- |
| **Product Manager** | Clear PRD, defined API contract, and strict scope adherence. |
| **Tech Lead/Engineers** | Layered Architecture (separation of concerns) and fixed, modern stack constraints for stability. |
| **QA Engineer** | Explicit Acceptance Criteria for every endpoint ensures testability. |
| **DevOps Engineer** | Simplified setup via single `docker-compose.yml` for local development. |

---

### 3. Key Decisions & Data Structure

#### 3.1. API Design

We are adopting a **RESTful Naming Convention** with clear HTTP methods and status codes.

| Operation | Path | Success Code |
| :--- | :--- | :--- |
| Create | `POST /notes` | `201 Created` |
| Retrieve One | `GET /notes/:id` | `200 OK` |
| List All | `GET /notes` | `200 OK` |
| Delete | `DELETE /notes/:id` | `204 No Content` |

#### 3.2. Note Entity Data Model

| Field | Type | Implementation Detail |
| :--- | :--- | :--- |
| `id` | String | Implemented as a **UUID** (server-generated). |
| `title` | String | Mandatory input. |
| `content` | String | Mandatory input. |
| `createdAt` | DateTime | **Server-generated** timestamp (ISO 8601). |

---

### 4. Technical Approach Summary

The architecture is designed to maximize separation and testability:

| Layer | Technology/Role | Key Concern |
| :--- | :--- | :--- |
| **Presentation** | Express Controller | Handles request/response cycles. |
| **Service (Core)** | TypeScript Class | Business logic and validation. |
| **Data Access** | Prisma Repository | Abstracts database calls (CRUD). |

**Local Setup:** The service will be managed entirely through Docker Compose, running a MySQL container alongside the Node.js application, ensuring environment parity for all developers.

---

### 5. Definition of Done (DoD)

The project is considered complete when the following criteria are met:

1.  All four CRUD operations (`POST`, `GET`, `LIST`, `DELETE`) are implemented and pass validation.
2.  All Acceptance Criteria (NS-1 through NS-7) have been verified by the QA Engineer.
3.  The codebase strictly adheres to the established Layered Architecture (Service/Repository separation).
4.  The entire service can be spun up, migrated, and run successfully with a single `docker-compose up`.
5.  Error handling consistently returns correct HTTP status codes (`400`, `404`, `500`) and the standard error body format.
