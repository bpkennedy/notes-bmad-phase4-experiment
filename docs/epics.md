## ✨ Epics and User Stories: Minimal Notes Service (v1.0)

Since there is no actual user interface, these Epics and User Stories are defined from the perspective of an **API Consumer (Developer)** to ensure comprehensive feature delivery and testability of the REST endpoints.

---

### Epic 1: Note Creation and Retrieval

This epic covers the functionality required to create a new Note resource and retrieve existing ones, ensuring data integrity and robust error handling.

| ID | User Story | Acceptance Criteria (AC) |
| :--- | :--- | :--- |
| **NS-1** | As an API consumer, I want to **create a new Note** by POSTing a `title` and `content` so that I can persist information. | **GIVEN** valid `title` and `content`, **WHEN** I `POST` to `/notes`, **THEN** I receive a `201 Created` response with the full Note object including a generated `id` and `createdAt` timestamp. |
| **NS-2** | As an API consumer, I want to **get a specific Note** by its ID so that I can view its complete details. | **GIVEN** a Note exists with ID `:id`, **WHEN** I `GET` `/notes/:id`, **THEN** I receive a `200 OK` response with the full Note object (including `content`). |
| **NS-3** | As an API consumer, I want to **handle a request for a non-existent Note** gracefully so that my application doesn't crash. | **GIVEN** a Note ID that does not exist, **WHEN** I `GET` `/notes/:id`, **THEN** I receive a `404 Not Found` response with a standard error body. |
| **NS-4** | As an API consumer, I want to **be prevented from creating an invalid Note** so that data integrity is maintained. | **GIVEN** I `POST` to `/notes` without a required field (`title` or `content`), **THEN** I receive a `400 Bad Request` response with an appropriate error message. |

---

### Epic 2: Note Listing and Deletion

This epic covers the functionality for bulk viewing (summary) and removal of Note resources, focusing on efficiency and completeness of the CRUD operations.

| ID | User Story | Acceptance Criteria (AC) |
| :--- | :--- | :--- |
| **NS-5** | As an API consumer, I want to **retrieve a list of all Notes** so that I can display a summary view to the user. | **WHEN** I `GET` `/notes`, **THEN** I receive a `200 OK` response with an array of Note objects. **AND** each object contains only `id`, `title`, and `createdAt` (summary view). |
| **NS-6** | As an API consumer, I want to **permanently delete a specific Note** by its ID so that I can remove obsolete data. | **GIVEN** a Note exists with ID `:id`, **WHEN** I `DELETE` `/notes/:id`, **THEN** I receive a `204 No Content` response. **AND** the Note can no longer be retrieved via `GET /notes/:id`. |
| **NS-7** | As an API consumer, I want to **handle a request to delete a non-existent Note** gracefully. | **GIVEN** a Note ID that does not exist, **WHEN** I `DELETE` `/notes/:id`, **THEN** I receive a `404 Not Found` response with a standard error body. |
