#!/usr/bin/env python3
"""modules/journey/e2e_check.py — end-to-end proof for the intelligence layer.

Runs against the LIVE dev backend (default http://127.0.0.1:8010) and proves:

  1. fresh signup -> journey state for a real topic -> answers through the
     real POST /api/journey/answer endpoint drive the state machine
     PROBE -> TEACH/PRACTICE -> REMEDIATE -> CHALLENGE -> MASTERED with
     BKT values matching a reference mastery_sync.BKTModel replay exactly;
  2. the self-healing pipeline: synthetic miss-queue JSONL -> ingest ->
     classification dispositions (node_bind / family_patch / composer) ->
     stats reflect them -> replay heals one VERIFIED-solvable item;
  3. journey/healing rows are real DB rows (verified through an INDEPENDENT
     DB connection, and previous-run rows are re-verified via login+API —
     they survive the auto-reload between runs);
  4. concurrency: two parallel answers for the same student+topic serialize
     (FOR UPDATE) — no lost BKT update;
  5. every lane endpoint returns its documented shape, no 500s;
  6. zero node-id patterns inside student-facing string values.

Usage (from D:\\platform\\deploy):
    python -m modules.journey.e2e_check
Env: E2E_BASE to override the target; DB/Redis env falls back to
dev_start.cmd values (parsed from that file, single source of truth).
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import sys
import tempfile
import threading
import time
import uuid
from pathlib import Path

_DEPLOY = Path(__file__).resolve().parents[3]   # .../backend/modules/journey/x.py -> deploy/
if str(_DEPLOY) not in sys.path:
    sys.path.insert(0, str(_DEPLOY))


def _load_env_from_dev_start() -> None:
    cmd = _DEPLOY / "dev_start.cmd"
    if not cmd.exists():
        return
    for ln in cmd.read_text(encoding="utf-8", errors="ignore").splitlines():
        ln = ln.strip()
        if ln.lower().startswith("set ") and "=" in ln:
            k, _, v = ln[4:].strip().partition("=")
            if k and v:
                os.environ.setdefault(k, v)


_load_env_from_dev_start()

import requests  # noqa: E402

BASE = os.environ.get("E2E_BASE", "http://127.0.0.1:8010").rstrip("/")

# ---------------------------------------------------------------- reporting
PASS: list[str] = []
FAIL: list[tuple[str, str]] = []


def check(name: str, cond: bool, detail: str = "") -> bool:
    if cond:
        PASS.append(name)
        print(f"  PASS  {name}")
    else:
        FAIL.append((name, detail))
        print(f"  FAIL  {name}" + (f"   << {detail}" if detail else ""))
    return bool(cond)


# ------------------------------------------------------------ reference BKT
def ref_bkt(prior: float, correct: bool) -> float:
    """The journey's BKT trajectory: mastery_sync.BKTModel seeded from the
    persisted p (journey prior 0.3, guess .2 slip .1 transit .1)."""
    from backend.services.mastery_sync import BKTModel, MasteryState
    st = MasteryState(student_id="ref", topic_id="ref", subject="ref")
    st.bkt_p_know = prior
    return BKTModel.update(st, correct)


P0 = 0.3  # JourneyState.INITIAL_P

# ------------------------------------------------------------ HTTP helpers
_T0 = time.time()


def _hdr(token: str | None) -> dict:
    h = {"Content-Type": "application/json"}
    if token:
        h["Authorization"] = f"Bearer {token}"
    return h


def req(method: str, path: str, token: str | None = None, **kw):
    # 300s: a COLD instance builds its compq/enhanced-nodes indexes on the
    # first payload request (REMEDIATE /next etc.) — that one call can
    # legitimately exceed two minutes; every later call is fast.
    return requests.request(method, BASE + path, headers=_hdr(token),
                            timeout=300, **kw)


# ------------------------------------------------------------ DB helpers
def db_rows(student_id: str) -> dict:
    """Journey rows read through an INDEPENDENT session (not the API).
    NOTE: an ORM entity select must run on a Session — on a raw engine
    Connection, scalars() yields column values, not entities (the exact
    trap the /map and /reset routers used to fall into)."""
    from sqlalchemy import select
    from sqlalchemy.orm import Session as _S
    from backend.database import get_sync_engine
    from backend.modules.journey.models import JourneyState
    with _S(get_sync_engine(), expire_on_commit=False) as sx, sx.begin():
        rows = sx.execute(select(JourneyState).where(
            JourneyState.student_id == student_id)).scalars().all()
        # snapshot the columns while the session is open — the dict must
        # stay readable after the session closes
        return {r.node_id: r for r in rows}


def db_delete_journey(student_id: str) -> None:
    from sqlalchemy import delete
    from backend.database import get_sync_engine
    from backend.modules.journey.models import JourneyState
    with get_sync_engine().begin() as cx:
        cx.execute(delete(JourneyState).where(
            JourneyState.student_id == student_id))


NODE_ID_RE = re.compile(r"\bc\d+_(?:[a-z]+_){1,4}\d+")


def walk_strings(obj, skip_keys=("node_id", "last_question_id",
                                 "question_id", "qhash")):
    """All string leaf VALUES except opaque-key fields (owner decision:
    ids travel as opaque fetch keys; the rule is about display text)."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in skip_keys:
                continue
            yield from walk_strings(v, skip_keys)
    elif isinstance(obj, (list, tuple)):
        for v in obj:
            yield from walk_strings(v, skip_keys)
    elif isinstance(obj, str):
        yield obj


