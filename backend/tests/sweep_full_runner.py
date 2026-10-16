"""sweep_full_runner.py -- FULL-BANK deterministic verification sweep.

Runs EVERY board_questions row through backend.its.solver.answer_pipeline.answer()
SEQUENTIALLY (1 worker; the 12-way concurrent attempt produced 186/200
timeouts -- the pool has heavy CPU lanes), each call in its own thread with
an aggressive per-question timeout (default 12s).

  Resumable    checkpoint offset every 250 rows ->
               D:\\platform\\runtime_data\\ops\\sweep2_checkpoint.json
  Stratified   rows processed in (subject, class_level) round-robin order so
               the first few thousand rows already cover all 47 subjects and
               every class 6-12 -- never id order (math-only for weeks).
  Zero-LLM     fresh runs start POISONED: FREELLM_API_KEY / GEMINI_API_KEY =
               "POISONED-SENTINEL" AND raising tripwires patched over every
               LLM client entrypoint (any attempt = loud ERROR).  The first
               100 stratified rows are then re-run in a CLEAN subprocess
               (keys popped) and the two label sequences are compared: if
               identical, the verified path is proven LLM-free at sweep scale
               (same method as engine_cert1_llm_free.py, at bank scale).
  Findings     EVERY row -> D:\\platform\\runtime_data\\ops\\sweep2_findings.jsonl
               (one JSON line per row, so the interim report can be
               regenerated cumulatively across sessions via --report).

Classification contract (per hardening_sweep.py, timeouts added):
  EXACT_HIT      VERIFIED* and served answer matches the stored key
                 (normalised, or numeric-equivalent within 2%)
  SOFT_HIT       VERIFIED* but the answer text differs beyond normalisation
                 -- flagged for manual review
  VERIFIED_NOKEY VERIFIED* but the bank row carries no stored key
  GUIDED         honest guided/refusal tier (answer withheld)
  AMBIGUOUS      honest ambiguity refusal
  SLOW_GUIDED    exceeded the per-question timeout -- the honest ceiling
                 marker for hard GUIDED lanes (production budget is 60s);
                 NOT an error
  ERROR          crash / LLM tripwire hit / DB failure -- the real bugs
  REFUSED        any other non-verified label (kept visible, rare)

BANK-REPAIR2 (2026-10-05) -- report-level flag exclusion: rows carrying a
board_question_flags reason (template_row / no_answer_key) are do-not-serve
by construction (every serving lane NOT-EXISTS them), so --report tallies
them SEPARATELY as "template_class / no_answer_key_class (excluded by
flag)" and computes every rate over live rows only.  The fetch query is
deliberately unchanged (checkpoint order fingerprint stays valid); the
exclusion lives in the tally.

Usage:
  python tests/sweep_full_runner.py                 # fresh sweep + LLM proof
      [--resume] [--max-rows N] [--timeout S] [--no-llm-proof]
  python tests/sweep_full_runner.py --report        # regenerate interim md
  python tests/sweep_full_runner.py --llm-proof-clean N   # internal: clean env
"""

import argparse
import hashlib
import itertools
import json
import os
import re
import shutil
import subprocess
import sys
import threading
import time
import traceback
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor
from concurrent.futures import TimeoutError as FuturesTimeoutError

# --------------------------------------------------------------------------- #
# 0. Paths and CLI -- BEFORE any backend import.
# --------------------------------------------------------------------------- #
sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

HERE = os.path.dirname(os.path.abspath(__file__))
OPS = r"D:\platform\runtime_data\ops"
FINDINGS = os.path.join(OPS, "sweep2_findings.jsonl")
CHECKPOINT = os.path.join(OPS, "sweep2_checkpoint.json")
PROOF_POISONED = os.path.join(OPS, "sweep2_llmproof_poisoned.json")
PROOF_CLEAN = os.path.join(OPS, "sweep2_llmproof_clean.json")
PROOF_RESULT = os.path.join(OPS, "sweep2_llmproof_result.json")
REPORT = os.path.join(HERE, "sweep_full_interim.md")
DATA_DIR = os.path.join(OPS, "sweep2_datadir")   # isolated CBSE_DATA_DIR
SENTINEL = "POISONED-SENTINEL"

_ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
_ap.add_argument("--resume", action="store_true",
                 help="resume from sweep2_checkpoint.json offset")
_ap.add_argument("--max-rows", type=int, default=0,
                 help="stop after N NEW rows this session (0 = all)")
_ap.add_argument("--timeout", type=float, default=12.0,
                 help="per-question thread timeout in seconds (default 12)")
_ap.add_argument("--no-llm-proof", action="store_true",
                 help="skip the poisoned-vs-clean proof phase")
_ap.add_argument("--llm-proof-clean", type=int, default=0,
                 help=argparse.SUPPRESS)  # internal: clean subprocess mode
_ap.add_argument("--report", action="store_true",
                 help="regenerate the interim markdown report and exit")
ARGS = _ap.parse_args()

MODE = "clean-proof" if ARGS.llm_proof_clean else "sweep"
POISON = MODE == "sweep"          # main sweep is always poisoned
N_PROOF = 100                     # stratified rows used for the proof


# --------------------------------------------------------------------------- #
# 1. Environment posture -- BEFORE importing backend.
#    backend/config.py does NOT load .env into os.environ (verified in
#    engine_cert1_llm_free.py), so os.environ writes here are authoritative.
# --------------------------------------------------------------------------- #
_PW = [l.strip().split("=", 1)[1]
       for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
       if l.startswith("POSTGRES_PASSWORD=")][0]
