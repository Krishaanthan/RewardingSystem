# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

RDSYS is a **Student Rewarding System (SRS)** — a gamified, AI-assisted platform for colleges to award points to students for academic and extracurricular activities. Uploaded proof documents (PDFs/images) are processed by an AI pipeline (OpenAI + OCR) to auto-approve or route claims to faculty for manual review.

Three user roles exist: **Student**, **Faculty**, and **Admin**, each with their own portal.

---

## Commands

### Frontend (`frontend/`)

```bash
# Install dependencies
npm install

# Dev server (http://localhost:3000)
npm run dev

# Type-check (lint)
npm run lint

# Production build
npm run build
```

> `npm run lint` runs `tsc --noEmit` — there is no ESLint config currently.

### Backend (`backend/`)

The backend is scaffolded but not yet implemented. The intended stack is **FastAPI + SQLAlchemy + PostgreSQL** (via Uvicorn).

```bash
# Create and activate virtual env (from repo root)
python -m venv .venv
.venv\Scripts\Activate.ps1    # Windows PowerShell

# Install dependencies
pip install -r requirements.txt

# Run dev server (once app entry point exists)
uvicorn app.main:app --reload
```

### Database (`database/`)

```bash
# Start PostgreSQL container
docker-compose -f database/docker-compose.yml up -d

# Stop
docker-compose -f database/docker-compose.yml down
```

Connection: `postgresql://postgres:postgres@localhost:5432/student_rewards`

### Migrations (Alembic — backend)

```bash
alembic upgrade head
alembic revision --autogenerate -m "description"
```

---

## Architecture

### Monorepo Layout

```
RDSYS/
├── frontend/        # Next.js App Router (TypeScript + Tailwind)
├── backend/         # FastAPI (Python) — scaffolded only
├── database/        # Docker Compose + PostgreSQL init/migration scripts
├── assets/          # Static assets
└── requirements.txt # Python dependencies (shared / root-level)
```

### Frontend — Next.js App Router

Pages are organized by role under `frontend/app/`:

| Role | Login | Portal routes |
|------|-------|---------------|
| Student | `/student-login`, `/student-register` | `/student/{dashboard,claim-points,my-ledger,leaderboard}` |
| Faculty | `/faculty-login` | `/faculty/{dashboard,review-queue,audit-log,direct-award}` |
| Admin | `/admin-login` | `/admin/{dashboard,user-management,point-rules,ai-settings,bulk-deductions}` |

**Shared components** (`frontend/components/`):
- `ui/PortalLayout` — wraps all portal pages; accepts a `navItems` array (from `lib/nav.ts`) to render the top nav.
- `ui/StatCard` — metric card used on dashboards.
- `ui/Badge` — status badge with variants: `ai-processing | approved | manual-review | rejected`.
- `ui/Button` — button with variants: `primary | secondary | outline`.
- `auth/AuthLayout` — wraps all login/register forms; declaratively accepts `fields`, `links`, etc.

**Conventions:**
- Navigation arrays for each role live in `lib/nav.ts` (`studentNav`, `facultyNav`, `adminNav`). Always import from here when building new portal pages.
- Brand tokens are in `lib/theme.ts` and mirrored into `tailwind.config.ts`. Use Tailwind classes like `bg-brand-primary`, `text-brand-secondary`, `shadow-soft`, `.card`, `.heading` — do not use raw hex values in JSX.
- Fonts: `--font-primary` = Inter (sans-serif body), `--font-secondary` = Playfair Display (headings via `.heading` class).
- Path alias `@/` maps to `frontend/` root (configured in `tsconfig.json`).

### Backend — FastAPI (Project Structure)

```
backend/app/
├── main.py                 # FastAPI application instance & global config
├── core/
│   ├── config.py           # Environment variables (DB URI, JWT Secret)
│   └── security.py         # Password hashing and JWT generation logic
├── api/
│   ├── dependencies.py     # Auth extraction (get_current_user)
│   └── routes/
│       ├── auth.py         # Login and Registration endpoints
│       ├── claims.py       # Claim submissions and status retrieval
│       └── profile.py      # Student profile, badge, and points aggregation
├── services/               # Business logic; AI verification pipeline
├── models/                 # SQLAlchemy Database Models
│   ├── user.py             
│   ├── activity.py         
│   ├── claim.py            
│   └── badge.py            
├── schemas/                # Pydantic models for request/response validation
│   ├── user_schema.py
│   └── claim_schema.py
└── db/
    ├── session.py          # PostgreSQL connection pool
    └── base.py             # SQLAlchemy declarative base
```

The AI verification pipeline (in `services/`) is the core business logic: it receives uploaded documents, runs OCR (pytesseract/pdf2image/Pillow), calls OpenAI to verify authenticity, and returns a confidence score. Claims above the auto-approval threshold are approved automatically; those below go to the faculty review queue.

### Database — PostgreSQL + pgvector

The primary persistence layer is **PostgreSQL**, accessed asynchronously via **SQLAlchemy**.

- PostgreSQL 16 via Docker (Connection: `postgresql://postgres:postgres@localhost:5432/student_rewards`).
- `pgvector` extension is bootstrapped by `database/postgres/init/001_extensions.sql`.
- Alembic migrations go in `database/postgres/migrations/`.
- Async DB access via SQLAlchemy (asyncio) + asyncpg.

#### Schema Definitions:
- **`users`**: `id` (UUID), `registration_number` (Unique), `password_hash`, `name`, `department`, `role` (STUDENT, FACULTY, ADMIN).
- **`activities`**: `id` (PK), `activity_name`, `points_awarded`.
- **`claims`**: `id` (UUID), `student_id` (FK), `activity_id` (FK), `proof_url`, `status` (AI_PROCESSING, APPROVED, REJECTED).
- **`badges`**: `id` (PK), `badge_name`, `required_points`.

### API Endpoint Mapping

- **Auth**: `POST /api/auth/register`, `POST /api/auth/login` (JWT).
- **Claims**: `POST /api/claims/submit` (initial status `AI_PROCESSING`), `GET /api/claims/statuses` (student's view), `GET /api/claims/approved` (global approved list).
- **Profile**: `GET /api/student/profile` (aggregates points and awards badges).
- **Testing**: `PUT /api/claims/{claim_id}/test-approve` (manual status override).
