Here is the complete backend architecture for CampusCred, organized into the folder structure, database schema, and API endpoint mapping. This setup is specifically optimized for FastAPI and PostgreSQL.

### 1. Folder Structure

This modular structure keeps your authentication, database models, and claim routing separated for easier maintenance.

Plaintext

```
campuscred-backend/
├── app/
│   ├── main.py                 # FastAPI application instance & global config
│   ├── core/
│   │   ├── config.py           # Environment variables (DB URI, JWT Secret)
│   │   └── security.py         # Password hashing and JWT generation logic
│   ├── api/
│   │   ├── dependencies.py     # Auth extraction (get_current_user)
│   │   ├── routes/
│   │   │   ├── auth.py         # Login and Registration endpoints
│   │   │   ├── claims.py       # Claim submissions and status retrieval
│   │   │   └── profile.py      # Student profile, badge, and points aggregation
│   ├── models/                 # SQLAlchemy Database Models
│   │   ├── user.py             
│   │   ├── activity.py         
│   │   ├── claim.py            
│   │   └── badge.py            
│   ├── schemas/                # Pydantic models for request/response validation
│   │   ├── user_schema.py
│   │   └── claim_schema.py
│   └── db/
│       ├── session.py          # PostgreSQL connection pool
│       └── base.py             # SQLAlchemy declarative base
├── requirements.txt            # Python dependencies (fastapi, sqlalchemy, psycopg2, etc.)
└── .env                        # Local environment variables
```

---

### 2. Database Schema (PostgreSQL)

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
        
- **`badges` Table:** [[Individual Badge Table]]
    
    - `id` (Integer, Primary Key)
        
    - `badge_name` (String) - e.g., "Silver", "Gold".
        
    - `required_points` (Integer) - The point threshold needed to unlock this badge.
        

---

### 3. API Endpoint Mapping

These RESTful endpoints translate the logical flow of your application into actionable HTTP requests.

#### A. Authentication

- **`POST /api/auth/register`**: Accepts student details. The data is updated and stored in the database's `users` table.
    
- **`POST /api/auth/login`**: Accepts a registration number and password. Data is verified against the registered student table to authenticate and return a JWT.
    

#### B. Claim Submission & Tracking

- **`POST /api/claims/submit`**: Handles the file upload and activity selection. It updates the database to show the student applied for the activity and automatically sets the initial status to `AI_PROCESSING`.
    
- **`GET /api/claims/statuses`**: Retrieves data from the claim points table to populate the submission statuses page for the logged-in student.
    

#### C. Testing & Manual Override

- **`PUT /api/claims/{claim_id}/test-approve`**: A dedicated endpoint for testing purposes. This manually edits the claim table to change the status from `AI_PROCESSING` to `APPROVED`.
    

#### D. Approval & Profile View

- **`GET /api/claims/approved`**: Powers the Approved Activity Table. It returns all approved activities with the details of the student and displays the accumulated points tied to those activities.
    
- **`GET /api/student/profile`**: Aggregates the total points from the user's approved activities and compares them against the `badges` table thresholds. It returns the total points and the specific awarded badge for the frontend to display.
    

