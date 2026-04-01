# Project: CampusCred - Student Rewarding System

## 1. Project Overview

This is a full-stack web application named **CampusCred**. It's a gamified, AI-assisted platform for colleges to award points to students for academic and extracurricular activities. The system features an AI pipeline to process uploaded proof documents, either auto-approving them or routing them to faculty for manual review.

**Architecture:**
- **Backend:** A RESTful API built with Python and the **FastAPI** framework. It uses **SQLAlchemy** as an ORM for database interaction and **Alembic** for handling database migrations.
- **Frontend:** A modern, responsive web interface built with **Next.js** (React) and styled with **Tailwind CSS**. It includes features like dashboards, leaderboards, and data visualizations using **Recharts**.
- **Database:** A **PostgreSQL** database, which the `README.md` suggests running locally. There are also Docker files suggesting containerization is an option.

## 2. Key Technologies

- **Backend:** Python, FastAPI, SQLAlchemy, Alembic, Pydantic, UV (Package Manager)
- **Frontend:** TypeScript, Next.js, React, Tailwind CSS, Framer Motion, Recharts
- **Database:** PostgreSQL
- **Linting/Formatting:** Pyright (for Python type checking), TypeScript (`tsc --noEmit`)

## 3. How to Build, Run, and Test

### Backend (FastAPI)

1.  **Install Dependencies:** From the project root, install Python packages using `uv`.
    ```shell
    uv sync
    ```

2.  **Configure Database:** Ensure your PostgreSQL server is running and update the credentials in `backend/app/core/config.py`.

3.  **Run Database Migrations:** Navigate to the backend directory and apply migrations.
    ```shell
    cd backend
    uv run alembic upgrade head
    ```

4.  **Run Server:** From the project root, start the development server.
    ```shell
    uv run uvicorn backend.app.main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

### Frontend (Next.js)

1.  **Navigate to Directory:**
    ```shell
    cd frontend
    ```

2.  **Install Dependencies:**
    ```shell
    npm install
    ```

3.  **Run Server:** Start the development server.
    ```shell
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

4.  **Lint:** Check for TypeScript errors.
    ```shell
    npm run lint
    ```

## 4. Development Conventions

- The backend uses `uv` for package management, which is faster than `pip`. Dependencies are defined in `pyproject.toml`.
- The frontend uses `npm` for package management, with dependencies and scripts defined in `frontend/package.json`.
- The backend relies on Alembic for database schema migrations. Migration files are located in `backend/alembic/versions`.
- The frontend uses Tailwind CSS for styling. The configuration is in `frontend/tailwind.config.ts`.
- The project includes test credentials for `admin` and `faculty` roles, as detailed in the `README.md`.