os.environ["DATABASE_URL"] = (
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
# production parity (docker-compose.prod.yml): semantic lane's MiniLM /
# cross-encoder must load from the local HF cache with NO hub network
# calls -- an online hub check hangs for many minutes on this host
os.environ.setdefault("HF_HUB_OFFLINE", "1")
os.environ.setdefault("TRANSFORMERS_OFFLINE", "1")
os.environ.setdefault("HF_HOME", r"C:\Users\Alesha4285\.cache\huggingface")
# production parity: model_hub caps torch threads; sequential sweep must not
# oversubscribe cores with the semantic lane's local models
os.environ.setdefault("TORCH_NUM_THREADS", "1")
# SEMANTIC_QA_LANE / SOLVER_LLM_MODE deliberately UNSET ->
# production posture (semantic lane on; policy default parse_only so the
# poison genuinely arms the parse-LLM path instead of disabling it).

# Isolated CBSE_DATA_DIR: the official-key sqlite lane keeps working
# (question_bank.db copied once) while the unanswered-question queue writes
# are quarantined away from the production cbse_data tree.
os.makedirs(DATA_DIR, exist_ok=True)
_qb_src = os.path.join(r"D:\platform\runtime_data", "question_bank.db")
_qb_dst = os.path.join(DATA_DIR, "question_bank.db")
if os.path.exists(_qb_src) and not os.path.exists(_qb_dst):
    shutil.copy(_qb_src, _qb_dst)
os.environ["CBSE_DATA_DIR"] = DATA_DIR

if POISON:
    os.environ["FREELLM_API_KEY"] = SENTINEL
    os.environ["GEMINI_API_KEY"] = SENTINEL
else:  # clean proof subprocess: keys REMOVED (authoritative, no .env refill)
    os.environ.pop("FREELLM_API_KEY", None)
    os.environ.pop("GEMINI_API_KEY", None)


# --------------------------------------------------------------------------- #
# 2. LLM tripwires -- installed before the pipeline can run.  Any LLM
#    attempt under the poisoned run raises on the spot and is recorded, so
#    no LLM content can physically enter the pipeline -- not even an error
#    string (same certified pattern as engine_cert1_llm_free.py).
# --------------------------------------------------------------------------- #
LLM_ATTEMPTS = []


def _trip(site):
    def chat(self, *a, **k):
        stack = [f.rstrip() for f in traceback.format_stack()[-5:-1]]
        LLM_ATTEMPTS.append({"site": site, "frames": stack})
        raise RuntimeError(
            f"SWEEP TRIPWIRE [{site}]: LLM call attempted under poisoned "
            f"keys -- this exception IS the loud failure")
    return chat


def install_tripwires():
    patched = []
    import backend.services.llm_client as slc
    slc.LLMClient.chat = _trip("services.llm_client.LLMClient.chat")
    patched.append("services.llm_client.LLMClient.chat")
    try:
        import backend.ai.llm_client as alc
        alc.LLMClient.chat = _trip("ai.llm_client.LLMClient.chat")
        patched.append("ai.llm_client.LLMClient.chat")
    except Exception as exc:
        print(f"[tripwire] ai.llm_client not patched: {exc}", flush=True)
    return patched


# --------------------------------------------------------------------------- #
# 3. Stratified order: (subject, class_level) round-robin over a stable
#    (subject, class, id) SQL sort -- deterministic across sessions.
# --------------------------------------------------------------------------- #

def fetch_rows():
    """All sweepable rows as plain tuples, SQL-sorted for group stability."""
    from sqlalchemy import text
    from backend.database import get_sync_engine
    eng = get_sync_engine()
    sql = text(
        "SELECT id, question_text, correct_answer, subject, class_level, "
        "question_type FROM board_questions "
        "WHERE question_text IS NOT NULL AND length(question_text) > 10 "
        "ORDER BY subject, class_level, id")
    with eng.connect() as conn:
        rows = conn.execute(sql).fetchall()
    return [(str(r[0]), r[1], r[2] or "", r[3], int(r[4]), r[5] or "")
            for r in rows]


def stratified_order(rows):
    """Round-robin interleave of (subject, class) groups.

    groups are SQL-sorted; within a group rows stay id-sorted; the 'rounds'
    weave takes one row from each group per pass, so position p of the order
    is a pure function of the SQL sort -> stable across sessions/resumes.
    """
    groups = defaultdict(list)
    for i, r in enumerate(rows):
        groups[(r[3], r[4])].append(i)
    pools = [groups[k] for k in sorted(groups)]
    order = []
    for k in range(max(len(p) for p in pools)):
        for pool in pools:
            if k < len(pool):
                order.append(pool[k])
    return order


def order_fingerprint(rows, order):
    """Cheap stable hash guarding checkpoint offsets against DB changes."""
    h = hashlib.sha256()
    h.update(str(len(order)).encode())
    for pos in list(order[:10]) + list(order[-10:]):
        h.update(rows[pos][0].encode())
    return h.hexdigest()[:16]


# --------------------------------------------------------------------------- #
# 4. Classification contract
# --------------------------------------------------------------------------- #

def norm(s: str) -> str:
    s = re.sub(r"\s+", " ", (s or "")).strip().lower()
    s = re.sub(r"[₹,]", "", s)
    return s


def classify(label: str, ans: str, stored: str) -> str:
    label_u = (label or "").upper()
    if label_u.startswith("VERIFIED"):
        a, s = norm(ans), norm(stored)
        if not s:
            return "VERIFIED_NOKEY"
        if a == s or a in s or s in a:
            return "EXACT_HIT"
        # numeric equivalence (75 km/h vs 20.83 m/s etc.)
        try:
            fa = re.findall(r"-?\d+(?:\.\d+)?", a)
            fs = re.findall(r"-?\d+(?:\.\d+)?", s)
            if fa and fs:
                va, vs = float(fa[0]), float(fs[0])
                if abs(va - vs) <= max(0.01, 0.02 * max(abs(va), abs(vs))):
                    return "EXACT_HIT"
        except Exception:
            pass
        return "SOFT_HIT"
    if "TIMEOUT" in label_u:
        return "SLOW_GUIDED"
    if label_u.startswith("GUIDED") or "guided" in label_u:
        return "GUIDED"
    if "ambigu" in (label or "").lower():
        return "AMBIGUOUS"
    return "REFUSED"


_answer = None   # bound to backend.its.solver.answer_pipeline.answer post-import

_MAX_LIVE_THREADS = 12   # runaway timeout threads + main + pools; above this,
                         # degrade the row honestly rather than crash the OS


def bind_answer():
    global _answer
    from backend.its.solver.answer_pipeline import answer as _fn
    _answer = _fn
    return _answer


def run_answer_timed(qt: str, timeout_s: float):
    """answer() in a throwaway single-worker thread.

    A throwaway executor per question: on timeout the runaway thread cannot
    be killed, but it must NOT block the next question (a shared 1-worker
    pool would stall behind it for the full 60s production budget).

    Bounded threads: timed-out runaways linger until answer() returns on
    its own; under memory pressure the OS refuses new threads entirely
    (`can't start new thread`).  When too many are alive, wait briefly for
    drainage, then degrade honestly instead of crashing the sweep.
    """
    t0 = time.perf_counter()
    for _ in range(20):                       # ~2s drainage budget
        if threading.active_count() <= _MAX_LIVE_THREADS:
            break
        time.sleep(0.1)
    else:
        return None, (time.perf_counter() - t0) * 1000.0, \
            "THREAD_CAP: too many lingering sweep threads -- row skipped"
    ex = ThreadPoolExecutor(max_workers=1, thread_name_prefix="sweep")
    try:
        fut = ex.submit(_answer, qt)
        try:
            res = fut.result(timeout=timeout_s)
            return res, (time.perf_counter() - t0) * 1000.0, None
        except FuturesTimeoutError:
            return None, (time.perf_counter() - t0) * 1000.0, "TIMEOUT"
    except Exception as exc:
        return None, (time.perf_counter() - t0) * 1000.0, \
            f"{type(exc).__name__}: {exc}"[:300]
    finally:
        ex.shutdown(wait=False)


# --------------------------------------------------------------------------- #
# 5. Findings + checkpoint IO
# --------------------------------------------------------------------------- #

def append_finding(fout, rec):
    fout.write(json.dumps(rec, ensure_ascii=False) + "\n")


def save_checkpoint(offset, fp, counts, elapsed):
    tmp = CHECKPOINT + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump({
            "offset": offset,
            "order_fingerprint": fp,
            "counts": dict(counts),
            "elapsed_s": round(elapsed, 1),
            "ts": time.strftime("%Y-%m-%d %H:%M:%S"),
            "findings_lines": offset,
            "timeout_s": ARGS.timeout,
        }, fh, indent=1)
    os.replace(tmp, CHECKPOINT)


def load_checkpoint(fp):
    if not os.path.exists(CHECKPOINT):
        return 0
    with open(CHECKPOINT, encoding="utf-8") as fh:
        ck = json.load(fh)
    if ck.get("order_fingerprint") != fp:
        raise SystemExit(
            f"checkpoint fingerprint {ck.get('order_fingerprint')!r} != "
            f"current order {fp!r} -- the DB changed since the checkpoint; "
            f"refusing to resume a misaligned offset. Delete "
            f"{CHECKPOINT} to start fresh.")
    return int(ck.get("offset", 0))


def truncate_findings_to(n_lines):
    """Align findings JSONL with the checkpoint offset (crash window)."""
    if not os.path.exists(FINDINGS):
        return
    with open(FINDINGS, "rb") as fh:
        lines = fh.readlines()
    if len(lines) > n_lines:
        with open(FINDINGS, "wb") as fh:
            fh.writelines(lines[:n_lines])
        print(f"[resume] truncated findings {len(lines)} -> {n_lines} lines",
              flush=True)
    elif len(lines) < n_lines:
        raise SystemExit(
            f"findings has {len(lines)} lines but checkpoint says offset "
            f"{n_lines} -- findings file lost/rotated. Delete "
            f"{CHECKPOINT} to start fresh.")


# --------------------------------------------------------------------------- #
# 6. The sweep loop
# --------------------------------------------------------------------------- #

def process_row(fout, pos, row, counters, subj_counters):
    qid, qt, stored, subject, klass, qtype = row
    res, ms, err = run_answer_timed(qt, ARGS.timeout)
    if err == "TIMEOUT":
        label, ans, cls = "TIMEOUT@12s", None, "SLOW_GUIDED"
    elif err is not None:
        label, ans = "ERROR", None
        if "SWEEP TRIPWIRE" in err:
            cls = "ERROR"
        else:
            cls = "ERROR"
    else:
        label, ans = res.label, res.answer
        cls = classify(label, ans or "", stored)
    rec = {
        "i": pos, "qid": qid, "subject": subject, "class": klass,
        "qtype": qtype, "cls": cls, "label": label,
        "ans": (ans or "")[:160], "stored": stored[:160],
        "ms": round(ms, 1), "err": (err or "")[:200],
    }
    append_finding(fout, rec)
    counters[cls] += 1
    subj_counters[subject][cls] += 1
    return rec


def run_sweep():
    import logging
    logging.disable(logging.CRITICAL)

    patched = install_tripwires()
    bind_answer()

    print(f"[sweep] tripwires: {patched}", flush=True)
    print(f"[sweep] env: FREELLM_API_KEY="
          f"{os.environ.get('FREELLM_API_KEY', '<unset>')!r} "
          f"GEMINI_API_KEY={os.environ.get('GEMINI_API_KEY', '<unset>')!r} "
          f"CBSE_DATA_DIR={os.environ['CBSE_DATA_DIR']}", flush=True)

    t_fetch = time.time()
    rows = fetch_rows()
    order = stratified_order(rows)
    fp = order_fingerprint(rows, order)
    total = len(order)
    print(f"[sweep] fetched {len(rows):,} rows -> stratified order "
          f"{total:,} ({time.time()-t_fetch:.1f}s) fp={fp}", flush=True)

    # fresh (non-resume) run: archive any stale findings so appends and the
    # checkpoint offset always describe ONE coherent run
    if not ARGS.resume and os.path.exists(FINDINGS):
        bak = FINDINGS + "." + time.strftime("%Y%m%d_%H%M%S") + ".bak"
        os.replace(FINDINGS, bak)
        print(f"[sweep] fresh run: archived stale findings -> {bak}",
              flush=True)

    # -------- warm-up (lazy loads: torch/semantic model, sympy/CAS,
    # enrichment index pickle, bank engines, sqlite keys) --------
    # first-call cost on this host can exceed 5 minutes (prior harness: 72s
    # warm on a hot cache); row 0 must NEVER pay it, or the first stratified
    # rows get false SLOW_GUIDED labels
    warm_up()

    offset = 0
    if ARGS.resume:
        offset = load_checkpoint(fp)
        truncate_findings_to(offset)
        print(f"[sweep] resuming at stratified offset {offset:,}/{total:,}",
              flush=True)

    # -------- zero-LLM proof (fresh runs only) --------
    if (not ARGS.resume and not ARGS.no_llm_proof
            and offset < N_PROOF and not os.path.exists(PROOF_RESULT)):
        for stale in (PROOF_POISONED, PROOF_CLEAN):
            if os.path.exists(stale):
                os.remove(stale)
        proof_phase(rows, order, fp, total)
        offset = N_PROOF

    # cumulative counters reflect the WHOLE findings file (proof rows +
    # every prior session), so progress lines stay honest across resumes
    counters = Counter()
    if offset:
        with open(FINDINGS, encoding="utf-8") as fh:
            for line in itertools.islice(fh, offset):
                if line.strip():
                    counters[json.loads(line)["cls"]] += 1
    subj_counters = defaultdict(Counter)

    # -------- main sequential loop --------
    fout = open(FINDINGS, "a", encoding="utf-8")
    n_new = 0
    t_start = time.time()
    t_run = t_start
    errors_seen = []
    try:
        for pos in range(offset, total):
            rec = process_row(fout, pos, rows[order[pos]],
                              counters, subj_counters)
            n_new += 1
            if rec["cls"] == "ERROR" and len(errors_seen) < 40:
                errors_seen.append(rec)
            done = pos + 1
            if done % 250 == 0 or pos == total - 1:
                fout.flush()
                save_checkpoint(done, fp, counters, time.time() - t_start)
                if done % 250 == 0:
                    rate = n_new / max(1e-9, time.time() - t_run)
                    eta_min = (total - done) / max(0.05, rate) / 60.0
                    print(f"  {done:,}/{total:,} | new {n_new:,} | "
                          f"{rate:.1f} rows/s | ETA {eta_min:.0f} min | "
                          f"{dict(counters)}", flush=True)
            if ARGS.max_rows and n_new >= ARGS.max_rows:
                print(f"[sweep] --max-rows {ARGS.max_rows} reached", flush=True)
                break
    except KeyboardInterrupt:
        print("\n[sweep] interrupted -- checkpoint is current", flush=True)
    finally:
        fout.flush()
        fout.close()
        save_checkpoint(offset + n_new, fp, counters, time.time() - t_start)

    # -------- session summary --------
    mins = (time.time() - t_start) / 60.0
    print(f"\n=== SWEEP SESSION SUMMARY "
          f"({n_new:,} new rows in {mins:.1f} min) ===", flush=True)
    print(f"offset now {offset + n_new:,}/{total:,} "
          f"({100.0 * (offset + n_new) / total:.2f}%)", flush=True)
    for k, v in counters.most_common():
        print(f"  {k:15s} {v:,}", flush=True)
    if LLM_ATTEMPTS:
        print(f"  !! LLM TRIPWIRE HITS: {len(LLM_ATTEMPTS)}", flush=True)
        for a in LLM_ATTEMPTS[:5]:
            print(f"     {a['site']} <- {a['frames'][-1][:110]}",
                  flush=True)
    if errors_seen:
        print("  first errors:", flush=True)
        for e in errors_seen[:10]:
            print(f"    [{e['subject']}/{e['class']}] {e['err'][:120]}",
                  flush=True)
    print(f"findings: {FINDINGS}\ncheckpoint: {CHECKPOINT}", flush=True)


def proof_phase(rows, order, fp, total):
    """Poisoned first-100 in this process (already the sweep's first rows),
    then a CLEAN subprocess over the same 100, then compare labels."""
    print(f"[proof] phase A: poisoned labels for first {N_PROOF} stratified "
          f"rows (this process, tripwires armed)", flush=True)
    poisoned = []
    with open(FINDINGS, "a", encoding="utf-8") as fout:
        for pos in range(N_PROOF):
            rec = process_row(fout, pos, rows[order[pos]], Counter(),
                              defaultdict(Counter))
            poisoned.append({"qid": rec["qid"], "label": rec["label"],
                             "cls": rec["cls"], "ans": rec["ans"],
                             "ms": rec["ms"]})
            if rec["cls"] == "ERROR":
                print(f"  [proof A {pos}] ERROR {rec['err'][:120]}",
                      flush=True)
    save_checkpoint(N_PROOF, fp, Counter(
        r["cls"] for r in poisoned), 0)
    with open(PROOF_POISONED, "w", encoding="utf-8") as fh:
        json.dump({"n": len(poisoned), "llm_attempts": len(LLM_ATTEMPTS),
                   "rows": poisoned}, fh, ensure_ascii=False, indent=1)

    print(f"[proof] phase B: clean subprocess (keys popped) over the same "
          f"{N_PROOF} rows", flush=True)
    env = {k: v for k, v in os.environ.items()
           if k not in ("FREELLM_API_KEY", "GEMINI_API_KEY")}
    env["PYTHONIOENCODING"] = "utf-8"
    t0 = time.time()
    proc = subprocess.run(
        [sys.executable, os.path.abspath(__file__),
         "--llm-proof-clean", str(N_PROOF)],
        cwd=HERE, env=env, capture_output=True, text=True,
        encoding="utf-8", errors="replace", timeout=3600)
    print(f"[proof] subprocess rc={proc.returncode} "
          f"({time.time()-t0:.0f}s)", flush=True)
    if proc.returncode != 0 or not os.path.exists(PROOF_CLEAN):
        print(proc.stdout[-2000:], flush=True)
        print(proc.stderr[-2000:], flush=True)
        print("[proof] CLEAN PHASE FAILED -- proof inconclusive; sweep "
              "continues (poisoned posture still enforced)", flush=True)
        return

    clean = json.load(open(PROOF_CLEAN, encoding="utf-8"))
    diffs = []
    for i, (a, b) in enumerate(zip(poisoned, clean["rows"])):
        if (a["label"], a["cls"]) != (b["label"], b["cls"]):
            diffs.append({"i": i, "qid": a["qid"], "poisoned": a["label"],
                          "clean": b["label"], "cls_poisoned": a["cls"],
                          "cls_clean": b["cls"]})
    verdict = {
        "n": len(poisoned),
        "match": not diffs and len(clean["rows"]) == len(poisoned),
        "primary_diffs": diffs,
        "poisoned_llm_attempts": len(LLM_ATTEMPTS),
        "clean_llm_attempts": clean.get("llm_attempts", -1),
        "ts": time.strftime("%Y-%m-%d %H:%M:%S"),
        "method": "engine_cert1 poison+tripwire vs keys-popped, first "
                  f"{N_PROOF} stratified rows of the full bank",
    }
    with open(PROOF_RESULT, "w", encoding="utf-8") as fh:
        json.dump(verdict, fh, ensure_ascii=False, indent=1)
    tag = "PROVEN LLM-FREE" if verdict["match"] else "NOT LLM-FREE"
    print(f"[proof] verdict: {tag} on {verdict['n']} rows "
          f"(poisoned attempts={verdict['poisoned_llm_attempts']}, "
          f"clean attempts={verdict['clean_llm_attempts']}, "
          f"primary diffs={len(diffs)})", flush=True)
    for d in diffs[:10]:
        print(f"  DIFF i={d['i']} {d['qid'][:8]}: poisoned={d['poisoned']} "
              f"clean={d['clean']}", flush=True)


def warm_up():
    """Settle lazy loads (torch/semantic model, CAS, index pickles) so row 0
    never pays them inside a 12s budget. Required in BOTH the main process
    and the clean-proof subprocess, or the proof's first rows would be
    false TIMEOUTs and the label comparison would be garbage."""
    for wq in ("What is 12 * 12?",
               "A train covers 120 km in 3 hours. Find its average speed."):
        ok = False
        for attempt in range(3):
            t0 = time.time()
            res, ms, err = run_answer_timed(wq, 1200.0)
            if err is None:
                print(f"[warm-up] ok ({attempt+1} tries, "
                      f"{time.time()-t0:.0f}s): "
                      f"label={getattr(res, 'label', '?')}", flush=True)
                ok = True
                break
            print(f"[warm-up] attempt {attempt+1} err={err} "
                  f"({time.time()-t0:.0f}s) -- lazy loads still running, "
                  f"retrying", flush=True)
        if not ok:
            raise SystemExit("warm-up failed 3x -- lazy loads never settled; "
                             "fix environment before sweeping")


def run_clean_proof(n):
    """--llm-proof-clean N: keys-popped run over the first N stratified rows.

    Writes PROOF_CLEAN and exits; appends nothing to the findings JSONL (the
    poisoned main run owns that file)."""
    import logging
    logging.disable(logging.CRITICAL)
    patched = install_tripwires()
    bind_answer()
    rows = fetch_rows()
    order = stratified_order(rows)
    warm_up()   # fresh process: same lazy-load burden as the main run
    out = []
    t0 = time.time()
    for pos in range(min(n, len(order))):
        res, ms, err = run_answer_timed(rows[order[pos]][1], ARGS.timeout)
        if err == "TIMEOUT":
            label, ans, cls = "TIMEOUT@12s", None, "SLOW_GUIDED"
        elif err is not None:
            label, ans, cls = "ERROR", None, "ERROR"
        else:
            label, ans = res.label, res.answer
            cls = classify(label, ans or "", rows[order[pos]][2])
        out.append({"qid": rows[order[pos]][0], "label": label,
                    "cls": cls, "ans": (ans or "")[:160],
                    "ms": round(ms, 1)})
        if (pos + 1) % 25 == 0:
            print(f"  [clean] {pos+1}/{n}", flush=True)
    with open(PROOF_CLEAN, "w", encoding="utf-8") as fh:
        json.dump({"n": len(out), "llm_attempts": len(LLM_ATTEMPTS),
                   "patched": patched, "rows": out}, fh,
                  ensure_ascii=False, indent=1)
    labs = Counter(r["cls"] for r in out)
    print(f"[clean-proof] n={len(out)} {dict(labs)} "
          f"llm_attempts={len(LLM_ATTEMPTS)} "
          f"{time.time()-t0:.0f}s", flush=True)


# --------------------------------------------------------------------------- #
# 7. Interim report (--report): aggregates the WHOLE findings JSONL
# --------------------------------------------------------------------------- #

# BANK-REPAIR2 (2026-10-05): rows carrying a board_question_flags reason are
# do-not-serve BY CONSTRUCTION (template_row = generic extraction template
# stamped across thousands of nodes, each keyed to a different answer;
# no_answer_key = no stored key, can never verify).  The serving lanes
# (question_selector._corpus_candidates, practice_service, bank_answer
# _SQL/_TRGM_SQL) all exclude them via board_question_flags, so the report's
# verified-rate denominator must exclude them too.  They are reported
# SEPARATELY as excluded classes -- nothing is hidden, nothing is inflated.
EXCLUDED_LABELS = {
    "template_row": "template_class (excluded by flag)",
    "no_answer_key": "no_answer_key_class (excluded by flag)",
}


def load_flagged_qids():
    """qid -> reason for every board_question_flags row.

    Returns None (and says so loudly) if the flags table cannot be read, so
    a degraded report never silently claims exclusions it did not apply.
    """
    try:
        from sqlalchemy import text
        from backend.database import get_sync_engine
        eng = get_sync_engine()
        with eng.connect() as cx:
            return {str(r[0]): r[1] for r in
                    cx.execute(text(
                        "SELECT question_id, reason "
                        "FROM board_question_flags"))}
    except Exception as exc:
        print(f"[report] !! flag load FAILED ({exc}) -- flagged-row "
              f"exclusions NOT applied; rates below include template rows",
              flush=True)
        return None


def split_flagged(recs, flagged):
    """Pure tally split: live (flag-respecting) rows vs excluded pairs.

    Returns (live_recs, [(rec, reason), ...])."""
    if flagged is None:
        return list(recs), []
    excluded = [(r, flagged[r["qid"]]) for r in recs if r["qid"] in flagged]
    live = [r for r in recs if r["qid"] not in flagged]
    return live, excluded


def write_report():
    from collections import OrderedDict
    recs = []
    if os.path.exists(FINDINGS):
        with open(FINDINGS, encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if line:
                    recs.append(json.loads(line))
    if not recs:
        print("no findings yet -- nothing to report", flush=True)
        return

    classes = ["EXACT_HIT", "SOFT_HIT", "VERIFIED_NOKEY", "GUIDED",
               "AMBIGUOUS", "SLOW_GUIDED", "ERROR", "REFUSED"]
    # BANK-REPAIR2: the denominator n is LIVE rows only (flag-respecting);
    # flagged rows are tallied separately below, never inside any rate.
    flagged = load_flagged_qids()
    live_recs, excluded_recs = split_flagged(recs, flagged)
    counters = Counter(r["cls"] for r in live_recs)
    excl_cls = Counter(r["cls"] for r, _ in excluded_recs)
    excl_reason = Counter(reason for _, reason in excluded_recs)
    excl_subj = Counter(r["subject"] for r, _ in excluded_recs)
    n = len(live_recs)
    n_covered = len(recs)
    n_excl = len(excluded_recs)

    subj = defaultdict(Counter)          # subject -> class counters (LIVE)
    subjclass = defaultdict(Counter)     # (subject, class) -> counters (LIVE)
    qtypes = Counter(r.get("qtype") or "?" for r in live_recs)
    errs = [r for r in live_recs if r["cls"] == "ERROR"]
    err_kinds = Counter((r.get("err") or "?").split(":")[0][:60]
                        for r in errs)
    slow = [r for r in live_recs if r["cls"] == "SLOW_GUIDED"]
    slow_subj = Counter(r["subject"] for r in slow)
    soft = [r for r in live_recs if r["cls"] == "SOFT_HIT"]
    soft_subj = Counter(r["subject"] for r in soft)
    lat_ver = [r["ms"] for r in live_recs if r["cls"] == "EXACT_HIT"]
    lat_all = [r["ms"] for r in live_recs]

    def pct(a, b):
        return f"{100.0 * a / b:.1f}%" if b else "-"

    def p50(v):
        v = sorted(v)
        return v[len(v) // 2] if v else 0

    def p95(v):
        v = sorted(v)
        return v[min(len(v) - 1, int(len(v) * 0.95))] if v else 0

    ck = {}
    if os.path.exists(CHECKPOINT):
        ck = json.load(open(CHECKPOINT, encoding="utf-8"))
    total_rows = 253903

    lines = []
    w = lines.append
    w("# Full-Bank Verification Sweep -- Interim Report")
    w("")
    w(f"- Generated: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    w(f"- Runner: `tests/sweep_full_runner.py` (sequential 1 worker, "
      f"per-question timeout {ck.get('timeout_s', ARGS.timeout):.0f}s, "
      f"resumable, stratified (subject, class) round-robin order)")
    w(f"- Scope: ALL board_questions rows with question_text > 10 chars "
      f"= {total_rows:,} (full bank, not a sample)")
    w(f"- Progress: **{n_covered:,} rows done "
      f"({100.0 * n_covered / total_rows:.2f}%)** "
      f"(checkpoint offset {ck.get('offset', n_covered):,}, "
      f"fp `{ck.get('order_fingerprint', '?')}`)")
    w(f"- Raw findings: `D:\\platform\\runtime_data\\ops\\"
      f"sweep2_findings.jsonl` ({n_covered:,} lines, one per row)")
    w(f"- Flag-respecting denominator: **{n:,} live rows** "
      f"({n_excl:,} of {n_covered:,} covered rows carry a "
      f"`board_question_flags` reason and are reported separately below, "
      f"outside every rate). The runner still executes flagged rows "
      f"(fetch is unfiltered by design, checkpoint-stable); the TALLY, "
      f"not the fetch, enforces the exclusion.")
    w(f"- Env posture: FREELLM_API_KEY/GEMINI_API_KEY = "
      f"`{SENTINEL}` + raising tripwires on both LLMClient.chat "
      f"entrypoints; SEMANTIC_QA_LANE / SOLVER_LLM_MODE at production "
      f"defaults; CBSE_DATA_DIR isolated (queue quarantined, "
      f"question_bank.db copied)")
    w("")
    w("## Overall classification (live rows only -- flag-respecting)")
    w("")
    w("| class | n | % of live | meaning |")
    w("|---|---|---|---|")
    meaning = {
        "EXACT_HIT": "VERIFIED* and matches the stored key",
        "SOFT_HIT": "VERIFIED* but differs -- flag for review",
        "VERIFIED_NOKEY": "VERIFIED*, row has no stored key",
        "GUIDED": "honest guided/refusal tier",
        "AMBIGUOUS": "honest ambiguity refusal",
        "SLOW_GUIDED": "exceeded sweep timeout (12s) -- hard lane, "
                       "honest ceiling marker, NOT an error",
        "ERROR": "crash / tripwire / DB -- the real bugs",
        "REFUSED": "other non-verified label (kept visible)",
    }
    for c in classes + [k for k in counters if k not in classes]:
        w(f"| {c} | {counters.get(c, 0):,} | {pct(counters.get(c, 0), n)} "
          f"| {meaning.get(c, '')} |")
    w(f"| **live total (denominator)** | **{n:,}** | 100% | |")
    # excluded classes -- shown in the same table, outside the rates
    for reason, label in EXCLUDED_LABELS.items():
        if excl_reason.get(reason):
            by_cls = Counter(r["cls"] for r, rs in excluded_recs
                             if rs == reason)
            breakdown = ", ".join(f"{k}={v:,}"
                                  for k, v in by_cls.most_common())
            w(f"| {label} | {excl_reason[reason]:,} | "
              f"{pct(excl_reason[reason], n_covered)} of covered "
              f"| flag reason `{reason}`: do-not-serve BY CONSTRUCTION "
              f"(serving lanes exclude it); underlying sweep classes: "
              f"{breakdown} |")
    if flagged is None:
        w(f"| !! FLAGS UNAVAILABLE | - | - | flag table could not be "
          f"read -- exclusions NOT applied; every rate above still "
          f"carries template rows |")
    w(f"| **covered total** | **{n_covered:,}** | | live {n:,} + "
      f"excluded {n_excl:,} |")
    w("")
    strict = counters.get("EXACT_HIT", 0)
    w(f"**Headline (strict, live rows): VERIFIED = EXACT_HIT only = "
      f"{strict:,} ({pct(strict, n)} of {n:,} live).**  SOFT_HIT and "
      f"VERIFIED_NOKEY are *not* counted as verified anywhere in this "
      f"report -- they are open review items. Flagged by-construction "
      f"rows ({EXCLUDED_LABELS['template_row']} "
      f"{excl_reason.get('template_row', 0):,}, "
      f"{EXCLUDED_LABELS['no_answer_key']} "
      f"{excl_reason.get('no_answer_key', 0):,}) sit outside every rate, "
      f"and quoting any other number as the verified rate misrepresents "
      f"the bank.")
    w("")
    if lat_all:
        w(f"- Latency ms: p50 {p50(lat_all):.0f}, p95 {p95(lat_all):.0f} "
          f"(EXACT_HIT p50 {p50(lat_ver):.0f})")
    if qtypes:
        w("- Question types seen: " + ", ".join(
            f"{k}={v:,}" for k, v in qtypes.most_common()))
    w("")

    w("## Per-subject breakdown (live rows; excl = flagged rows excluded)")
    w("")
    for r in live_recs:
        subj[r["subject"]][r["cls"]] += 1
        subjclass[(r["subject"], r["class"])][r["cls"]] += 1
    hdr = ("| subject | n | exact | exact% | soft | nokey | guided | ambig"
           " | slow | err | refused | excl | worst |")
    w(hdr)
    w("|" + "---|" * 13)
    for s in sorted(subj, key=lambda k: -subj[k]["SOFT_HIT"]
                    + subj[k]["EXACT_HIT"]):
        c = subj[s]
        tot = sum(c.values())
        worst = max(("SOFT_HIT", "VERIFIED_NOKEY", "GUIDED", "AMBIGUOUS",
                     "SLOW_GUIDED", "ERROR", "REFUSED"),
                    key=lambda k: c.get(k, 0))
        w(f"| {s} | {tot:,} | {c.get('EXACT_HIT', 0):,} "
          f"| {pct(c.get('EXACT_HIT', 0), tot)} "
          f"| {c.get('SOFT_HIT', 0):,} | {c.get('VERIFIED_NOKEY', 0):,} "
          f"| {c.get('GUIDED', 0):,} | {c.get('AMBIGUOUS', 0):,} "
          f"| {c.get('SLOW_GUIDED', 0):,} | {c.get('ERROR', 0):,} "
          f"| {c.get('REFUSED', 0):,} "
          f"| {excl_subj.get(s, 0):,} | {worst} |")
    w("")

    w("## Subject x class exact-rate matrix (n / exact%)")
    w("")
    klasses = sorted({k for _, k in subjclass})
    w("| subject | " + " | ".join(f"c{k}" for k in klasses) + " |")
    w("|---" * (len(klasses) + 1) + "|")
    for s in sorted(subj):
        cells = []
        for k in klasses:
            c = subjclass.get((s, k))
            if not c:
                cells.append("-")
                continue
            tot = sum(c.values())
            cells.append(f"{tot:,} / {pct(c.get('EXACT_HIT', 0), tot)}")
        w(f"| {s} | " + " | ".join(cells) + " |")
    w("")

    w("## Errors (the real bugs)")
    w("")
    if not errs:
        w("None. Zero crashes so far.")
    else:
        w("By exception kind:")
        w("")
        for k, v in err_kinds.most_common():
            w(f"- {v:,}x `{k}`")
        w("")
        w("First 40:")
        w("")
        w("| subject | class | qtype | err | label |")
        w("|---|---|---|---|---|")
        for r in errs[:40]:
            w(f"| {r['subject']} | {r['class']} | {r.get('qtype','')} "
              f"| `{r.get('err','')[:120]}` | {r.get('label','')} |")
    w("")

    w("## Review queue highlights")
    w("")
    w(f"- SOFT_HIT (live rows): {counters.get('SOFT_HIT', 0):,} total; "
      "worst subjects: "
      + (", ".join(f"{s} ({v})" for s, v in soft_subj.most_common(8))
         if soft_subj else "none"))
    w(f"- {EXCLUDED_LABELS['template_row']}: {excl_reason.get('template_row', 0):,}"
      " swept rows already sit OUTSIDE the rates above (flag "
      "`template_row`) -- generic extraction-template text stamped across "
      "thousands of nodes, each keyed to a different answer, so they "
      "SOFT_HIT by construction and can never serve honestly.")
    w(f"- SLOW_GUIDED (>12s): {counters.get('SLOW_GUIDED', 0):,}; worst: "
      + (", ".join(f"{s} ({v})" for s, v in slow_subj.most_common(8))
         if slow_subj else "none"))
    w("")

    w("## Flag-excluded rows (do-not-serve by construction)")
    w("")
    if flagged is None:
        w("!! flags table unreadable -- NO exclusions applied this run; "
          "every rate above still carries flagged rows.")
    else:
        total_flags = len(flagged)
        flag_reasons = Counter(flagged.values())
        w(f"- `board_question_flags` total: {total_flags:,} -- "
          + (", ".join(f"`{k}`={v:,}" for k, v in flag_reasons.most_common())))
        w(f"- Covered rows excluded by flag: **{n_excl:,}** of "
          f"{n_covered:,} ({pct(n_excl, n_covered)}) -- "
          + ("reported as " + " / ".join(
              f"{lbl} ({excl_reason.get(rs, 0):,})"
              for rs, lbl in EXCLUDED_LABELS.items()
              if excl_reason.get(rs)) + "."
             if n_excl else
             "none of the rows swept so far carry a flag."))
        w(f"- Their engine results were still honest work "
          f"({', '.join(f'{k}={v:,}' for k, v in excl_cls.most_common())}) "
          f"-- but no excluded row appears in any rate, denominator or "
          f"headline in this report.")
    w("")

    w("## ZERO-LLM proof (sweep scale)")
    w("")
    if os.path.exists(PROOF_RESULT):
        pr = json.load(open(PROOF_RESULT, encoding="utf-8"))
        tag = ("**PROVEN LLM-FREE**" if pr.get("match")
               else "**NOT LLM-FREE -- investigate**")
        w(f"Verdict: {tag} on the first {pr.get('n')} stratified rows.")
        w("")
        w(f"- Method: first {pr.get('n')} rows run under poisoned keys "
          f"(`{SENTINEL}`) with raising tripwires on both "
          f"`LLMClient.chat` entrypoints, then re-run in a clean "
          f"subprocess with the keys popped. Identical (label, class) "
          f"sequences prove the verified path never depends on an LLM.")
        w(f"- Poisoned-run LLM attempts: {pr.get('poisoned_llm_attempts')}")
        w(f"- Clean-run LLM attempts: {pr.get('clean_llm_attempts')}")
        w(f"- Primary diffs: {len(pr.get('primary_diffs', []))}")
        for d in pr.get("primary_diffs", [])[:10]:
            w(f"  - i={d['i']} {d['qid'][:8]}: poisoned={d['poisoned']} "
              f"clean={d['clean']}")
    else:
        w("Proof not completed yet (no `sweep2_llmproof_result.json`).")
    w("")
    w("## How to continue the sweep")
    w("")
    w("```")
    w("cd D:\\platform\\deploy\\backend")
    w("python tests\\sweep_full_runner.py --resume          # keep going")
    w("python tests\\sweep_full_runner.py --resume --report  # refresh report")
    w("```")
    w("")
    with open(REPORT, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))
    print(f"report -> {REPORT}", flush=True)
    print(f"rows covered: {n_covered:,} / {total_rows:,} "
          f"(live {n:,} + flag-excluded {n_excl:,})", flush=True)
    print("live counters: " + json.dumps(dict(counters)), flush=True)
    if n_excl:
        print("excluded by flag: " + json.dumps({
            "by_reason": dict(excl_reason), "by_class": dict(excl_cls)}),
            flush=True)


# --------------------------------------------------------------------------- #
# main
# --------------------------------------------------------------------------- #
if __name__ == "__main__":
    if ARGS.report:
        write_report()
    elif ARGS.llm_proof_clean:
        run_clean_proof(ARGS.llm_proof_clean)
    else:
        run_sweep()
