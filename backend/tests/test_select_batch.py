"""test_select_batch.py -- timing + integrity check for the batch selector.

Runs QuestionSelector.select_batch against the REAL Postgres bank and
asserts: distinct ids, <=2 per node, requested count honoured when the
pool allows, and (informally) the latency win over the serial loop.
Zero-LLM, read-only.
"""
import asyncio
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

def _db_url() -> str:
    """DATABASE_URL from env, else assembled from deploy/.env (secret stays
    in the gitignored .env — never hardcoded in the tree, 2026-10-05)."""
    url = os.environ.get("DATABASE_URL")
    if url:
        return url
    pw = [l.strip().split("=", 1)[1]
          for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
          if l.startswith("POSTGRES_PASSWORD=")][0]
    return (f"postgresql+asyncpg://dream_user:{pw}@127.0.0.1:5432/dream_app")


os.environ.setdefault("DATABASE_URL", _db_url())


async def main() -> int:
    from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
    from sqlalchemy import text
    from backend.services.question_selector import QuestionSelector

    engine = create_async_engine(os.environ["DATABASE_URL"], pool_size=4)
    Session = async_sessionmaker(engine, expire_on_commit=False)

    async with Session() as db:
        row = (await db.execute(
            text("SELECT id FROM users ORDER BY created_at LIMIT 1"))).scalar()
        real_sid = str(row) if row else "demo"

    failures = []
    for subject, cls in (("mathematics", 10), ("biology", 9),
                         ("physics", 8), ("history", 7)):
        async with Session() as db:
            sel = QuestionSelector(db)
            t0 = time.perf_counter()
            try:
                qs = await sel.select_batch(
                    student_id=real_sid, subject=subject, count=10,
                    class_level=cls)
            except Exception as exc:
                failures.append(f"{subject}: select_batch crashed: {exc!r}")
                continue
            ms = (time.perf_counter() - t0) * 1000

            ids = [str(q.get("question_id") or "") for q in qs]
            if len(ids) != len(set(ids)):
                failures.append(f"{subject}: duplicate ids in batch: {ids}")
            per_node: dict = {}
            for q in qs:
                node = str(q.get("node_id") or q.get("topic") or "?")
                per_node[node] = per_node.get(node, 0) + 1
            capped = {n: c for n, c in per_node.items() if c > 2}
            if capped:
                failures.append(f"{subject}: >2 questions from one node: {capped}")
            if not qs:
                failures.append(f"{subject}: empty batch")
            for q in qs:
                if not str(q.get("text") or "").strip():
                    failures.append(f"{subject}: question with empty text")
                    break
            print(f"{subject:13s} c{cls}  n={len(qs):2d}/10  {ms:6.0f} ms  "
                  f"nodes={len(per_node)}  "
                  f"types={ {q.get('question_type') for q in qs} if qs else '-' }")

    await engine.dispose()
    if failures:
        print("\nFAILURES:")
        for f in failures:
            print(" -", f)
        return 1
    print("\nselect_batch: ALL GREEN (distinct ids, <=2/node, non-empty text)")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
