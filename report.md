# CampusCred (RDSYS) - Comprehensive Project Analysis Report

## 1. Project Overview
**CampusCred (Student Rewarding System)** is a full-stack, gamified, AI-assisted platform designed for educational institutions to award points to students for academic and extracurricular activities. The platform allows students to upload proof documents, which are either auto-approved via an AI pipeline or routed to faculty for manual review.

The system caters to three primary roles:
- **Student:** Can view their dashboard, submit claims, check their ledger, and view the leaderboard.
- **Faculty:** Can view their dashboard, review pending claims, perform direct point awards, and check audit logs.
- **Admin:** Can manage users, configure point rules, adjust AI settings, and apply bulk point deductions.

## 2. Architecture & Tech Stack
The project follows a standard decoupled Monorepo architecture separating frontend and backend operations.

### Frontend
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Framer Motion (for animations)
- **UI Components & Icons:** Lucide React, Recharts (for dashboards)
- **Key Directories:**
  - `app/`: Next.js app router containing routes for `student`, `faculty`, `admin-portal`, `student-login`, `faculty-login`, `admin-login`, `leaderboard`, etc.
  - `components/`: Contains modular UI elements (`Buttons`, `DashboardWidgets`, `auth`, `badges`, `charts`, `modals`, `ui`).
  - `lib/`: Configuration files (`nav.ts`, `theme.ts`, `badges.ts`, `activity-rewards.ts`).

### Backend
- **Framework:** FastAPI
- **Language:** Python 3.14+ (managed via `uv`)
- **Database:** PostgreSQL (with AsyncPG driver)
- **ORM & Migrations:** SQLAlchemy (async), Alembic
- **Authentication:** JWT via `python-jose`, password hashing via `passlib[bcrypt]`
- **Core AI & File Processing:**
  - **Claude (`claude`):** Used for the AI claim processing pipeline.
  - **PyMuPDF (`pymupdf`) & Pillow (`pillow`):** Used for document and image processing.
  - **Storage (`supabase`):** Backend-as-a-service storage for uploaded proofs.
- **Key Directories:**
  - `app/api/routes/`: Route handlers for `admin`, `auth`, `claims`, `faculty`, `student`.
  - `app/models/`: Database models (`activity`, `badge`, `batch_deduction`, `claim`, `user`).
  - `app/services/`: Core logic (`ai_processing`, `badge_engine`, `compression`, `storage`).

## 3. Database Schema Overview
The database uses PostgreSQL to manage the data flow from user registration to badge assignments.
- **Users:** Stores authentication and profile data (`id`, `registration_number`, `role`).
- **Activities:** Pre-defined tasks with their point values (e.g., Hackathon, NPTEL).
- **Claims:** Submission tickets linking users to activities, containing proof URLs and status (`AI_PROCESSING`, `APPROVED`, `REJECTED`, `MANUAL_REVIEW`).
- **Badges:** Point thresholds mapping to distinct badges (e.g., Silver, Gold).
- **Batch Deductions:** Handles admin-level bulk penalization operations.

## 4. UI/UX Design System
A highly custom and specific design system has been mapped into the Next.js `theme.ts` and Tailwind config:
- **Brand Colors:** Primary (`#831238` - Red), Secondary (`#FFFFFF`), Ascent (`#FBEFF1`), Black (`#14110F`), Grey (`#F5F5F5`).
- **Typography:**
  - *Primary Body:* Swansea (`--font-primary`)
  - *Secondary Headings:* Timeburner Bold (`--font-secondary`)
  - *Tertiary Accents:* Alteix Sans Regular (`--font-tertiary`)

## 5. Automated AI Pipeline (The "CampusCred Engine")
When a student submits a proof of activity (PDF/Image), the following lifecycle occurs:
1. **Upload & Compression:** Processed via `compression.py` and uploaded to `storage.py` (Supabase).
2. **AI Processing:** `ai_processing.py` uses the `claude` client to validate the proof against the rules in `activity-proof-rules.ts`.
3. **Routing:** If the confidence is high, it's auto-approved. Otherwise, the claim status is flagged for manual faculty review.
4. **Badge & Points Engine:** Upon approval, `badge_engine.py` re-calculates the student's aggregate points and updates their badge ranking.

## 6. Current State & Pending Implementations
- **Frontend Setup:** Seems largely structurally complete with well-defined routing and authentication screens. Navigation and static typing configurations are mostly finalized.
- **Backend Setup:** Scaffolded fully with core services, models, and FastAPI routes integrated. Alembic migrations and environment variables are properly wired.
- **Testing:** Test credentials exist (`admin`/`password123`, `faculty1`/`password123`), and endpoints such as `PUT /api/claims/{claim_id}/test-approve` exist to simulate the AI approval pipeline.