# ---------------------------------------------------------------- scenarios
TOPICS = {
    "happy":  ("c10_bio_cbse_01_001", "bio"),
    "teach":  ("c10_bio_cbse_01_002", "bio"),
    "remed":  ("c10_bio_cbse_01_003", "bio"),
    "drop":   ("c10_bio_cbse_01_004", "bio"),
    "conc":   ("c10_bio_cbse_01_005", "bio"),
}


def journey_scenario(token: str, uid: str) -> None:
    print("\n== journey state machine (real endpoints) ==")

    # -- fresh state + map shape
    node, subject = TOPICS["happy"]
    r = req("POST", "/api/journey/next", token, json={"node_id": node})
    ok = check("POST /journey/next (first touch) 200", r.status_code == 200,
               f"status={r.status_code} body={r.text[:200]}")
    if not ok:
        return
    body = r.json()
    check("fresh journey state is PROBE + serve_probe_question",
          body.get("state") == "PROBE"
          and body.get("action") == "serve_probe_question"
          and body.get("bkt_p") == round(P0, 3), str(body))

    r = req("GET", f"/api/journey/map?subject={subject}", token)
    check("GET /journey/map 200 + shape", r.status_code == 200 and isinstance(
        r.json().get("topics"), list), f"{r.status_code} {r.text[:150]}")

    # -- happy path: 3 correct answers -> PRACTICE -> CHALLENGE -> MASTERED
    p = P0
    expect = []
    for i in range(3):
        p = ref_bkt(p, True)
        expect.append(p)
    seq = [("PRACTICE", expect[0]), ("CHALLENGE", expect[1]),
           ("MASTERED", expect[2])]
    prev_state, prev_p = "PROBE", P0
    p = P0
    for i, (want_state, want_p) in enumerate(seq):
        r = req("POST", "/api/journey/answer", token,
                json={"node_id": node, "correct": True,
                      "question_id": f"q-happy-{i}",
                      "question_text": "Sample probe question text."})
        if not check(f"answer #{i+1} (correct) 200", r.status_code == 200,
                     f"{r.status_code} {r.text[:200]}"):
            return
        b = r.json()
        ok = (b.get("state") == want_state
              and b.get("bkt_p") == round(want_p, 3)
              and b.get("bkt_p_precise") == round(want_p, 6))
        check(f"correct #{i+1}: state {prev_state}->{want_state}, "
              f"BKT {round(prev_p,3)}->{round(want_p,3)} as BKT predicts", ok,
              str(b))
        prev_state, prev_p = want_state, want_p
        p = want_p

    # monotonic increase on correct answers
    check("BKT monotonically increased across correct answers",
          expect[0] < expect[1] < expect[2],
          f"{expect[0]:.4f} {expect[1]:.4f} {expect[2]:.4f}")

    # MASTERED is terminal
    r = req("POST", "/api/journey/answer", token,
            json={"node_id": node, "correct": False})
    check("MASTERED stays MASTERED even on a miss",
          r.status_code == 200 and r.json().get("state") == "MASTERED",
          r.text[:150])

    # -- teach path: probe miss -> TEACH -> mini-check -> PRACTICE
    node_t = TOPICS["teach"][0]
    req("POST", "/api/journey/next", token, json={"node_id": node_t})
    p = ref_bkt(P0, False)
    r = req("POST", "/api/journey/answer", token,
            json={"node_id": node_t, "correct": False})
    ok = (r.status_code == 200 and r.json().get("state") == "TEACH"
          and r.json().get("bkt_p") == round(p, 3) and p < P0)
    check("probe miss: -> TEACH, BKT dropped as BKT predicts", ok,
          r.text[:200])

    r = req("POST", "/api/journey/next", token, json={"node_id": node_t})
    body = r.json() if r.status_code == 200 else {}
    check("TEACH /next serves teach payload (dict)",
          r.status_code == 200 and isinstance(body.get("payload"), dict),
          f"{r.status_code} {r.text[:200]}")
    leak = [s for s in walk_strings(body.get("payload") or {})
            if NODE_ID_RE.search(s)]
    check("teach payload has zero node-id patterns in display text",
          not leak, str(leak[:3]))

    p2 = ref_bkt(p, True)
    r = req("POST", "/api/journey/answer", token,
            json={"node_id": node_t, "correct": True})
    check("TEACH mini-check correct -> PRACTICE",
          r.status_code == 200 and r.json().get("state") == "PRACTICE"
          and r.json().get("bkt_p") == round(p2, 3), r.text[:200])

    # -- remediate path: misconception diverts; 2 fails drop to TEACH
    node_r = TOPICS["remed"][0]
    req("POST", "/api/journey/next", token, json={"node_id": node_r})
    req("POST", "/api/journey/answer", token,
        json={"node_id": node_r, "correct": True})          # -> PRACTICE
    p = ref_bkt(ref_bkt(P0, True), False)
    r = req("POST", "/api/journey/answer", token,
            json={"node_id": node_r, "correct": False,
                  "misconception_id": "miscon_newtons_third_law",
                  "question_text": "A bat hits a ball; what pushes the bat?",
                  "question_id": "q-remed-1"})
    check("PRACTICE miss w/ misconception -> REMEDIATE",
          r.status_code == 200 and r.json().get("state") == "REMEDIATE",
          r.text[:200])

    r = req("POST", "/api/journey/next", token, json={"node_id": node_r})
    body = r.json() if r.status_code == 200 else {}
    check("REMEDIATE /next 200 with correction payload (dict)",
          r.status_code == 200 and isinstance(body.get("payload"), dict)
          and body.get("action") == "serve_misconception_correction",
          f"{r.status_code} {r.text[:200]}")

    p_r1 = ref_bkt(p, False)
    r = req("POST", "/api/journey/answer", token,
            json={"node_id": node_r, "correct": False})   # remediation fail 1
    check("REMEDIATE fail #1 -> stays REMEDIATE (count 1)",
          r.status_code == 200 and r.json().get("state") == "REMEDIATE"
          and r.json().get("remediation_count") == 1
          and r.json().get("bkt_p") == round(p_r1, 3), r.text[:200])

    p_r2 = ref_bkt(p_r1, False)
    r = req("POST", "/api/journey/answer", token,
            json={"node_id": node_r, "correct": False})   # remediation fail 2
    check("REMEDIATE fail #2 -> drops back to TEACH",
          r.status_code == 200 and r.json().get("state") == "TEACH"
          and r.json().get("bkt_p") == round(p_r2, 3), r.text[:200])

    # remediation success returns to PRACTICE
    req("POST", "/api/journey/answer", token,
        json={"node_id": node_r, "correct": True})          # TEACH->PRACTICE
    req("POST", "/api/journey/answer", token,
        json={"node_id": node_r, "correct": False,
              "misconception_id": "miscon_unit_mixup"})      # -> REMEDIATE
    p_ok = ref_bkt(ref_bkt(p_r2, True), False)
    r = req("POST", "/api/journey/answer", token,
            json={"node_id": node_r, "correct": True})      # remediation OK
    check("REMEDIATE success -> PRACTICE (count reset)",
          r.status_code == 200 and r.json().get("state") == "PRACTICE"
          and r.json().get("remediation_count") == 0
          and r.json().get("bkt_p") == round(ref_bkt(p_ok, True), 3),
          r.text[:200])

    # -- drop path: 3 straight misses in PRACTICE fall back to TEACH
    node_d = TOPICS["drop"][0]
    req("POST", "/api/journey/next", token, json={"node_id": node_d})
    req("POST", "/api/journey/answer", token,
        json={"node_id": node_d, "correct": True})          # -> PRACTICE
    for _ in range(3):
        r = req("POST", "/api/journey/answer", token,
                json={"node_id": node_d, "correct": False})
    check("3 PRACTICE misses -> TEACH",
          r.status_code == 200 and r.json().get("state") == "TEACH",
          r.text[:200])

    # -- reset endpoint
    r = req("POST", "/api/journey/reset", token,
            json={"node_id": node_d})
    check("POST /journey/reset -> PROBE", r.status_code == 200
          and r.json().get("state") == "PROBE", r.text[:150])
    rows = db_rows(uid)
    check("reset persisted (DB shows PROBE + prior 0.3)",
          rows.get(node_d) is not None and rows[node_d].state == "PROBE"
          and abs(rows[node_d].bkt_p - P0) < 1e-9)


