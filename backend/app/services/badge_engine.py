"""
Badge Algorithm Service
=======================
Thresholds are derived EXACTLY from the frontend badges page
(frontend/app/student/badges/page.tsx).  Each tiered badge category
has its own set of thresholds — they are NOT uniform.

TIERED BADGES  (Bronze → Silver → Gold → Diamond)
─────────────────────────────────────────────────
Category: knowledge-seeker  → Knowledge Seeker
  🥉 Bronze  : 1  approved activity  ("Complete 1 course")
  🥈 Silver  : 3  approved activities ("Complete 3 courses")
  🥇 Gold    : 5  approved activities ("Complete 5 courses")
  ♦  Diamond : 8  approved activities ("Complete 8+ courses")

Category: community-impact  → Community Impact
  🥉 Bronze  : 1  ("Participate in 1 activity")
  🥈 Silver  : 3  ("Participate in 3 activities")
  🥇 Gold    : 5  ("Participate in 5 activities")
  ♦  Diamond : 8  ("Lead / major involvement" — mapped to 8+)

Category: campus-star  → Campus Star
  🥉 Bronze  : 1  ("1 participation")
  🥈 Silver  : 3  ("3 participations")
  🥇 Gold    : 5  ("5 participations")
  ♦  Diamond : 8  ("8+ participations")

Category: innovation-builder  → Innovation Builder  ⚠ different scale
  🥉 Bronze  : 1  ("Complete 1 project")
  🥈 Silver  : 2  ("Complete 2 projects")
  🥇 Gold    : 3  ("3+ projects")
  ♦  Diamond : 4  ("Funded or impactful project" — mapped to 4+)

Category: leadership-architect  → Leadership Architect  ⚠ different scale
  🥉 Bronze  : 1  ("Organise 1 event")
  🥈 Silver  : 2  ("Organise 2 events")
  🥇 Gold    : 3  ("Conduct workshop / contest")
  ♦  Diamond : 4  ("Lead multiple events" — mapped to 4+)

Category: hackathon-hero  → Hackathon Hero  ⚠ different scale
  🥉 Bronze  : 1  ("Participate in 1 hackathon")
  🥈 Silver  : 2  ("Participate in 2 hackathons")
  🥇 Gold    : 3  ("Win 1 hackathon" — mapped to 3 total claims incl. win)
  ♦  Diamond : 4  ("Win multiple hackathons" — mapped to 4+)

SPECIAL / INDIVIDUAL BADGES (threshold = 1 approved activity)
──────────────────────────────────────────────────────────────
  academic-excellence → >8.5 CGPA
  global-explorer     → Study Summer Camp Abroad
  startup-founder     → Startup Funded & Approved
"""

from typing import Optional

# ─── Per-category tier thresholds ────────────────────────────────────────────
# Format: list of (min_count, tier_name, emoji) ordered highest → lowest
# so the first match is always the best unlocked tier.

CATEGORY_THRESHOLDS: dict[str, list[tuple[int, str, str]]] = {
    "knowledge_seeker": [
        (8, "Diamond", "♦"),
        (5, "Gold",    "🥇"),
        (3, "Silver",  "🥈"),
        (1, "Bronze",  "🥉"),
    ],
    "community_impact": [
        (8, "Diamond", "♦"),
        (5, "Gold",    "🥇"),
        (3, "Silver",  "🥈"),
        (1, "Bronze",  "🥉"),
    ],
    "campus_star": [
        (8, "Diamond", "♦"),
        (5, "Gold",    "🥇"),
        (3, "Silver",  "🥈"),
        (1, "Bronze",  "🥉"),
    ],
    # ⚠ Tighter scale — Silver=2, Gold=3, Diamond=4
    "innovation_builder": [
        (4, "Diamond", "♦"),
        (3, "Gold",    "🥇"),
        (2, "Silver",  "🥈"),
        (1, "Bronze",  "🥉"),
    ],
    # ⚠ Tighter scale — Silver=2, Gold=3, Diamond=4
    "leadership_architect": [
        (4, "Diamond", "♦"),
        (3, "Gold",    "🥇"),
        (2, "Silver",  "🥈"),
        (1, "Bronze",  "🥉"),
    ],
    # ⚠ Tighter scale — Silver=2, Gold=3 (win), Diamond=4 (win multiple)
    "hackathon_hero": [
        (4, "Diamond", "♦"),
        (3, "Gold",    "🥇"),
        (2, "Silver",  "🥈"),
        (1, "Bronze",  "🥉"),
    ],
}

TIERED_BADGE_NAMES: dict[str, str] = {
    "knowledge_seeker":     "Knowledge Seeker",
    "community_impact":     "Community Impact",
    "campus_star":          "Campus Star",
    "innovation_builder":   "Innovation Builder",
    "leadership_architect": "Leadership Architect",
    "hackathon_hero":       "Hackathon Hero",
}

SPECIAL_BADGE_NAMES: dict[str, str] = {
    "academic_excellence": "Academic Excellence",
    "global_explorer":     "Global Explorer",
    "startup_founder":     "Startup Founder",
}


# ─── Core functions ───────────────────────────────────────────────────────────

def compute_badge(badge_category: str, approved_count: int) -> Optional[dict]:
    """
    Given a badge category and the number of approved activities in that
    category, return the highest tier the student has unlocked, or None.

    Returns:
      { "category": str, "name": str, "tier": str, "emoji": str,
        "required": int, "current": int }
    """
    if approved_count < 1:
        return None

    # Special / individual badges — awarded on first activity
    if badge_category in SPECIAL_BADGE_NAMES:
        return {
            "category": badge_category,
            "name":     SPECIAL_BADGE_NAMES[badge_category],
            "tier":     "Special",
            "emoji":    "🏅",
            "required": 1,
            "current":  approved_count,
        }

    thresholds = CATEGORY_THRESHOLDS.get(badge_category)
    if not thresholds:
        return None

    badge_name = TIERED_BADGE_NAMES.get(badge_category, badge_category)

    # Find the next tier so the frontend can show progress
    next_required = None
    for required, tier, emoji in reversed(thresholds):   # lowest → highest
        if approved_count < required:
            next_required = required

    for required, tier, emoji in thresholds:             # highest → lowest
        if approved_count >= required:
            return {
                "category":      badge_category,
                "name":          badge_name,
                "tier":          tier,
                "emoji":         emoji,
                "required":      required,
                "current":       approved_count,
                "next_required": next_required,
            }

    return None


def compute_all_badges(category_counts: dict[str, int]) -> list[dict]:
    """
    Given { badge_category: approved_count }, return all unlocked badges
    (one per category, highest tier only).
    """
    result = []
    for category, count in category_counts.items():
        badge = compute_badge(category, count)
        if badge:
            result.append(badge)
    return result
