"""Database initialization script for DREAM_APP.

Creates all tables and seeds initial data (achievements, sample subjects).

Usage:
    python -m backend.init_db
"""

import asyncio
import json
import os
from datetime import date

from sqlalchemy import select, text

from backend.database import async_session, engine
from backend.models import (
    Achievement, Exam, ExamSection, KnowledgeNodeModel, Subject,
    User,
)
from backend.security import hash_password


async def create_tables():
    """Create all database tables."""
    from backend.database import Base
    # Import all models so they're registered with Base
    import backend.models  # noqa: F401
    # Services carrying tables on the same Base — must import so
    # create_all sees them (otp_codes, refresh_tokens, parent_student_links,
    # teacher_classes, guest_sessions, exam_*, solver_templates)
    import backend.services.auth_service  # noqa: F401
    import backend.services.exam_service  # noqa: F401
    import backend.services.diagnostic_service  # noqa: F401  (diagnostic_sessions)
    import backend.api.diagnostics  # noqa: F401  (diagnostic_plans)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("[+] Tables created successfully")


async def seed_achievements(db):
    """Seed default achievements."""
    achievements_data = [
        {"achievement_id": "first_steps", "title": "First Steps", "description": "Complete your first lesson", "icon_name": "BookOpen", "tier": "bronze", "xp_reward": 50, "max_progress": 1},
        {"achievement_id": "on_fire_7", "title": "On Fire", "description": "Maintain a 7-day review streak", "icon_name": "Flame", "tier": "bronze", "xp_reward": 100, "max_progress": 7},
        {"achievement_id": "week_warrior", "title": "Week Warrior", "description": "Maintain a 14-day review streak", "icon_name": "Flame", "tier": "silver", "xp_reward": 250, "max_progress": 14},
        {"achievement_id": "month_master", "title": "Month Master", "description": "Maintain a 30-day review streak", "icon_name": "Flame", "tier": "gold", "xp_reward": 500, "max_progress": 30},
        {"achievement_id": "century_club", "title": "Century Club", "description": "Complete 100 lessons", "icon_name": "BookOpen", "tier": "silver", "xp_reward": 300, "max_progress": 100},
        {"achievement_id": "speed_demon", "title": "Speed Demon", "description": "Answer 10 questions in under 5 seconds each", "icon_name": "Zap", "tier": "silver", "xp_reward": 200, "max_progress": 10},
        {"achievement_id": "sharp_shooter", "title": "Sharp Shooter", "description": "Get 95% accuracy on 50 questions", "icon_name": "Target", "tier": "silver", "xp_reward": 250, "max_progress": 50},
        {"achievement_id": "topic_tamer", "title": "Topic Tamer", "description": "Master 10 knowledge nodes", "icon_name": "Brain", "tier": "bronze", "xp_reward": 150, "max_progress": 10},
        {"achievement_id": "chapter_champion", "title": "Chapter Champion", "description": "Master an entire chapter", "icon_name": "Crown", "tier": "silver", "xp_reward": 400, "max_progress": 1},
        {"achievement_id": "board_boss", "title": "Board Boss", "description": "Score 90+ on a board-level exam", "icon_name": "Trophy", "tier": "platinum", "xp_reward": 2000, "max_progress": 90},
        {"achievement_id": "socratic_scholar", "title": "Socratic Scholar", "description": "Complete 50 AI tutor sessions", "icon_name": "Sparkles", "tier": "silver", "xp_reward": 350, "max_progress": 50},
        {"achievement_id": "unstoppable", "title": "Unstoppable", "description": "Maintain a 100-day review streak", "icon_name": "Flame", "tier": "platinum", "xp_reward": 3000, "max_progress": 100},
    ]

    for data in achievements_data:
        existing = await db.execute(
            select(Achievement).where(Achievement.achievement_id == data["achievement_id"])
        )
        if existing.scalar_one_or_none() is None:
            achievement = Achievement(**data)
            db.add(achievement)
    await db.commit()
    print(f"[+] Seeded {len(achievements_data)} achievements")


