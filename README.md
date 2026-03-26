# CampusCred - Student Rewarding System

**Team Name:** CoffeeCompiled

CampusCred is a gamified, AI-assisted platform for colleges to award points to students for academic and extracurricular activities. Uploaded proof documents are processed via an AI pipeline to auto-approve or route claims to faculty for manual review.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.x or higher)
- **Python** (v3.11.x or higher)
- **PostgreSQL** (Desktop Version)
- **uv** (Python package manager)

---

## 🛠️ Installation & Setup

### Backend (FastAPI)

1. **Install dependencies:**
   From the project root, run:
   ```powershell
   uv sync
   ```

2. **Database Configuration:**
   Ensure your local PostgreSQL server is running and update the credentials in `backend/app/core/config.py`:
   - `POSTGRES_USER`: `postgres`
   - `POSTGRES_PASSWORD`: `1695`
   - `POSTGRES_DB`: `student_rewards`

3. **Run Migrations:**
   Initialize the database schema:
   ```powershell
   cd backend
   uv run alembic upgrade head
   ```

### Frontend (Next.js)

1. **Navigate to the frontend directory:**
   ```powershell
   cd frontend
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

---

## 🏃 Running the Application

### Start the Backend Server
From the project root:
```powershell
uv run uvicorn backend.app.main:app --reload
```
The API will be available at `http://localhost:8000`.

### Start the Frontend Server
From the `frontend/` directory:
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Dependencies

### Backend
| Package | Version | Purpose |
|---------|---------|---------|
| `fastapi` | `^0.135.1` | Modern web framework for building APIs. |
| `sqlalchemy` | `^2.0.48` | SQL Toolkit and Object-Relational Mapper (ORM). |
| `alembic` | `^1.18.4` | Database migration tool. |
| `psycopg` | `^3.3.3` | PostgreSQL adapter for Python. |
| `pydantic-settings` | `^2.13.1` | Settings management using Pydantic. |
| `passlib` | `^1.7.4` | Password hashing and security. |
| `python-jose` | `^3.5.0` | JWT implementation for authentication. |
| `uvicorn` | `^0.41.0` | ASGI server implementation. |
| `python-multipart` | `^0.0.22` | Support for form data and file uploads. |

### Frontend
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | `latest` | React framework for production. |
| `react` | `latest` | Core library for building UI. |
| `tailwindcss` | `^3.4.17` | Utility-first CSS framework. |
| `framer-motion` | `^12.35.1` | Animation library for React. |
| `lucide-react` | `^0.577.0` | Beautiful icons for the UI. |
| `recharts` | `^3.8.0` | Charting library for dashboards. |
| `typescript` | `latest` | Static type checking for JavaScript. |

---

## 👥 Team
**CoffeeCompiled**
