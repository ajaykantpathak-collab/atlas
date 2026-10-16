"""Deterministic serve-rate per subject — standalone in-process runner.

Runs answer() SEQUENTIALLY (no asyncio, no HTTP) against live postgres.
This is the "how deterministic is every subject" metric: VERIFIED vs
GUIDED vs REFUSED per subject, with improvement targets.
"""

import os
import sys

sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

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
os.environ.setdefault("SOLVER_LLM_MODE", "off")

import psycopg2

SUBJECTS = [
    ("math", 10), ("phy", 11), ("chem", 11), ("bio", 10), ("cs", 11),
    ("engl", 10), ("hist", 10), ("civ", 9), ("geo", 10), ("eco", 10),
    ("acc", 11), ("bs", 11), ("biotech", 11), ("psy", 11), ("leg", 11),
    ("soc", 11), ("evs", 6), ("appmath", 11), ("hindi", 8), ("home", 11),
    ("pol", 12), ("ip", 11), ("stat", 11), ("commapp", 9),
    ("commstud", 10), ("econapp", 10), ("massmedia", 12),
]

pw = _PW
conn = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                        user="dream_user", password=pw)
cur = conn.cursor()

from backend.its.solver.answer_pipeline import answer  # noqa: E402

table = []
targets = {}
print("subject    cls  n  VERIFIED  GUIDED  REF/ERR", flush=True)
for subj, cls in SUBJECTS:
    cur.execute(
        "SELECT question_text FROM board_questions "
        "WHERE subject=%s AND class_level=%s "
        "AND correct_answer IS NOT NULL AND length(question_text) > 20 "
        "ORDER BY random() LIMIT 4", (subj, cls))
    samples = [r[0] for r in cur.fetchall()]
    ver = guided = ref = err = 0
    gsamples = []
    for qt in samples:
        try:
            r = answer(qt)
            lab = (r.label or "").upper()
            if lab.startswith("VERIFIED"):
                ver += 1
            elif "GUIDED" in lab:
                guided += 1
                if len(gsamples) < 2:
                    gsamples.append(qt[:80])
            else:
                ref += 1
        except Exception as exc:
            err += 1
            if len(gsamples) < 2:
                gsamples.append(f"ERR {type(exc).__name__}: {exc}"[:60])
    table.append((subj, cls, len(samples), ver, guided, ref + err))
    if gsamples:
        targets[subj] = gsamples
    print(f"{subj:10s} {cls:<4d} {len(samples):2d}  V={ver:<3d} G={guided:<3d} "
          f"R/E={ref + err:<3d}", flush=True)

ver_total = sum(t[3] for t in table)
n_total = sum(t[2] for t in table)
print(f"\nDETERMINISTIC VERIFIED RATE: {ver_total}/{n_total} "
      f"= {ver_total / max(1, n_total) * 100:.0f}%")
print("\n=== IMPROVEMENT TARGETS (GUIDED samples) ===")
for s, gs in targets.items():
    for g in gs:
        print(f"  {s:8s} {g}")