async def seed_subjects(db):
    """Seed CISCE STEM subjects for Classes 1-12."""
    subjects_data = []

    # Core STEM subjects: Physics, Chemistry, Biology, Mathematics
    core_subjects = [
        {"name": "Physics", "icon_name": "Atom", "color": "#6366f1"},
        {"name": "Chemistry", "icon_name": "FlaskConical", "color": "#d946ef"},
        {"name": "Biology", "icon_name": "Leaf", "color": "#34d399"},
        {"name": "Mathematics", "icon_name": "Calculator", "color": "#fbbf24"},
    ]

    all_subjects = core_subjects

    # Seed for Classes 1-12
    for class_level in range(1, 13):
        for subj in all_subjects:
            subjects_data.append({
                "name": subj["name"],
                "board": "CISCE",
                "class_level": class_level,
                "icon_name": subj["icon_name"],
                "color": subj["color"],
            })

    inserted = 0
    for data in subjects_data:
        existing = await db.execute(
            select(Subject).where(
                Subject.name == data["name"],
                Subject.board == data["board"],
                Subject.class_level == data["class_level"],
            )
        )
        if existing.scalar_one_or_none() is None:
            subject = Subject(**data)
            db.add(subject)
            inserted += 1
    await db.commit()
    print(f"[+] Seeded {inserted} new CISCE subjects ({len(subjects_data)} total for Classes 1-12)")


async def seed_sample_nodes(db):
    """Seed sample knowledge nodes for testing."""
    nodes_data = [
        {"node_id": "c10_sci_003_01", "label": "Reflection of Light", "description": "When light hits a surface and bounces back, it is called reflection.", "subject": "Science", "class_level": 10, "chapter": "Chapter 3", "node_type": "info", "simplified_content": "Reflection is when light bounces off a surface. The angle of incidence equals the angle of reflection.", "prerequisites": [], "forward_nodes": ["c10_sci_003_02"], "mastery_probability": 0.0, "difficulty": "easy", "estimated_time": 15},
        {"node_id": "c10_sci_003_02", "label": "Laws of Reflection", "description": "Two laws: angle of incidence equals angle of reflection, and all rays lie in the same plane.", "subject": "Science", "class_level": 10, "chapter": "Chapter 3", "node_type": "info", "simplified_content": "Law 1: The angle of incidence equals the angle of reflection. Law 2: The incident ray, reflected ray, and normal all lie in the same plane.", "prerequisites": ["c10_sci_003_01"], "forward_nodes": ["c10_sci_003_05"], "mastery_probability": 0.0, "difficulty": "medium", "estimated_time": 20},
        {"node_id": "c10_sci_003_05", "label": "Refraction of Light", "description": "When light passes from one medium to another, it bends. This is called refraction.", "subject": "Science", "class_level": 10, "chapter": "Chapter 3", "node_type": "info", "simplified_content": "Refraction is the bending of light when it passes from one medium to another with different optical densities. Snell's Law: n1 sin(theta1) = n2 sin(theta2).", "prerequisites": ["c10_sci_003_02"], "forward_nodes": [], "mastery_probability": 0.0, "difficulty": "hard", "estimated_time": 25},
        {"node_id": "c10_math_004_01", "label": "Quadratic Equations", "description": "Equations of the form ax^2 + bx + c = 0 where a != 0.", "subject": "Mathematics", "class_level": 10, "chapter": "Chapter 4", "node_type": "info", "simplified_content": "A quadratic equation has the form ax^2 + bx + c = 0. Solutions: x = (-b +/- sqrt(b^2 - 4ac)) / 2a.", "prerequisites": [], "forward_nodes": [], "mastery_probability": 0.0, "difficulty": "medium", "estimated_time": 30},
        {"node_id": "c10_math_002_01", "label": "Polynomials", "description": "Expressions with variables and coefficients using addition, subtraction, multiplication, and non-negative exponents.", "subject": "Mathematics", "class_level": 10, "chapter": "Chapter 2", "node_type": "info", "simplified_content": "A polynomial is an expression like 3x^2 + 2x + 1. Degree is the highest power of the variable.", "prerequisites": [], "forward_nodes": ["c10_math_004_01"], "mastery_probability": 0.0, "difficulty": "easy", "estimated_time": 20},
        {"node_id": "c10_eng_003_01", "label": "The Midnight Visitor", "description": "A story about Ausable, a secret agent who outwits his rival using wit rather than weapons.", "subject": "English", "class_level": 10, "chapter": "Chapter 3", "node_type": "story", "simplified_content": "The Midnight Visitor is a story about Ausable, a secret agent. He uses his intelligence to trick Max, another spy, into believing there is a balcony outside the window.", "prerequisites": [], "forward_nodes": [], "mastery_probability": 0.0, "difficulty": "easy", "estimated_time": 15},
        {"node_id": "c10_sst_002_01", "label": "Nationalism in India", "description": "The Non-Cooperation Movement, Civil Disobedience Movement, and the role of Mahatma Gandhi in India's freedom struggle.", "subject": "Social Science", "class_level": 10, "chapter": "Chapter 2", "node_type": "info", "simplified_content": "Nationalism in India developed through the freedom struggle. Gandhi led the Non-Cooperation Movement (1920-22) and Civil Disobedience Movement (1930-34).", "prerequisites": [], "forward_nodes": [], "mastery_probability": 0.0, "difficulty": "medium", "estimated_time": 25},
    ]

    for data in nodes_data:
        existing = await db.execute(
            select(KnowledgeNodeModel).where(KnowledgeNodeModel.node_id == data["node_id"])
        )
        if existing.scalar_one_or_none() is None:
            node = KnowledgeNodeModel(**data)
            db.add(node)
    await db.commit()
    print(f"[+] Seeded {len(nodes_data)} knowledge nodes")


