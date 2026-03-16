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
D:\GitHub\RDSYS\.venv\Scripts\Activate.ps1    # Windows PowerShell

# Install dependencies
 uv add or uv sync

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

This modular structure keeps your authentication, database models, and claim routing separated for easier maintenance.

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

---

### Database Schema (PostgreSQL)

These tables are designed to handle the exact data flow from registration to the final badge assignment.

- **`users` Table (Authentication):**
    - `id` (UUID, Primary Key)
    - `registration_number` (String, Unique) - Used for logging in.
    - `password_hash` (String)
    - `name` (String)
    - `department` (String)
    - `role` (Enum: STUDENT, FACULTY, ADMIN)

- **`activities` Table (Pointing System):**
    - `id` (Integer, Primary Key)
    - `activity_name` (String) - e.g., "Hackathon Participation", "NPTEL Course".
    - `points_awarded` (Integer) - The specific points assigned to this activity.

- **`claims` Table (Submission Statuses & Approved Activities):**
    - `id` (UUID, Primary Key)
    - `student_id` (Foreign Key -> `users.id`) - Links the applied claim to the specific student.
    - `activity_id` (ForeignKey -> `activities.id`) - Links to the specific activity.
    - `proof_url` (String) - The hosted link to the uploaded certificate/image.
    - `status` (Enum: `AI_PROCESSING`, `APPROVED`, `REJECTED`) - Tracks the current state of the submission.

- **`badges` Table:**
    - `id` (Integer, Primary Key)
    - `badge_name` (String) - e.g., "Silver", "Gold".
    - `required_points` (Integer) - The point threshold needed to unlock this badge.

---

### API Endpoint Mapping

These RESTful endpoints translate the logical flow of your application into actionable HTTP requests.

- **Auth**:
    - `POST /api/auth/register`: Accepts student details. The data is updated and stored in the database's `users` table.
    - `POST /api/auth/login`: Accepts a registration number and password. Data is verified against the registered student table to authenticate and return a JWT.

- **Claims**:
    - `POST /api/claims/submit`: Handles the file upload and activity selection. It updates the database to show the student applied for the activity and automatically sets the initial status to `AI_PROCESSING`.
    - `GET /api/claims/statuses`: Retrieves data from the claim points table to populate the submission statuses page for the logged-in student.
    - `GET /api/claims/approved`: Powers the Approved Activity Table. It returns all approved activities with the details of the student and displays the accumulated points tied to those activities.

- **Profile**:
    - `GET /api/student/profile`: Aggregates the total points from the user's approved activities and compares them against the `badges` table thresholds. It returns the total points and the specific awarded badge for the frontend to display.

- **Testing**:
    - `PUT /api/claims/{claim_id}/test-approve`: A dedicated endpoint for testing purposes. This manually edits the claim table to change the status from `AI_PROCESSING` to `APPROVED`.
