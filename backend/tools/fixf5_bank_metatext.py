"""fixf5_bank_metatext.py — neutralize authoring meta-text leaked into
board_questions.correct_answer (audit 2026-10-15 §7 #11, lane F5).

THE DEFECT
----------
The audit's confirmed row (c12 physics TEG, id aedc0c50-ffc0-4997-9f2d-
c47c529c10c4) carries ``correct_answer = "So we can compute new length
for same emf using resistivity ratio without needing gradient"`` — an
authoring note, not an answer.  Scanning the whole bank found the class
at scale: **6,609 rows, every one a ``source_type='seed'`` class-12
row** whose answer slot holds the question AUTHOR's QA-checklist line
extracted from the ``_comp`` companion docs ("Ensure three different
senses appear; present as bullet list – 2 lines", "Verify no simile
words…", "Check that 7,20,000 + 4,80,000 = 12,00,000; units in crore
rupees").  Such text can never be a grading key or a student-visible
expected answer.  Non-seed rows open with the same verbs ("Verify —
2×30/8 = 7.5 km/h…") but carry the real answer in teaching voice and
are deliberately NOT touched (see tests/test_fixf5_bank_guard.py).

THE FIX (idempotent)
--------------------
For every matching row:
  1. flag it in ``board_question_flags`` (reason ``metatext_answer``,
     ON CONFLICT DO NOTHING) — the platform's sanctioned exclusion
     marker, already respected by question_selector / bank_answer /
     marking_scheme_grader;
  2. set ``correct_answer = NULL`` and ``norm_text = NULL`` — the only
     lever the chapter-test serving path respects (it filters on
     non-empty correct_answer), which also removes the row from every
     bank-matching lane.

Nothing is deleted; ``model_answer`` (present on 100% of the matched
rows) keeps the full worked solution for any future re-keying effort.

Idempotency: the scan only matches rows with non-empty correct_answer,
so a second run finds zero rows and writes nothing.

USAGE
-----
  python -m backend.tools.fixf5_bank_metatext            # dry-run (default)
  python -m backend.tools.fixf5_bank_metatext --apply    # fix + report
"""
from __future__ import annotations

import argparse
import asyncio
import os
import re
import sys
from collections import Counter
from pathlib import Path

import asyncpg

FLAG_REASON = "metatext_answer"

# Authoring-instruction openers observed in the leak (whole-bank scan,
# 2026-10-15): ensure/check/confirm/verify/validate/compare-with/units-
# notes/cross-check/make-sure/test-that … plus the audit's authoring
# connective shape ("So we can compute …").
_INSTRUCTION_RE = re.compile(
    r"(?i:^\s*(?:ensure(?:\s+that)?|check(?:\s+that|\s+if|\s+whether|:)?"
    r"|confirm|validate|verify|sanity[- ]?check|compare\s+with"
    r"|watch\s+(?:the\s+)?units|note\s+the\s+units|make\s+sure"
    r"|cross[- ]check|double[- ]check|recheck|test\s+that)\b)"
)
_AUTHORING_CONNECTIVE_RE = re.compile(
    r"(?i:^\s*(?:so|thus|hence|therefore|now|then|also|next|finally"
    r"|better(?:\s+approach)?)\b[^\n.]{0,40}\b(?:we|you|i)\s+"
    r"(?:can|could|will|would|need|must|may|should|get|have|use|avoid"
    r"|keep|accept|treat|assume)\b)"
)


def is_metatext_answer(source_type: str | None,
                       correct_answer: str | None) -> bool:
    """True iff this row's correct_answer is leaked authoring meta-text.

    Scoped to ``source_type == 'seed'``: the leak is a seed-generator
    extraction defect.  Diagnostic/competency rows opening with the same
    verbs carry real answers in teaching voice ("Verify — … = 7.5 km/h")
    or ARE the fill-blank key word ("ensure") and must survive.
    """
    if (source_type or "").lower() != "seed":
        return False
    if not correct_answer or not correct_answer.strip():
        return False
    return bool(_INSTRUCTION_RE.search(correct_answer)
                or _AUTHORING_CONNECTIVE_RE.search(correct_answer))


