"""
Seed script — populates the activities table.

Run from repo root (with venv active):
    python -m backend.app.seed_activities

Activities and points match frontend/lib/activity-rewards.ts.
badge_category matches the badge IDs in frontend/app/student/badges/page.tsx.
"""
import asyncio
from backend.app.db.session import SessionLocal
from backend.app.models.activity import Activity

ACTIVITIES = [
    # title                              pts  required_proof_types                                                 badge_category
    ("Swayam NPTEL course",              4,   ["Certificate PDF", "Certificate ID"],                              "knowledge-seeker"),
    ("Coursera Course",                  3,   ["Certificate PDF"],                                                "knowledge-seeker"),
    ("NPTEL 12 week course",             6,   ["Certificate PDF", "Certificate ID"],                             "knowledge-seeker"),
    ("External Certification",           4,   ["Certificate PDF"],                                                "knowledge-seeker"),
    ("Global Certificate",               6,   ["Certificate PDF", "Institution Letter"],                          "knowledge-seeker"),
    ("Volunteering",                     2,   ["HOD/Coordinator Signed Letter"],                                  "community-impact"),
    ("NCC/NSS activities",               3,   ["Attendance Photo", "OD Letter"],                                  "community-impact"),
    ("Club Activities",                  2,   ["Faculty Advisor Letter"],                                         "community-impact"),
    ("Student Chapter activity",         2,   ["Coordinator Letter"],                                             "community-impact"),
    ("Participating in other college event", 3, ["Certificate", "Event Poster"],                                  "campus-star"),
    ("Cultural Participation",           3,   ["Certificate", "Event Poster"],                                    "campus-star"),
    ("Sports and other activities",      3,   ["Certificate", "OD Letter"],                                       "campus-star"),
    ("Research/Project/Development",     4,   ["Project Report", "GitHub Link", "Supervisor Letter"],             "innovation-builder"),
    ("Student Funding Project",          8,   ["Project Report", "Funding Approval Letter"],                     "innovation-builder"),
    ("Organizing an event",              2,   ["Event Poster", "Faculty Permission Letter"],                      "leadership-architect"),
    ("Conducting Workshop",              2,   ["Event Poster", "Attendance Sheet"],                               "leadership-architect"),
    ("Conducting coding contest",        3,   ["Event Poster", "Attendance Sheet"],                               "leadership-architect"),
    ("Hackathon Participation",          2,   ["Certificate", "Event Poster", "OD Letter"],                      "hackathon-hero"),
    ("Winning the hackathon",            5,   ["Winner Certificate", "Event Poster", "OD Letter"],               "hackathon-hero"),
    (">8.5 CGPA",                        4,   ["Transcript/Grade Sheet"],                                         "academic-excellence"),
    ("Study summer camp Abroad",         6,   ["Admission Letter", "Completion Certificate"],                    "global-explorer"),
    ("Startup Funded and approved",      12,  ["Funding Approval Document", "Startup Registration Certificate"], "startup-founder"),
]


async def seed():
    async with SessionLocal() as db:
        for title, points, proof_types, badge_cat in ACTIVITIES:
            from sqlalchemy.future import select
            result = await db.execute(select(Activity).where(Activity.title == title))
            existing = result.scalars().first()
            if existing:
                print(f"  SKIP (exists): {title}")
                continue
            db.add(Activity(
                title=title,
                points=points,
                required_proof_types=proof_types,
                badge_category=badge_cat,
            ))
            print(f"  ADD: {title} ({points} pts)")
        await db.commit()
        print(f"\n✅ Activities seeded: {len(ACTIVITIES)} total.")


if __name__ == "__main__":
    asyncio.run(seed())
