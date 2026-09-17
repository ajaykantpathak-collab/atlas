"""Seed REAL demo rows for Teacher (Phase 1c) + Parent (Phase 1e) wiring.

Run inside the backend container:  python -m backend.seed_teacher_parent_demo
Idempotent: every insert is guarded by an existence check.

Seeded rows (documented for the Atlas plan):
  users:
    - parent@dreamapp.in   role=parent  name="Demo Parent"  password demo123
    - aarav.demo@dreamapp.in role=student name="Aarav Sharma" class_level=10 password demo123
    - diya.demo@dreamapp.in  role=student name="Diya Patel"   class_level=10 password demo123
    (demo@dreamapp.in / "Demo Student" already exists from init_db — reused as
     the demo teacher identity for teacher_classes rows)
  teacher_classes (owner = demo@dreamapp.in user id):
    - "Class 10 A" section=A subject=Mathematics academic_year=2025-26
    - "Class 10 B" section=B subject=Science       academic_year=2025-26
  class_enrollments:
    - Class 10 A: Demo Student(roll 1), Aarav Sharma(roll 2), Diya Patel(roll 3)
    - Class 10 B: Aarav Sharma(roll 1), Diya Patel(roll 2), Demo Student(roll 3)
  parent_student_links (exactly ONE demo link):
    - parent@dreamapp.in  →  demo@dreamapp.in (relation='parent')
  mastery_records (demo BKT states on REAL corpus nodes for the demo student;
  values are seeded demo progress, not fabricated corpus content):
    - 12 real knowledge_nodes rows (mixed subjects), mastery 0.55-0.92,
      attempts 3-18, last_attempt_at spread over the last 10 days
"""

import asyncio
import random
from datetime import datetime, timedelta, timezone

from sqlalchemy import select

import backend  # noqa: F401  (sys.path bootstrap for `database`/`services`)

from backend.database import async_session
from backend.models.user import User as UserModel
from backend.models.progress import MasteryRecord
from backend.models.content import KnowledgeNodeModel
from backend.security import hash_password
from backend.services.auth_service import ParentStudentLinkModel, TeacherClassModel
from backend.api.teacher import ClassEnrollmentModel  # also creates worksheet tables' models


async def get_or_create_user(db, email, *, name, role, class_level=None, password="demo123"):
    row = (await db.execute(select(UserModel).where(UserModel.email == email))).scalar_one_or_none()
    if row is not None:
        print(f"[*] user exists: {email}")
        return row
    row = UserModel(
        email=email,
        name=name,
        role=role,
        class_level=class_level,
        password_hash=hash_password(password),
        is_active=True,
        is_verified=True,
    )
    db.add(row)
    await db.flush()
    print(f"[+] user created: {email} ({role})")
    return row


async def create_tables():
    from backend.database import Base as CoreBase
    import services.worksheet_service  # noqa: F401  (registers worksheets tables)

    from database import Base as WorksheetBase
    from backend.database import engine

    async with engine.begin() as conn:
        await conn.run_sync(CoreBase.metadata.create_all)
        await conn.run_sync(WorksheetBase.metadata.create_all)
    print("[+] tables ensured (core + worksheets/enrollments/assignments)")


async def main():
    await create_tables()
    async with async_session() as db:
        demo = await get_or_create_user(
            db, "demo@dreamapp.in", name="Demo Student", role="student", class_level=10
        )
        parent = await get_or_create_user(
            db, "parent@dreamapp.in", name="Demo Parent", role="parent"
        )
        aarav = await get_or_create_user(
            db, "aarav.demo@dreamapp.in", name="Aarav Sharma", role="student", class_level=10
        )
        diya = await get_or_create_user(
            db, "diya.demo@dreamapp.in", name="Diya Patel", role="student", class_level=10
        )

        async def ensure_class(class_name, section, subject):
            row = (
                await db.execute(
                    select(TeacherClassModel).where(
                        TeacherClassModel.teacher_id == demo.id,
                        TeacherClassModel.class_name == class_name,
                    )
                )
            ).scalar_one_or_none()
            if row is not None:
                print(f"[*] class exists: {class_name}")
                return row
            row = TeacherClassModel(
                teacher_id=demo.id,
                class_name=class_name,
                section=section,
                subject=subject,
                academic_year="2025-26",
            )
            db.add(row)
            await db.flush()
            print(f"[+] class created: {class_name} ({subject}) teacher=demo@dreamapp.in")
            return row

        cls_a = await ensure_class("Class 10 A", "A", "Mathematics")
        cls_b = await ensure_class("Class 10 B", "B", "Science")

        async def ensure_enrollment(cls, student, roll):
            row = (
                await db.execute(
                    select(ClassEnrollmentModel).where(
                        ClassEnrollmentModel.class_id == cls.id,
                        ClassEnrollmentModel.student_id == student.id,
                    )
                )
            ).scalar_one_or_none()
            if row is not None:
                return
            db.add(ClassEnrollmentModel(class_id=cls.id, student_id=student.id, roll_number=roll))
            print(f"[+] enrolled {student.email} in {cls.class_name} roll={roll}")

        await ensure_enrollment(cls_a, demo, 1)
        await ensure_enrollment(cls_a, aarav, 2)
        await ensure_enrollment(cls_a, diya, 3)
        await ensure_enrollment(cls_b, aarav, 1)
        await ensure_enrollment(cls_b, diya, 2)
        await ensure_enrollment(cls_b, demo, 3)

        link = (
            await db.execute(
                select(ParentStudentLinkModel).where(
                    ParentStudentLinkModel.parent_id == parent.id,
                    ParentStudentLinkModel.student_id == demo.id,
                )
            )
        ).scalar_one_or_none()
        if link is None:
            db.add(ParentStudentLinkModel(parent_id=parent.id, student_id=demo.id, relation="parent"))
            print("[+] parent_student_links: parent@dreamapp.in -> demo@dreamapp.in")
        else:
            print("[*] parent link exists")

        # ---- Demo mastery rows on REAL corpus nodes (documented above) ----
        existing_mastery = (
            await db.execute(
                select(MasteryRecord).where(MasteryRecord.user_id == demo.id).limit(1)
            )
        ).scalar_one_or_none()
        if existing_mastery is not None:
            print("[*] demo mastery rows exist")
        else:
            nodes = (
                await db.execute(select(KnowledgeNodeModel).limit(60))
            ).scalars().all()
            # spread across distinct subjects for a realistic breakdown
            picked: dict[str, KnowledgeNodeModel] = {}
            for n in nodes:
                picked.setdefault(n.subject, n)
                if len(picked) >= 6:
                    break
            remaining = [n for n in nodes if n not in picked.values()]
            for n in remaining:
                if len(picked) >= 12:
                    break
                picked[n.node_id] = n
            rng = random.Random(42)  # deterministic demo values
            for i, node in enumerate(picked.values()):
                db.add(
                    MasteryRecord(
                        user_id=demo.id,
                        node_id=node.node_id,
                        mastery_probability=round(rng.uniform(0.55, 0.92), 3),
                        p_known=round(rng.uniform(0.5, 0.9), 3),
                        attempts=rng.randint(3, 18),
                        last_attempt_at=datetime.now(timezone.utc) - timedelta(days=i % 10),
                    )
                )
            print(f"[+] seeded {len(picked)} demo mastery_records for demo@dreamapp.in on real nodes")

        await db.commit()
        print("\nDone. Demo teacher classes + roster + ONE parent-child link seeded.")


if __name__ == "__main__":
    asyncio.run(main())