async def seed_sample_exams(db):
    """Seed sample exams for testing."""
    exams_data = [
        {
            "exam_id": "cbse10_sci_preboard1",
            "title": "Science Pre-Board 2025",
            "board": "CBSE",
            "class_level": 10,
            "subject": "Science",
            "duration_minutes": 180,
            "total_marks": 80,
            "sections_count": 5,
            "difficulty": "Board-Level",
            "topics": json.dumps(["Light", "Electricity", "Carbon Compounds", "Life Processes", "Heredity"]),
            "is_published": True,
        },
        {
            "exam_id": "cbse10_math_preboard1",
            "title": "Mathematics Pre-Board 2025",
            "board": "CBSE",
            "class_level": 10,
            "subject": "Mathematics",
            "duration_minutes": 180,
            "total_marks": 80,
            "sections_count": 4,
            "difficulty": "Board-Level",
            "topics": json.dumps(["Real Numbers", "Polynomials", "Quadratic Equations", "Triangles"]),
            "is_published": True,
        },
        {
            "exam_id": "cbse10_sci_quick",
            "title": "Science Quick Test - Light",
            "board": "CBSE",
            "class_level": 10,
            "subject": "Science",
            "duration_minutes": 30,
            "total_marks": 20,
            "sections_count": 2,
            "difficulty": "Easy",
            "topics": json.dumps(["Light", "Reflection", "Refraction"]),
            "is_published": True,
        },
    ]

    for data in exams_data:
        existing = await db.execute(
            select(Exam).where(Exam.exam_id == data["exam_id"])
        )
        if existing.scalar_one_or_none() is None:
            exam = Exam(**data)
            db.add(exam)
    await db.commit()
    print(f"[+] Seeded {len(exams_data)} exams")


async def seed_demo_user(db):
    """Create a demo user for testing."""
    existing = await db.execute(
        select(User).where(User.email == "demo@dreamapp.in")
    )
    if existing.scalar_one_or_none() is None:
        user = User(
            email="demo@dreamapp.in",
            name="Demo Student",
            password_hash=hash_password("demo123"),
            role="student",
            board="CISCE",
            class_level=10,
            is_premium=False,
            is_active=True,
            total_xp=2450,
            # level = floor(xp / XP_PER_LEVEL) + 1 — must match
            # services/progress_service.py (2450 // 100 + 1 = 25)
            current_level=25,
            streak_days=4,
            last_activity_date=date.today(),
        )
        db.add(user)
        await db.commit()
        print("[+] Created demo user (demo@dreamapp.in / demo123)")
    else:
        print("[*] Demo user already exists")


