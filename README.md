# BMAD Phase 4 Experiment: Full Planning → Minimal Execution

This repository documents an experiment exploring whether **BMAD-style full planning** (PRD, architecture, epics) can be followed by a **minimal, low-ceremony execution flow** using lightweight models without relying on BMAD’s default Phase 4 tooling.

The goal was to test **BMAD as a method**, not as a prompt pack or repo-installed toolchain.

---

## Summary

**Hypothesis**

> If BMAD planning artifacts are truly authoritative, Phase 4 execution should be swappable or reducible without sacrificing correctness.

**Result**

- Full planning → minimal execution **works**
- Core logic implementation was straightforward
- Most friction occurred in **runtime scaffolding**, not planning or reasoning
- After stabilization, run-rate slice execution is fast and may legitimately be a “no-op with confirmation”

---

## Repository Contents

```text
docs/
prd.md
architecture.md
epics.md
project-context.md

src/
api/
core/
data/
server.ts

docker-compose.yml
Dockerfile

```

The `docs/` directory contains the authoritative planning artifacts generated during Phases 1–3 and treated as **fixed constraints** during execution.

---

## Planning (BMAD Phases 1–3)

Planning was performed using a BMAD-style cross-functional team instantiated in **Gemini 3 Pro**, following strict phase separation:

- Discovery
- PRD
- Architecture
- Epics

The project was intentionally small and boring:

- Minimal Notes REST API
- TypeScript + Node.js (Express)
- MySQL via Docker Compose
- Prisma ORM
- No auth, no frontend, no cloud deploy

Outputs were committed as markdown files:
- `docs/prd.md`
- `docs/architecture.md`
- `docs/epics.md`
- `docs/project-context.md`

Once committed, these artifacts were treated as **authoritative and frozen**.

---

## Tracer Bullet Execution (NS-1)

**Tracer bullet:** `NS-1`  
> POST `/notes` with `{title, content}` returns `201` with full Note (`id`, `createdAt`).

Execution approach:
- Used a **lightweight execution model** (Claude Haiku via VSCode agent)
- No story artifacts, sprint docs, or QA gates
- Planning docs used strictly as constraints
- End-to-end implementation (Express → service → repo → Prisma → MySQL)

### Result

The tracer bullet is now fully reproducible:

```bash
docker compose up -d --build
````

```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","content":"World"}'
```

Returns:

```json
{
  "id": "uuid",
  "title": "Hello",
  "content": "World",
  "createdAt": "timestamp"
}
```

---

## What Was Learned

### What Worked Well

* Planning artifacts were sufficient for correct implementation
* Execution model did not need to reinterpret requirements
* Architecture boundaries were respected without ceremony

### Where Friction Occurred

Almost all difficulty was **runtime scaffolding**, not planning or reasoning:

* Docker + Prisma lifecycle issues
* `migrate dev` vs `migrate deploy` (shadow DB permissions)
* Host vs container DB hostnames (`localhost` vs `db`)
* Bind mounts overwriting build artifacts
* OpenSSL availability in container
* Prisma client binary target mismatch (macOS → Linux)
* Ensuring `prisma generate` runs inside the image build

All fixes were **mechanical**, not architectural.

---

## Run-Rate Follow-Up (NS-4)

**NS-4:** Prevent creating invalid Notes (missing `title` or `content`) with `400` + `{"error": "..."}`.

Using the same minimal execution approach:

* The agent inspected the existing codebase
* Correctly concluded NS-4 was **already implemented**
* No code changes were required

Only gap discovered:

* `npm test` points to `jest`, but `jest` is not installed

**Key observation**

> Minimal execution can legitimately mean **“no-op with confirmation.”**
> The agent did not invent work.

---

## Implications for BMAD Phase 4

This experiment suggests:

* BMAD planning artifacts are **portable and durable**
* Phase 4 does not need to be monolithic
* There is strong justification for **Phase 4 pluralism**:

  * story-driven execution
  * quick-dev / slice-based execution
  * epic-level execution
  * TDD-first execution

The largest leverage for improving Phase 4 appears to be:

* standardizing **runtime templates** (Docker, Prisma, env patterns)
* rather than adding more planning artifacts

---

## Bottom Line

This was not “BMAD without BMAD.”

It was **BMAD used as a method**, with Phase 4 intentionally simplified to test modularity.

**Conclusion:**
Full BMAD planning → minimal execution is viable.
The dominant cost in Phase 4 today is runtime scaffolding, not planning or reasoning.

---

## Reproduction

```bash
docker compose up -d --build
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","content":"World"}'
```

## Scope of This Experiment (Important)

This experiment intentionally did not install or use the BMAD Phase 4 toolchain (`create-tech-spec`, `quick-dev`, story files, etc.).

This was deliberate.

The goal was to first test the **lower bound**:
> Are BMAD Phases 1–3 (PRD, architecture, epics) sufficient to drive correct execution _without_ BMAD’s execution machinery?

This experiment confirms that they are.

**What this experiment did not yet test:**
* Explicit epic → vertical slice reformatting
* Using `create-tech-spec` or `quick-dev` as execution drivers
* Whether slice definitions or diffs serve as sufficient execution records
* Whether a lightweight “execution log” artifact should replace story files

These are now clearly scoped as **follow-on experiments**, enabled by the result here.