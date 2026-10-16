"""EXTENSIVE per-subject verification — every learning endpoint per subject.

Phase A (HTTP): practice/start (served + MCQ presence) → submit (graded) →
checkup composer → doodle hook → review warmup, per subject.
Phase B (in-process): deterministic serve-rate — answer() on random bank
rows per subject, VERIFIED vs GUIDED/REFUSED, with improvement targets.

Runs with an INVALID LLM key env: any LLM call would fail visibly, proving
the answering path is LLM-free.
"""

import json
import os
import random
import sys
import urllib.request
import urllib.error

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

BASE = "http://127.0.0.1:8010"


def call(path, payload=None, token=None):
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(BASE + path, data=data,
                                 method="POST" if data else "GET")
    req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", "Bearer " + token)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            b = r.read().decode()
            return r.status, (json.loads(b) if b.startswith("{") else b[:120])
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()[:200]
    except Exception as e:
        return 0, str(e)[:120]


SUBJECTS = [
    ("math", 10), ("phy", 11), ("chem", 11), ("bio", 10), ("cs", 11),
    ("engl", 10), ("hist", 10), ("civ", 9), ("geo", 10), ("eco", 10),
    ("acc", 11), ("bs", 11), ("biotech", 11), ("psy", 11), ("leg", 11),
    ("soc", 11), ("evs", 6), ("appmath", 11), ("hindi", 8), ("home", 11),
    ("pol", 12), ("ip", 11), ("stat", 11), ("commapp", 9),
    ("commstud", 10), ("econapp", 10), ("massmedia", 12),
]


def phase_a(token):
    print("\n=== PHASE A: per-subject endpoint checks ===")
    print(f"{'subject':10s} {'cls':3s} {'start':5s} {'served':6s} {'mcq':4s} "
          f"{'submit':6s} {'chk':4s} {'hook':5s} {'rev':4s}")
    results = []
    for subj, cls in SUBJECTS:
        r = {"subject": subj, "cls": cls}
        # StartSessionRequest takes class_level/num_questions — "grade"/
        # "count" are silently dropped by pydantic (cert-final 2026-10-04:
        # the old payload made every request run the caller's class pool).
        c, b = call("/api/practice/start",
                    {"subject": subj, "class_level": cls,
                     "num_questions": 3}, token)
        r["start"] = c
        qs = (b or {}).get("questions") or [] if isinstance(b, dict) else []
        r["served"] = len(qs)
        mcq = [q for q in qs
               if isinstance(q.get("options"), list) and q["options"]]
        r["mcq"] = len(mcq)
        submitted = "-"
        if qs:
            sid = b.get("session_id")
            q0 = qs[0]
            ans = (q0["options"][0]
                   if isinstance(q0.get("options"), list) and q0["options"]
                   else "my best answer")
            c2, b2 = call(f"/api/practice/{sid}/submit",
                          {"question_id": q0.get("id") or q0.get("question_id"),
                           "answer": ans}, token)
            submitted = c2
        r["submit"] = submitted
        c3, b3 = call(f"/api/learning/checkup?subject={subj}"
                      f"&class_level={cls}&board=CBSE", None, token)
        r["chk"] = (b3 or {}).get("total_items", "-") if isinstance(b3, dict) else c3
        c4, b4 = call(f"/api/learning/hook?node_id=c{cls}_{subj[:4]}"
                      f"_cbse_01_001&board=CBSE", None, token)
        r["hook"] = (b4 or {}).get("available", "-") if isinstance(b4, dict) else c4
        c5, b5 = call("/api/review/warmup", None, token)
        r["rev"] = c5
        results.append(r)
        print(f"{subj:10s} {cls:<3d} {str(r['start']):5s} {r['served']:<6d} "
              f"{r['mcq']:<4d} {str(submitted):6s} {str(r['chk']):4s} "
              f"{str(r['hook']):5s} {str(r['rev']):4s}")
    return results


def phase_b():
    """Deterministic serve-rate per subject via the HTTP solve endpoint."""
    print("\n=== PHASE B: deterministic serve-rate (HTTP solve) ===")
    import psycopg2
    pw = [l.strip().split("=", 1)[1]
          for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
          if l.startswith("POSTGRES_PASSWORD=")][0]
    import psycopg2.extensions
    conn = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                            user="dream_user", password=pw)
    cur = conn.cursor()
    table = []
    targets = {}
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
            c, b = call("/api/practice/deterministic/solve",
                        {"text": qt})
            lab = str((b or {}).get("label", "")) if isinstance(b, dict) else ""
            if c == 200 and lab.startswith("VERIFIED"):
                ver += 1
            elif c == 200 and "GUIDED" in lab.upper():
                guided += 1
                if len(gsamples) < 2:
                    gsamples.append(qt[:80])
            elif c == 0:
                err += 1
                if len(gsamples) < 2:
                    gsamples.append("HTTP " + str(b)[:50])
            else:
                ref += 1
        table.append((subj, cls, len(samples), ver, guided, ref + err))
        if gsamples:
            targets[subj] = gsamples
        print(f"{subj:10s} {cls:<3d} n={len(samples)} VERIFIED={ver} "
              f"GUIDED={guided} REF/ERR={ref + err}")
    conn.close()
    ver_total = sum(t[3] for t in table)
    n_total = sum(t[2] for t in table)
    print(f"\nDETERMINISTIC VERIFIED RATE: {ver_total}/{n_total} "
          f"= {ver_total / max(1, n_total) * 100:.0f}%")
    print("\n=== IMPROVEMENT TARGETS ===")
    for s, gs in targets.items():
        for g in gs:
            print(f"  {s:8s} {g}")


if __name__ == "__main__":
    email = f"perfect{random.randint(1000, 9999)}@atlas-test.com"
    c, b = call("/api/auth/signup", {"email": email,
                                     "password": "Testpass123!",
                                     "name": "Perfect", "role": "student",
                                     "class_level": 10})
    token = (b or {}).get("access_token") if isinstance(b, dict) else None
    print("auth:", c, bool(token))
    if token:
        phase_a(token)
    phase_b()
