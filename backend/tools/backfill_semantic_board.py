"""backfill_semantic_board.py -- backfill `board` onto existing Qdrant points.

Final form, after three failed scroll-based attempts: NO SCROLL AT ALL.
The point id IS the bank row UUID (build_index writes id=str(row.id)), and
set_payload(points=[...]) is a no-op for ids that don't exist in the
collection — so the whole job is: stream board_questions (id, board) out of
Postgres in chunks and push set_payload per chunk.  Qdrant pagination is
never touched (its scroll cursor loops after bulk payload writes — measured
30M streams over 250k points).

Read-only on Postgres; idempotent on Qdrant.  O(chunk) memory.

Usage:
  python -u tools/backfill_semantic_board.py
"""
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

COLLECTION = "qa_semantic"
CHUNK = 5000


def pg_chunks():
    """Yield [(uuid_str, board), ...] in CHUNK batches from Postgres."""
    import psycopg2
    pw = [l.strip().split("=", 1)[1]
          for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
          if l.startswith("POSTGRES_PASSWORD=")][0]
    conn = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                            user="dream_user", password=pw)
    cur = conn.cursor(name="backfill_board_stream")   # server-side cursor
    cur.itersize = CHUNK
    cur.execute(
        "SELECT id::text, COALESCE(board, '') FROM board_questions "
        "WHERE question_text IS NOT NULL AND length(question_text) > 10 "
        "AND correct_answer IS NOT NULL AND correct_answer <> '' "
        "ORDER BY created_at, id")
    batch = []
    for row in cur:
        batch.append((row[0], row[1]))
        if len(batch) >= CHUNK:
            yield batch
            batch = []
    if batch:
        yield batch
    cur.close()
    conn.close()


def main() -> int:
    from qdrant_client import QdrantClient
    from qdrant_client.http.exceptions import (
        ResponseHandlingException, UnexpectedResponse)

    qc = QdrantClient(host="127.0.0.1", port=6333, timeout=120)

    def _retry(fn, *a, **kw):
        last = None
        for attempt in range(5):
            try:
                return fn(*a, **kw)
            except (UnexpectedResponse, ResponseHandlingException) as ue:
                s = str(ue)
                if "408" not in s and "timeout" not in s.lower():
                    raise
                last = ue
                wait = 5 * (attempt + 1)
                print(f"  qdrant slow ({s[:80]}) — retry in {wait}s",
                      flush=True)
                time.sleep(wait)
        raise last

    t0 = time.time()
    pushed = 0
    for batch in pg_chunks():
        by_board: dict = {}
        for pid, board in batch:
            by_board.setdefault(board, []).append(pid)
        for board, ids in by_board.items():
            for i in range(0, len(ids), 500):
                _retry(qc.set_payload, COLLECTION, payload={"board": board},
                       points=ids[i:i + 500], wait=False)
                pushed += len(ids[i:i + 500])
                time.sleep(0.03)
        print(f"  pushed {pushed:,} | {time.time()-t0:.0f}s", flush=True)

    print(f"DONE: pushed board for {pushed:,} bank rows "
          f"in {time.time()-t0:.0f}s (absent ids are no-ops)", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
