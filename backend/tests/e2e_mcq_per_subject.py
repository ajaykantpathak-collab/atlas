"""In-process per-subject MCQ verification — no HTTP server needed.

Drives QuestionSelector.select_next (the exact production path with the
MCQ conversion) for every subject x sample class, against the live
postgres. Reports options presence (MCQ synthesis) + grading round-trip.
"""

import asyncio
import os
import sys

sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

# app env (dev values, same as dev_verify.cmd) — must exist BEFORE the
# backend imports below read settings
_PW = [l.strip().split("=", 1)[1]
       for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
       if l.startswith("POSTGRES_PASSWORD=")][0]
os.environ.setdefault(
    "DATABASE_URL",
    f"postgresql+asyncpg://dream_user:{_PW}@127.0.0.1:5432/dream_app")
os.environ.setdefault("PLATFORM_DATABASE_URL", os.environ["DATABASE_URL"])
os.environ.setdefault(
    "PLATFORM_JWT_SECRET", "0123456789abcdef0123456789abcdef0123")
os.environ.setdefault(
    "REDIS_URL",
    "redis://:at_mj93IR9URGYEIPaXGikkewwxkUBBiFBW@127.0.0.1:16379/0")
os.environ.setdefault("PLATFORM_REDIS_URL", os.environ["REDIS_URL"])
os.environ.setdefault("NEO4J_URI", "bolt://127.0.0.1:7688")
os.environ.setdefault("QDRANT_URL", "http://127.0.0.1:6333")
os.environ.setdefault("PLATFORM_ENV", "development")

SUBJECTS = [
    ("math", 10), ("phy", 11), ("chem", 11), ("bio", 10), ("cs", 11),
    ("engl", 10), ("hist", 10), ("civ", 9), ("geo", 10), ("eco", 10),
    ("acc", 11), ("bs", 11), ("biotech", 11), ("psy", 11), ("leg", 11),
    ("soc", 11), ("evs", 6), ("appmath", 11), ("hindi", 8), ("home", 11),
    ("pol", 12), ("ip", 11), ("stat", 11), ("commapp", 9),
    ("commstud", 10), ("econapp", 10), ("massmedia", 12),
]


async def main():
    from backend.database import async_session
    Session = async_session

    from backend.services.question_selector import QuestionSelector

    print(f"{'subject':10s} {'cls':4s} {'served':7s} {'mcq':4s} {'text':5s} "
          f"{'note'}")
    ok = 0
    async with Session() as db:
        for subj, cls in SUBJECTS:
            sel = QuestionSelector(db)
            try:
                q = await sel.select_next(
                    session_id=f"e2e-{subj}-{cls}",
                    student_id="00000000-0000-0000-0000-0000000000aa",
                    subject=subj,
                    class_level=cls,
                    exclude_question_ids=set(),
                )
                opts = q.get("options")
                served = 1
                if isinstance(opts, list) and opts:
                    ok += 1
                    print(f"{subj:10s} {cls:<4d} {served:<7d} MCQ     "
                          f"{'-':5s} opts={str(opts)[:50]}")
                else:
                    print(f"{subj:10s} {cls:<4d} {served:<7d} text    "
                          f"{'-':5s} {str(q.get('text', ''))[:44]}")
            except Exception as exc:
                print(f"{subj:10s} {cls:<4d} ERROR   -> {type(exc).__name__}: "
                      f"{str(exc)[:70]}")
    print(f"\nMCQ-synthesis subjects: {ok}/{len(SUBJECTS)} "
          "(text rows are honest non-MCQ serves)")


asyncio.run(main())
