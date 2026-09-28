"""Load the GEN-2 practice-variant batch into board_questions.

Reads content/practice_variants/practice_variants.jsonl (rows mechanically
verified by derive_practice_variants.py + verify_practice_variants.py --
every answer-bearing word/number traces to the node's own md file, formula
answers recompute exactly) and inserts them as:

    source_type = "practice"
    source_file = "practice_variants/<node>.md"   (namespaced -> idempotent)
    board       = "CBSE"

The practice draw path (QuestionSelector._corpus_candidates) picks these up
through the existing class_level/subject gates with NO code change.
Competency draws (source_type IN competency/seed) are unaffected.

Idempotent: deletes the "practice_variants/%" namespace before inserting.
At insert time every row is re-checked against the live question_text set
(other agents may have landed rows since the batch was derived) -- collisions
are skipped and counted, never inserted.

Usage (inside a backend container):
    python -m backend.tools.load_practice_variants [--jsonl PATH] [--dry]
"""
from __future__ import annotations

import argparse
import asyncio
import json
import re
import sys
from collections import Counter

sys.path.insert(0, "/app")

DEFAULT_JSONL = "/app/content/practice_variants/practice_variants.jsonl"

_NORM_RE = re.compile(r"[^a-z0-9 ]+")

def _norm_text(t: str) -> str:
    t = (t or "").lower()
    t = re.sub(r"_{3,}", " ", t)
    t = _NORM_RE.sub(" ", t)
    return re.sub(r"\s+", " ", t).strip()


async def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--jsonl", default=DEFAULT_JSONL)
    ap.add_argument("--dry", action="store_true")
    args = ap.parse_args()

    rows = [json.loads(l) for l in open(args.jsonl, encoding="utf-8")]
    print(f"batch rows: {len(rows)}")

    from sqlalchemy import delete, func, select
    try:
        # package layout (deploy image: backend/database/__init__.py)
        from backend.database import async_session_maker as session_maker
    except ImportError:
        # module layout (dev tree: backend/database.py)
        from backend.database import AsyncSessionLocal as session_maker
    from backend.models.enrichment import BoardQuestion

    async with session_maker() as db:
        # live text set for insert-time dedup (other agents' rows included)
        res = await db.execute(select(BoardQuestion.question_text))
        live = {_norm_text(t) for (t,) in res if t}
        print(f"live board_questions texts: {len(live)}")

        # idempotency: clear this batch's namespace only
        del_res = await db.execute(
            delete(BoardQuestion).where(
                BoardQuestion.source_file.like("practice_variants/%")))
        print(f"deleted existing practice_variants rows: {del_res.rowcount}")

        inserted = skipped_dup = 0
        per_class = Counter()
        buf = []
        for r in rows:
            key = _norm_text(r["question_text"])
            if key in live:
                skipped_dup += 1
                continue
            live.add(key)
            buf.append(BoardQuestion(
                question_number=r["question_number"],
                node_tags=r.get("node_tags") or [],
                subject=r["subject"],
                class_level=r["class_level"],
                chapter=r.get("chapter"),
                question_type=r["question_type"],
                question_text=r["question_text"],
                options=None,
                correct_answer=str(r["correct_answer"]),
                explanation=r.get("explanation"),
                marks=1,
                difficulty=r["difficulty"],
                source_type="practice",
                source_file=r["source_file"],
                board="CBSE",
            ))
            per_class[r["class_level"]] += 1
            inserted += 1
            if len(buf) >= 500 and not args.dry:
                db.add_all(buf)
                await db.commit()
                buf = []
        if buf and not args.dry:
            db.add_all(buf)
            await db.commit()

        total = (await db.execute(
            select(func.count())
            .select_from(BoardQuestion))).scalar()
        mine = (await db.execute(
            select(func.count()).select_from(BoardQuestion).where(
                BoardQuestion.source_file.like("practice_variants/%"))
        )).scalar()
        by_class = (await db.execute(
            select(BoardQuestion.class_level, func.count())
            .select_from(BoardQuestion)
            .where(BoardQuestion.source_file.like("practice_variants/%"))
            .group_by(BoardQuestion.class_level))).all()

    print(f"{'DRY: would insert' if args.dry else 'inserted'}: {inserted} "
          f"| skipped (dup vs live): {skipped_dup}")
    print(f"board_questions total now: {total} | practice_variants rows: {mine}")
    print(f"practice_variants per class: {dict(sorted(by_class))}")
    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