_SCAN_SQL = """
SELECT id, subject, class_level, chapter, source_type, correct_answer
FROM board_questions
WHERE source_type = 'seed'
  AND correct_answer IS NOT NULL
  AND correct_answer <> ''
"""


async def scan_bank(conn: asyncpg.Connection) -> list[dict]:
    """All board_questions rows whose answer slot holds meta-text."""
    out = []
    for row in await conn.fetch(_SCAN_SQL):
        if is_metatext_answer(row["source_type"], row["correct_answer"]):
            out.append({
                "id": str(row["id"]),
                "subject": row["subject"],
                "class_level": row["class_level"],
                "chapter": row["chapter"],
                "answer": row["correct_answer"],
            })
    return out


async def _db_url() -> str:
    env = os.environ.get("DATABASE_URL")
    if env:
        return env.replace("+asyncpg", "")
    fallback = Path(r"D:\platform\_work\overhaul\.dburl.txt")
    if fallback.exists():
        return fallback.read_text(encoding="utf-8").strip() \
            .replace("+asyncpg", "")
    pw_lines = [l.strip().split("=", 1)[1]
                for l in open(r"D:\platform\deploy\.env",
                              encoding="utf-8")
                if l.startswith("POSTGRES_PASSWORD=")]
    if not pw_lines:
        raise SystemExit("no DATABASE_URL / .dburl.txt / deploy/.env")
    return (f"postgresql://dream_user:{pw_lines[0]}"
            f"@127.0.0.1:5432/dream_app")


async def run(apply: bool) -> int:
    conn = await asyncpg.connect(await _db_url())
    try:
        hits = await scan_bank(conn)
        by_subject = Counter(h["subject"] for h in hits)
        print(f"[fixf5-bank-metatext] pattern-class rows: {len(hits)} "
              f"(all source_type='seed')")
        for sub, n in sorted(by_subject.items()):
            print(f"    {sub}: {n}")
        for h in hits[:5]:
            print(f"    e.g. {h['id']} c{h['class_level']} {h['subject']} "
                  f"{h['chapter'] or ''}: {h['answer'][:90]!r}")

        if not hits:
            print("[fixf5-bank-metatext] nothing to do — bank is clean "
                  "(idempotent no-op).")
            return 0

        if not apply:
            print("[fixf5-bank-metatext] DRY-RUN: no changes written. "
                  "Re-run with --apply to flag + neutralize these rows.")
            return 0

        ids = [h["id"] for h in hits]
        async with conn.transaction():
            flagged = await conn.execute(
                """
                INSERT INTO board_question_flags (question_id, reason)
                SELECT id::uuid, $1::varchar
                FROM unnest($2::text[]) AS id
                ON CONFLICT (question_id) DO NOTHING
                """,
                FLAG_REASON, ids)
            neutralized = await conn.execute(
                """
                UPDATE board_questions
                SET correct_answer = NULL, norm_text = NULL
                WHERE id = ANY($1::uuid[])
                  AND source_type = 'seed'
                  AND correct_answer IS NOT NULL
                """,
                ids)
            print(f"[fixf5-bank-metatext] flags inserted: {flagged}")
            print(f"[fixf5-bank-metatext] answers neutralized: "
                  f"{neutralized}")

        # post-verify inside the same connection
        remaining = await scan_bank(conn)
        print(f"[fixf5-bank-metatext] post-apply scan: {len(remaining)} "
              f"pattern rows remain (must be 0)")
        return 0 if not remaining else 1
    finally:
        await conn.close()


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(
        description="Neutralize authoring meta-text leaked into "
                    "board_questions.correct_answer (audit §7 #11).")
    ap.add_argument("--apply", action="store_true",
                    help="write the fix (default is dry-run)")
    args = ap.parse_args(argv)
    return asyncio.run(run(apply=args.apply))


if __name__ == "__main__":
    sys.exit(main())