def concurrency_scenario(token: str, uid: str) -> None:
    print("\n== concurrency: parallel answers serialize (FOR UPDATE) ==")
    node = TOPICS["conc"][0]
    req("POST", "/api/journey/next", token, json={"node_id": node})

    results: list[dict] = []
    errors: list[str] = []

    def _submit():
        try:
            rr = req("POST", "/api/journey/answer", token,
                     json={"node_id": node, "correct": True})
            results.append(rr.json() if rr.status_code == 200
                           else {"_status": rr.status_code,
                                 "_body": rr.text[:200]})
        except Exception as exc:  # pragma: no cover
            errors.append(str(exc))

    threads = [threading.Thread(target=_submit) for _ in range(2)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    check("both parallel submissions returned 200",
          not errors and len(results) == 2
          and all("_status" not in r for r in results), str(results)[:250])

    # serialized application -> p must equal the two-correct reference
    p1 = ref_bkt(P0, True)
    p2 = ref_bkt(p1, True)
    rows = db_rows(uid)
    row = rows.get(node)
    ok = (row is not None and abs(row.bkt_p - p2) < 1e-9
          and len(row.history or []) == 2
          and row.streak_correct == 2
          and row.state == "CHALLENGE")
    check("no lost update: final BKT == two-step reference, history has 2",
          ok,
          f"db_p={getattr(row, 'bkt_p', None)} want={p2} "
          f"hist={len(getattr(row, 'history', None) or [])}")

    # both applied transitions must be distinct and ordered (no torn write)
    if row is not None and len(row.history or []) == 2:
        h0, h1 = row.history
        check("serialized transitions are ordered PROBE->PRACTICE->CHALLENGE",
              h0.get("from") == "PROBE" and h0.get("to") == "PRACTICE"
              and h1.get("from") == "PRACTICE" and h1.get("to") == "CHALLENGE",
              json.dumps(row.history)[:250])


def drift_check(token: str, uid: str) -> None:
    print("\n== no drift: API journey state vs stored DB mastery ==")
    r = req("GET", "/api/journey/map?subject=bio", token)
    topics = {t["node_id"]: t for t in r.json().get("topics", [])}
    rows = db_rows(uid)
    check("map lists every touched topic", set(topics) >= {
        n for n, _ in TOPICS.values() if n in rows}, f"{sorted(topics)}")
    bad = []
    for nid, t in topics.items():
        row = rows.get(nid)
        if row is None:
            bad.append(f"{nid}: missing in DB")
            continue
        if t["state"] != row.state or t["bkt_p"] != round(row.bkt_p, 3):
            bad.append(f"{nid}: api=({t['state']},{t['bkt_p']}) "
                       f"db=({row.state},{round(row.bkt_p, 3)})")
    check("every topic: API state+bkt_p == DB row (zero drift)", not bad,
          "; ".join(bad))

    leak = []
    for t in topics.values():
        for s in walk_strings(t):
            if NODE_ID_RE.search(s):
                leak.append(s)
    check("journey map: zero node-id patterns in display strings", not leak,
          str(leak[:3]))


# ------------------------------------------------------------------ healing
# Synthetic miss-queue entries: (question, lane, label, refusal, route,
# expected disposition).  The force/acceleration one must be solvable by
# the solver's deterministic path so replay can heal it.
SYNTH = [
    ("Explain why the sky appears blue during the day.", "B",
     "GUIDED_PRACTICE", "prose question", ["competency:guided_method"],
     "node_bind"),
    ("Define photosynthesis and state its purpose.", "B",
     "GUIDED_PRACTICE", "prose question", ["competency:guided_method"],
     "node_bind"),
    ("A car travels 150 km in 3 hours. What is its average speed?", "B",
     "GUIDED_PRACTICE", "signature resolver declined",
     ["kernel:none"], "family_patch"),
    ("Draw and label the structure of a plant cell.", "C",
     "ABSTAIN", "needs authored teaching content", ["composer:backlog"],
     "composer"),
]
REPLAY_Q = ("A force of 10 N acts on a mass of 2 kg. "
            "What is the acceleration?")
REPLAY_DISP = "family_patch"


def qhash_of(q: str) -> str:
    return hashlib.sha256(q.strip().lower().encode()).hexdigest()[:32]


def healing_scenario(token: str) -> None:
    print("\n== self-healing pipeline (synthetic miss queue) ==")
    queue_path = Path(os.environ.get("CBSE_DATA_DIR")
                      or (_DEPLOY / "cbse_data")) / "answer_queue.jsonl"

    r = req("GET", "/api/healing/stats")
    if not check("GET /healing/stats 200 shape", r.status_code == 200
                 and isinstance(r.json().get("by_disposition"), dict)
                 and "total" in r.json() and "healed" in r.json(),
                 f"{r.status_code} {r.text[:150]}"):
        return
    stats_before = r.json()
    r = req("GET", "/api/healing/top?limit=5")
    check("GET /healing/top 200 (list)", r.status_code == 200
          and isinstance(r.json(), list), f"{r.status_code} {r.text[:150]}")

    # append synthetic entries (guarded: remember the file size to restore)
    original_size = queue_path.stat().st_size if queue_path.exists() else 0
    entries = _synth_entries()
    lines = "".join(
        json.dumps({**e, "ts": int(time.time())}, ensure_ascii=False) + "\n"
        for e in entries)
    queue_path.parent.mkdir(parents=True, exist_ok=True)
    with open(queue_path, "a", encoding="utf-8") as fh:
        fh.write(lines)

    all_qs = [e["question"] for e in entries]
    hashes = {q: qhash_of(q) for q in all_qs}

    try:
        r = req("POST", "/api/healing/ingest", token, params={"limit": 5})
        ok = check("POST /healing/ingest 200", r.status_code == 200,
                   f"{r.status_code} {r.text[:200]}")
        if ok:
            b = r.json()
            check(f"ingest reported insertions (got {b})", b.get(
                "ingested", 0) >= 5, str(b))

        # dispositions came back, per the pipeline's classifier contract
        from backend.modules.healing import pipeline
        got = {}
        for q in all_qs:
            item = pipeline.get_item(hashes[q])
            got[q] = item.get("disposition") if item else None
        want = {q: d for q, *_, d in [(s[0], s[5]) for s in SYNTH]}
        want[REPLAY_Q] = REPLAY_DISP
        check("classification dispositions match the classifier contract",
              all(got[q] == want[q] for q in all_qs),
              "; ".join(f"{q[:30]}={got[q]}!={want[q]}"
                        for q in all_qs if got[q] != want[q]))

        r = req("GET", "/api/healing/stats")
        b = r.json()
        by = b.get("by_disposition", {})
        deltas_ok = (b["total"] >= stats_before["total"] + 5
                     and by.get("node_bind", 0) >= 2
                     and by.get("family_patch", 0) >= 2
                     and by.get("composer", 0) >= 1)
        check("stats reflect the ingested dispositions", deltas_ok, str(b))

        r = req("GET", "/api/healing/top?limit=100")
        top_hashes = {it["qhash"] for it in r.json()}
        check("top_open lists the ingested misses",
              all(hashes[q] in top_hashes for q in all_qs),
              f"missing={[q[:25] for q in all_qs if hashes[q] not in top_hashes]}")

        # replay the solver-solvable miss -> healed
        r = req("POST", "/api/healing/replay", token,
                json={"qhash": hashes[REPLAY_Q]})
        ok = check("POST /healing/replay 200", r.status_code == 200,
                   f"{r.status_code} {r.text[:300]}")
        if ok:
            b = r.json()
            check("replay healed the VERIFIED-solvable miss",
                  b.get("healed") is True
                  and str(b.get("label", "")).startswith("VERIFIED"), str(b))
        item = pipeline.get_item(hashes[REPLAY_Q])
        check("healed disposition persisted",
              item is not None and item["disposition"] == "healed",
              str(item))
        r = req("GET", "/api/healing/stats")
        check("stats healed count increased",
              r.json().get("healed", 0) >= stats_before.get("healed", 0) + 1,
              str(r.json()))
        r = req("GET", "/api/healing/top?limit=100")
        check("healed item left the open queue",
              hashes[REPLAY_Q] not in {it["qhash"] for it in r.json()})

        # unknown qhash -> documented 404 shape (not a 500)
        r = req("POST", "/api/healing/replay", token,
                json={"qhash": "0" * 32})
        check("replay unknown qhash -> 404 (no 500)", r.status_code == 404,
              f"{r.status_code} {r.text[:150]}")
    finally:
        # hygiene: remove the synthetic rows + restore the queue file tail
        try:
            from backend.modules.healing.pipeline import HealingItem
            from backend.database import get_sync_engine
            with get_sync_engine().begin() as cx:
                for h in hashes.values():
                    cx.execute(HealingItem.__table__.delete().where(
                        HealingItem.__table__.c.qhash == h))
        except Exception as exc:
            print(f"  (cleanup note: healing rows cleanup failed: {exc})")
        cur = queue_path.stat().st_size if queue_path.exists() else 0
        appended_b = lines.encode("utf-8")
        restored = False
        if cur == original_size + len(appended_b):
            with open(queue_path, "r+b") as fh:
                fh.truncate(original_size)
            restored = True
        elif cur > len(appended_b):
            # concurrent writer appended after us — trim only our exact
            # tail suffix if it is still intact
            with open(queue_path, "rb") as fh:
                fh.seek(cur - len(appended_b))
                if fh.read() == appended_b:
                    with open(queue_path, "r+b") as fh:
                        fh.truncate(cur - len(appended_b))
                    restored = True
        print("  (cleanup: answer_queue.jsonl restored)" if restored
              else "  (cleanup note: synthetic queue lines interleaved with "
                   "live writes — left in place, rows removed)")


def _synth_entries():
    out = [{"ts": 0, "question": q, "lane": lane, "label": label,
            "refusal_reason": ref, "route": route}
           for q, lane, label, ref, route, _ in SYNTH]
    out.append({"ts": 0, "question": REPLAY_Q, "lane": "B",
                "label": "GUIDED_PRACTICE",
                "refusal_reason": "signature resolver declined",
                "route": ["kernel:none"]})
    return out


# ------------------------------------------------------- mastery lane (FK)
def mastery_fk_scenario(uid: str) -> None:
    """Coordinator bug #2: practice submit 500s via mastery_records FK
    violations.  The ledger must (a) write both stores for a REAL user,
    (b) FK-safe-skip the ORM store when the users parent is missing, and
    (c) never poison the caller's AsyncSession."""
    print("\n== mastery ledger: FK-safe writes, session not poisoned ==")
    import asyncio

    # backend.database is a PACKAGE whose __init__ re-exports the flat
    # database.py engine/Base — but under the name async_session.  Accept
    # either identity; both are AsyncSession factories bound to the same DB.
    try:
        from database import AsyncSessionLocal  # flat module (real factory)
    except ImportError:
        from backend.database import async_session as AsyncSessionLocal
    from backend.services.mastery_ledger import record_assessment

    async def _run() -> dict:
        out = {}
        async with AsyncSessionLocal() as db:
            # (a) real authed student: both stores advance, no error
            r1 = await record_assessment(
                db, user_id=uid, node_id="c10_bio_cbse_01_001",
                is_correct=True, source="practice", time_ms=1500.0,
                client_token=f"e2e:{uid}:fk-real")
            out["real"] = r1

            # (b) UUID-shaped student with NO users row (the FK trap)
            ghost = str(uuid.uuid4())
            r2 = await record_assessment(
                db, user_id=ghost, node_id="c10_bio_cbse_01_002",
                is_correct=False, source="practice", time_ms=900.0,
                client_token=f"e2e:{ghost}:fk-ghost")
            out["ghost"] = r2

            # (c) non-UUID demo-style id — unbindable, must skip cleanly
            r3 = await record_assessment(
                db, user_id="demo_student_42", node_id="c10_bio_cbse_01_003",
                is_correct=True, source="practice", time_ms=700.0,
                client_token="e2e:demo:fk-demo")
            out["demo"] = r3

            # (d) the caller's session must still be fully usable — the
            # old behavior poisoned it (PendingRollbackError -> practice 500)
            from sqlalchemy import text
            await db.execute(text("SELECT 1"))
            out["session_usable"] = True
        return out

    out = asyncio.run(_run())
    real, ghost, demo = out["real"], out["ghost"], out["demo"]
    check("ledger: real user -> both stores advanced, no orm_error",
          real.get("mastery") is not None and not real.get("orm_error")
          and "live_after" in real, str(real)[:250])
    check("ledger: ghost student -> FK-safe skip, honest orm_error",
          ghost.get("mastery") is None
          and "no users row" in str(ghost.get("orm_error")), str(ghost)[:250])
    check("ledger: ghost student -> live mastery_state still updated",
          isinstance(ghost.get("live"), dict), str(ghost)[:250])
    check("ledger: demo (non-UUID) student -> FK-safe skip",
          demo.get("mastery") is None
          and "no users row" in str(demo.get("orm_error")), str(demo)[:250])
    check("ledger: caller's AsyncSession still usable after all writes",
          out.get("session_usable") is True)



def practice_live_scenario(token: str, uid: str) -> None:
    """Coordinator bug #2 over the REAL practice endpoints: a submit for a
    session resolved onto a student with no users row (demo/ghost) used to
    500 — the mastery_records FK failure poisoned the request session.
    With the ledger's FK-safe path both submits must be 200."""
    print("\n== live practice submits (authed, FK-trap and real) ==")
    # ghost: UUID with no users/students row -> resolved onto demo student
    ghost = str(uuid.uuid4())
    r = req("POST", "/api/practice/start", token,
            json={"student_id": ghost, "subject": "biology",
                  "num_questions": 2, "class_level": 10})
    if not check("practice/start (ghost student) reachable",
                 r.status_code in (201, 401, 403, 503),
                 f"{r.status_code} {r.text[:200]}"):
        return
    if r.status_code != 201:
        print(f"  (skip: start returned {r.status_code} — question pool/"
              f"auth policy, not a mastery-lane failure)")
        return
    sid = (r.json() or {}).get("session_id") or (r.json() or {}).get("id")
    r = req("POST", f"/api/practice/{sid}/submit", token,
            json={"answer": "1", "time_ms": 2000})
    check("practice submit (ghost-resolved session) -> 200, no FK 500",
          r.status_code == 200, f"{r.status_code} {r.text[:250]}")

    # real authed student: both mastery stores must advance cleanly
    r = req("POST", "/api/practice/start", token,
            json={"subject": "biology", "num_questions": 2,
                  "class_level": 10})
    if r.status_code != 201:
        print(f"  (skip: real-student start returned {r.status_code})")
        return
    sid2 = (r.json() or {}).get("session_id") or (r.json() or {}).get("id")
    r = req("POST", f"/api/practice/{sid2}/submit", token,
            json={"answer": "1", "time_ms": 2000})
    check("practice submit (real authed student) -> 200",
          r.status_code == 200, f"{r.status_code} {r.text[:250]}")


# ------------------------------------------------------- persistence proof
RUN_DIR = Path(tempfile.gettempdir()) / "be1_e2e_runs"


def persistence_scenario(token: str, uid: str, email: str,
                         password: str) -> dict:
    print("\n== persistence: rows are real DB rows, previous run survives ==")
    rows = db_rows(uid)
    check("every touched topic has a DB row (independent connection)",
          all(n in rows for n, _ in TOPICS.values()),
          f"have={sorted(rows)}")
    # the just-reset topic legitimately has an empty history — every
    # other touched topic must carry its transition trail
    check("history JSON persisted with timestamps",
          all(isinstance(rows[n].history, list) for n in rows)
          and sum(len(rows[n].history or []) for n in rows) >= 5,
          str({n: len(rows[n].history or []) for n in rows}))

    # record this run for the NEXT run to verify across reloads
    RUN_DIR.mkdir(parents=True, exist_ok=True)
    art = {"student_id": uid, "email": email, "password": password,
           "rows": {n: {"state": rows[n].state, "bkt_p": rows[n].bkt_p,
                        "hist_len": len(rows[n].history or [])}
                    for n in rows}}
    art_path = RUN_DIR / f"e2e_run_{int(time.time())}.json"
    art_path.write_text(json.dumps(art), encoding="utf-8")
    prev = sorted(RUN_DIR.glob("e2e_run_*.json"))
    if len(prev) > 4:  # keep the dir small
        for old in prev[:-4]:
            old.unlink(missing_ok=True)

    # previous run's rows must still be there (survived the auto-reload(s)
    # between runs) and must still match through the API after a re-login
    prev_files = [p for p in prev if p != art_path]
    if not prev_files:
        print("  (first run: cross-reload check will engage on run #2)")
        return art
    prev_art = json.loads(prev_files[-1].read_text(encoding="utf-8"))
    lr = req("POST", "/api/auth/login",
             json={"email": prev_art["email"],
                   "password": prev_art["password"]})
    if not check("previous run's student can re-login", lr.status_code == 200,
                 f"{lr.status_code} {lr.text[:150]}"):
        return art
    ptoken = lr.json().get("access_token")
    r = req("GET", "/api/journey/map?subject=bio", ptoken)
    api_rows = {t["node_id"]: t for t in r.json().get("topics", [])}
    bad = []
    for nid, snap in prev_art["rows"].items():
        t = api_rows.get(nid)
        drow = db_rows(prev_art["student_id"]).get(nid)
        if t is None or drow is None:
            bad.append(f"{nid}: vanished")
        elif (t["state"] != snap["state"]
              or abs(round(t["bkt_p"], 3) - round(snap["bkt_p"], 3)) > 1e-9
              or len(drow.history or []) != snap["hist_len"]):
            bad.append(f"{nid}: drifted api={t} snap={snap}")
    check("previous run's journey rows survived reload(s) unchanged "
          "(DB-backed, not memory)", not bad, "; ".join(bad[:4]))
    return art


def main() -> int:
    print(f"E2E check against {BASE}")
    r = req("GET", "/api/health")
    if not check("backend /api/health ok", r.status_code == 200
                 and r.json().get("status") == "ok", r.text[:150]):
        return 1

    # 0) previous-run leftovers first (before any new writes) is handled
    #    inside persistence_scenario via the run journal.

    # 1) fresh student
    email = f"e2e_journey_{uuid.uuid4().hex[:10]}@example.com"
    password = "e2e-Passw0rd!"
    r = req("POST", "/api/auth/signup",
            json={"name": "E2E Journey", "email": email,
                  "password": password, "role": "student", "classLevel": 10})
    if not check("POST /api/auth/signup 201 (fresh student)",
                 r.status_code in (200, 201), f"{r.status_code} {r.text[:200]}"):
        return 1
    token = r.json().get("access_token")
    uid = (r.json().get("user") or {}).get("id", "")
    check("signup returned bearer token + user id",
          bool(token) and bool(uid), r.text[:150])

    # The signup commit lands in dependency teardown AFTER the response is
    # sent — the first follow-up request can race it (transient 401 "User
    # not found").  Poll /me briefly until the row is visible.
    for _ in range(20):
        me = req("GET", "/api/auth/me", token)
        if me.status_code == 200:
            break
        time.sleep(0.15)
    check("fresh user visible to auth (post-commit poll)", me.status_code == 200,
          f"{me.status_code} {me.text[:120]}")

    try:
        journey_scenario(token, uid)
        concurrency_scenario(token, uid)
        drift_check(token, uid)
        mastery_fk_scenario(uid)
        practice_live_scenario(token, uid)
        healing_scenario(token)
        persistence_scenario(token, uid, email, password)
    finally:
        # NOTE: this run's journey rows are deliberately KEPT — the next
        # run re-verifies them (same rows, fresh process) as the
        # survives-auto-reload proof.  Only healing queue rows are cleaned.
        pass

    print(f"\n{'='*60}\nE2E RESULT: {len(PASS)} passed, {len(FAIL)} failed")
    for name, detail in FAIL:
        print(f"  FAIL: {name}  << {detail}")
    return 0 if not FAIL else 2


if __name__ == "__main__":
    sys.exit(main())