async def main():
    print("=" * 50)
    print("DREAM_APP Database Initialization")
    print("=" * 50)

    print("\n[1/7] Creating tables...")
    await create_tables()

    print("\n[2/7] Seeding achievements...")
    async with async_session() as db:
        await seed_achievements(db)

    print("\n[3/7] Seeding CISCE subjects (Classes 1-12)...")
    async with async_session() as db:
        await seed_subjects(db)

    print("\n[4/7] Seeding sample nodes and exams...")
    async with async_session() as db:
        await seed_sample_nodes(db)
        await seed_sample_exams(db)

    print("\n[5/7] Creating demo user...")
    async with async_session() as db:
        await seed_demo_user(db)

    print("\n[6/7] Loading enrichment content (CBSE enhanced_nodes_md)...")
    try:
        from backend.tools.load_cbse_enrichment import main as load_cbse
        from backend.models.enrichment import EnrichmentContent
        from sqlalchemy import func, select as _sel

        # The loader rewrites every row from the md corpus — including
        # fields like title that have hand-applied repairs in the DB.
        # When the table is already populated, a reload can only degrade
        # data, so skip it (fresh installs still seed normally).
        async with async_session() as db:
            have = (await db.execute(
                _sel(func.count()).select_from(EnrichmentContent)
            )).scalar() or 0
        if have >= 8000:
            print(f"  enrichment already populated ({have} rows) — "
                  "skipping reload to preserve in-place repairs")
        else:
            await load_cbse()
    except Exception as exc:
        print(f"  [!] Enrichment content load skipped: {exc}")

    # [7/7] CBSE questions are extracted from the node corpus; the CISCE
    # marker corpus stays behind LOAD_CISCE_CONTENT=1.
    print("\n[7/7] Extracting CBSE questions from node corpus...")
    try:
        from backend.tools.extract_node_questions import main as extract_qs
        await extract_qs()
    except Exception as exc:
        print(f"  [!] CBSE question extraction skipped: {exc}")

    if os.environ.get("LOAD_CISCE_CONTENT"):
        print("\n[7/7] Loading CISCE question banks and class-level content...")
        try:
            from backend.database.load_content import find_content_files, load_question_banks, load_answer_keys, load_class_level_content
            from backend.database.load_enrichment import CISCE_ROOT
            from pathlib import Path
            if not Path(CISCE_ROOT).exists():
                print(f"  [!] CISCE content root not found: {CISCE_ROOT} — skipping")
            else:
                async with async_session() as db:
                    q_files, c_files, a_files = find_content_files(CISCE_ROOT)
                    print(f"  Found {len(q_files)} question files, {len(c_files)} class-level files, {len(a_files)} answer files")
                    q_result = await load_question_banks(db, q_files)
                    print(f"  Questions inserted: {q_result['inserted']}")
                    a_result = await load_answer_keys(db, a_files)
                    print(f"  Answers joined: {a_result['updated']} rows updated from {a_result['keys_parsed']} keys")
                    c_result = await load_class_level_content(db, c_files)
                    print(f"  Class-level content inserted: {c_result['inserted']}")
        except Exception as exc:
            print(f"  [!] Question bank load skipped: {exc}")
    else:
        print("\n[7/7] CISCE corpus load skipped (CBSE-only mode; set LOAD_CISCE_CONTENT=1 to enable)")

    print("\n" + "=" * 50)
    print("Database initialization complete!")
    print("=" * 50)
    print("\nDemo credentials:")
    print("  Email: demo@dreamapp.in")
    print("  Password: demo123")
    print()


if __name__ == "__main__":
    asyncio.run(main())
