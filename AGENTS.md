# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Student Rewarding System (SRS) — a gamified college rewarding platform with AI-assisted academic point verification for extracurricular, co-curricular, and global activities. Three user roles: **Student**, **Faculty**, **Admin**. The frontend is built out with static/mock data; the backend and database are scaffolded but not yet implemented.

## Architecture

The repo is a monorepo with three top-level directories:

- **frontend/** — Next.js (App Router) + TypeScript + Tailwind CSS 3. All pages use the Next.js `app/` directory convention (file-based routing). No `src/` directory; components, lib, and app sit directly under `frontend/`.
- **backend/** — Python FastAPI scaffold. Intended stack: FastAPI + SQLAlchemy (async) + asyncpg + Alembic migrations + python-jose (JWT auth) + OpenAI + pytesseract/pdf2image for document/image processing.
- **database/** — Docker Compose for PostgreSQL 16 with pgvector extension. Init scripts in `database/postgres/init/`, migrations in `database/postgres/migrations/`.

## Build & Run Commands

### Frontend
```
# From frontend/ directory
npm install
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run lint         # TypeScript type-check (tsc --noEmit)
```

### Backend
```
# From repo root (venv at .venv/)
.venv\Scripts\activate     # Windows
pip install -r requirements.txt
uvicorn backend.app.main:app --reload   # (once main.py exists)
```

### Database
```
# From database/ directory
docker compose up -d        # Start PostgreSQL
docker compose down          # Stop PostgreSQL
```
Connection: `postgresql://postgres:postgres@localhost:5432/student_rewards`

## Frontend Patterns

### Routing & Page Structure
Three role-based portals with separate login flows:
- `/student-login`, `/student-register`, `/student/dashboard`, `/student/claim-points`, `/student/my-ledger`, `/student/leaderboard`
- `/faculty-login`, `/faculty/dashboard`, `/faculty/review-queue`, `/faculty/audit-log`, `/faculty/direct-award`
- `/admin-login`, `/admin/dashboard`, `/admin/user-management`, `/admin/point-rules`, `/admin/ai-settings`, `/admin/bulk-deductions`

Navigation items for each role are defined in `frontend/lib/nav.ts`.

### Layout Components
- **`AuthLayout`** (`components/auth/AuthLayout.tsx`) — shared auth page wrapper (login/register forms). Takes `title`, `subtitle`, `fields[]`, `buttonLabel`, and `links[]` props.
- **`PortalLayout`** (`components/ui/PortalLayout.tsx`) — shared dashboard/portal wrapper with header nav. Takes `title`, `description`, `navItems[]`, and `children`.

### Shared UI Components
- `StatCard` — metric display card used on dashboards
- `Badge` — status/source badge with typed variants (`ai-processing`, `approved`, `manual-review`, `rejected`, `ai`, `manual`, `status-approved`, `status-pending`, `status-rejected`, `status-deduction`)

### Path Aliases
TypeScript path alias `@/*` maps to `frontend/*` (configured in `tsconfig.json`). Always use `@/components/...`, `@/lib/...` imports.

## Design System & Styling

**Single source of truth:** `frontend/STYLING_REFERENCE.md` and `frontend/lib/design-tokens.ts`.

### Colors (Tailwind tokens)
- `brand-primary` → `#8F113B` (red) — buttons, headings, accents, CTAs
- `brand-secondary` → `#FFFFFF` — backgrounds, cards
- `brand-tertiary` → `#c6c6c6` (grey) — borders, dividers, gradients
- `brand-text` → `#1F2937` — body text

### Fonts (CSS variables & Tailwind classes)
- `font-primary` / `--font-primary` — Alteix Sans (body text)
- `font-secondary` / `--font-secondary` — Timeburner (headings)
- `font-tertiary` / `--font-tertiary` — Queensides Medium (labels, captions)

Font files live in `assets/fonts/` and are loaded via `@font-face` in `frontend/app/globals.css`.

### CSS Utilities (defined in globals.css)
- `.card` — `rounded-2xl border border-brand-tertiary bg-secondary p-5 shadow-soft`
- `.heading` — `font-secondary text-brand-primary`
- `.bg-gradient-tertiary` — tertiary-based page background gradient

### Styling Rules
- Use tertiary color gradients on page backgrounds
- Primary buttons: `bg-brand-primary text-white`
- Cards/sections: white background with `border-brand-tertiary`
- Headings use `font-secondary` + `text-brand-primary` (or the `.heading` class)

## Backend Structure (Scaffolded)

- `backend/app/api/v1/` — FastAPI route modules
- `backend/app/core/` — settings, security, config
- `backend/app/services/` — business logic and AI verification pipeline
- `backend/app/models/` — SQLAlchemy ORM models and Pydantic schemas
- `backend/tests/` — backend test directory

### Key Dependencies
- Auth: python-jose (JWT) + passlib (bcrypt)
- AI/Embeddings: OpenAI API + pgvector
- Document processing: pytesseract + pdf2image + Pillow
- Data: pandas, numpy
- Migrations: Alembic

## Notes
- `frontend/lib/theme.ts` contains stale color values (`#722F37`, `#F4C542`) — do NOT use these; always follow `design-tokens.ts` and `STYLING_REFERENCE.md`.
- The frontend currently uses hardcoded mock data (no API calls yet). When implementing API integration, the mock data patterns in existing pages show the expected data shapes.
- The Python virtualenv is at the repo root (`.venv/`), not inside `backend/`.
