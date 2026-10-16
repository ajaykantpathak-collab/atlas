"""recompute_lomo_harness.py -- LOMO recompute-accuracy baseline (BUILD_ORDER Phase 3.4).

SCIENTIST's variable-masked recompute design, measured: within a cluster of
same-template bank questions (identical normalized skeleton -- same words,
same typed slots, different values), the solver family is identified on ONE
train member via the production registry sweep (modeling_layer + red-team
guards + release calibration; autobind lane as the honest fallback), then
every OTHER member is a held-out recompute trial: the family's deterministic
extractor binds the member's own slot values (the member IS the template with
its slots filled) and the family's closed form recomputes the answer.
Ground truth = the member's stored correct_answer.  Match = numeric-
equivalent within 2% (max(0.01, 2% of the larger magnitude)), the same
contract as sweep_full_runner.classify.

MEASURED BANK REALITY (2026-09-20 nightly snapshot): the bank is authored
one-question-per-node -- exact-skeleton numeric clusters are essentially
absent (a 1112-row math sample: 895 unique skeletons, 815 singletons; the
only big repeats are prose pedagogy stubs).  The harness therefore runs
THREE fixture tiers, all reported:
  TIER A  exact normalize_skeleton equality (the prescribed design)
  TIER B  relaxed content-word template key (stopwords dropped, light
          stemming, slot-type tokens kept, order-insensitive; conservative
          -- recompute runs on each member's own text, so a permuted twin
          fails visibly instead of inflating precision)
  TIER C  singleton clusters: every remaining numeric-key row is its own
          held-out fixture (family from the production dispatch, recompute
          on the row's own text, compared to the stored key).  No per-row
          fitting exists to overfit, so each trial is out-of-sample; what
          is lost vs the cluster design is only the template-consistency
          signal, which the bank cannot provide.

The >=98% PRECISION bar gates the C8 variable-masked recompute lane:
    precision = matches / shipped   (a shipped recompute is one that
                                     produced a finite numeric via the
                                     identified family)
    coverage  = shipped / held-out eligible members (guard refusals, family
                non-matches, structure drift and no-numeric results are NOT
                shipped -- they cost coverage, never precision: the lane
                would honestly refuse them).

Bank source (priority order):
  1. live Postgres 127.0.0.1:5432/dream_app (2s connect timeout)
  2. stream-extracted snapshot from the nightly plain-SQL dump
     (D:\\platform\\backups\\dream_app_20260920_0330.sql.zip) cached at
     tests/recompute_lomo_baseline_bank.jsonl (+ .index.jsonl byte-offset
     index).  The production stack was DOWN while this harness ran
     (watchdog: 99 consecutive down checks, docker VM stopped) and this
     agent is barred from Docker commands, so the snapshot is the honest
     reachable source; its date is stamped into the report.

Resumable: checkpoints every 10k scanned rows (and at every group boundary)
to tests/_lomo_ckpt.json -- aggregates + done-group list + plan fingerprint,
the same pattern as sweep_full_runner.py.

Memory-bounded: question rows are materialised one (subject, class) group at
a time (~1k rows, far below the 50k ceiling); clusters are scored and
released per group; a psutil RSS kill-switch checkpoints and stops honestly
above ~1.9GB.  All family calls run in ONE reusable worker process with a
hard 8s timeout (a live-bank row hangs the registry sweep for 28+ min in
sympify -- see the report), and the worker runs with the traveler family's
semantic matcher stubbed to its lexical fallback so torch/MiniLM never
loads (parent+worker stay under ~0.8GB).  The plan pass holds only id/offset
metadata, never question texts.  Zero LLM calls: only deterministic product
paths (normalize_skeleton, modeling_layer registry sweep, binding_executor
try_auto_bind).  Zero Docker.

Usage:
  python tests/recompute_lomo_harness.py                 # full run
  python tests/recompute_lomo_harness.py --resume        # resume checkpoint
  python tests/recompute_lomo_harness.py --max-rows 5000 # bounded smoke run
  python tests/recompute_lomo_harness.py --report        # rebuild reports
  python tests/recompute_lomo_harness.py --build-cache   # dump -> jsonl only
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import math
import os
import re
import sys
import time
import zipfile
from collections import Counter, defaultdict

# --------------------------------------------------------------------------- #
# 0. Paths + CLI -- before any backend import.
# --------------------------------------------------------------------------- #
sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

HERE = os.path.dirname(os.path.abspath(__file__))
DUMP_ZIP = r"D:\platform\backups\dream_app_20260920_0330.sql.zip"
DUMP_MEMBER = "dream_app_20260920_0330.sql"
BANK_CACHE = os.path.join(HERE, "recompute_lomo_baseline_bank.jsonl")
BANK_INDEX = BANK_CACHE + ".index.jsonl"
BANK_META = BANK_CACHE + ".meta.json"
CKPT = os.path.join(HERE, "_lomo_ckpt.json")
OUT_JSON = os.path.join(HERE, "recompute_lomo_baseline.json")
OUT_MD = os.path.join(HERE, "recompute_lomo_baseline.md")

SCAN_BUDGET = 120000        # rows scanned cap (brief)
BAR = 0.98                  # the C8 precision gate
MIN_SHIPPED = 30            # shipped trials before a family gets a verdict
RSS_LIMIT_MB = 1900         # kill-switch (~2GB budget; MiniLM steady ~1.3GB)
CKPT_EVERY = 10000          # rows between checkpoints

_ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
_ap.add_argument("--resume", action="store_true",
                 help="resume from tests/_lomo_ckpt.json")
_ap.add_argument("--max-rows", type=int, default=0,
                 help="stop after N rows this session (0 = full budget)")
_ap.add_argument("--report", action="store_true",
                 help="rebuild json+md from the checkpoint and exit")
_ap.add_argument("--build-cache", action="store_true",
                 help="extract the bank cache from the nightly dump and exit")
_ap.add_argument("--source", choices=("auto", "db", "dump"), default="auto",
                 help="bank source: auto = live DB then dump snapshot")
_ap.add_argument("--group", action="append", default=[],
                 help="restrict to (subject,class) like --group math|10 "
                      "(repeatable; debug aid)")
_ap.add_argument("--take", type=int, default=0,
                 help="override the per-group take (rows per (subject,"
                      "class) group; 0 = SCAN_BUDGET-derived)")
ARGS = _ap.parse_args()

# --------------------------------------------------------------------------- #
# 1. Environment posture (offline, deterministic, low-RAM) -- BEFORE backend
#    imports.  No LLM keys are needed: this harness only touches the
#    deterministic product paths (skeletons, registry families, autobind).
# --------------------------------------------------------------------------- #
os.environ.setdefault("PLATFORM_ENV", "development")
os.environ.setdefault("HF_HUB_OFFLINE", "1")
os.environ.setdefault("TRANSFORMERS_OFFLINE", "1")
os.environ.setdefault("HF_HOME", r"C:\Users\Alesha4285\.cache\huggingface")
os.environ.setdefault("TORCH_NUM_THREADS", "1")
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

try:
    import psutil
    _PROC = psutil.Process()
except Exception:
    _PROC = None


def rss_mb() -> float:
    if _PROC is None:
        return -1.0
    try:
        return _PROC.memory_info().rss / (1024.0 * 1024.0)
    except Exception:
        return -1.0


# --------------------------------------------------------------------------- #
# 2. Bank source
# --------------------------------------------------------------------------- #

def try_live_db():
    """2s-timeout probe of the production bank; None when unreachable."""
    try:
        import psycopg2
        pw = [l.strip().split("=", 1)[1]
              for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
              if l.startswith("POSTGRES_PASSWORD=")][0]
        conn = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                                user="dream_user", password=pw,
                                connect_timeout=2)
        return conn
    except Exception as exc:
        print(f"[bank] live DB unreachable ({type(exc).__name__}: {exc})",
              flush=True)
        return None


_COPY_HDR = "COPY public.board_questions ("


def _copy_unescape(s: str) -> str:
    """Postgres COPY text format: the special backslash escapes only."""
    if s == r"\N":
        return ""
    if "\\" not in s:
        return s
    out = []
    i = 0
    n = len(s)
    esc = {"n": "\n", "r": "\r", "t": "\t", "b": "\b", "f": "\f", "v": "\v"}
    while i < n:
        c = s[i]
        if c == "\\" and i + 1 < n:
            nx = s[i + 1]
            if nx in esc:
                out.append(esc[nx])
                i += 2
                continue
            if nx == "\\":
                out.append("\\")
                i += 2
                continue
        out.append(c)
        i += 1
    return "".join(out)


def build_bank_cache() -> dict:
    """Stream-extract board_questions from the nightly plain-SQL dump.

    One physical line per COPY row (COPY escapes embedded newlines).  Writes
    BANK_CACHE (binary JSONL) plus BANK_INDEX (id, subject, class, byte
    offset per row) so the harness can seek to any row without scanning.
    """
    meta = {"source": DUMP_ZIP, "member": DUMP_MEMBER,
            "built_ts": time.strftime("%Y-%m-%d %H:%M:%S")}
    t0 = time.time()
    tmp = BANK_CACHE + ".tmp"
    idx_tmp = BANK_INDEX + ".tmp"
    z = zipfile.ZipFile(DUMP_ZIP)
    f = io.TextIOWrapper(z.open(DUMP_MEMBER), encoding="utf-8",
                         errors="replace")
    n_written = 0
    with open(tmp, "wb") as out, open(idx_tmp, "w", encoding="utf-8") as idx:
        collecting = False
        for line in f:
            if not collecting:
                if line.startswith(_COPY_HDR):
                    collecting = True
                continue
            if line.startswith("\\."):
                collecting = False
                continue
            parts = line.rstrip("\n").rstrip("\r").split("\t")
            if len(parts) < 21:
                continue
            # columns: 0 id, 3 subject, 4 class_level, 7 question_type,
            #          8 question_text, 10 correct_answer, 18 board
            q = _copy_unescape(parts[8])
            a = _copy_unescape(parts[10])
            if len(q) <= 10 or not a:
                continue
            rid = _copy_unescape(parts[0])
            subject = _copy_unescape(parts[3])
            try:
                klass = int(_copy_unescape(parts[4]))
            except ValueError:
                klass = 0
            rec = {"id": rid, "subject": subject, "class": klass,
                   "qtype": _copy_unescape(parts[7]),
                   "board": _copy_unescape(parts[18]), "q": q, "a": a}
            off = out.tell()
            b = (json.dumps(rec, ensure_ascii=False,
                            separators=(",", ":")) + "\n").encode("utf-8")
            out.write(b)
            idx.write(json.dumps({"id": rid, "subject": subject,
                                  "class": klass, "off": off}) + "\n")
            n_written += 1
            if n_written % 50000 == 0:
                print(f"  [cache] {n_written} rows "
                      f"({time.time() - t0:.0f}s)", flush=True)
    os.replace(tmp, BANK_CACHE)
    os.replace(idx_tmp, BANK_INDEX)
    meta["rows"] = n_written
    meta["seconds"] = round(time.time() - t0, 1)
    with open(BANK_META, "w", encoding="utf-8") as fh:
        json.dump(meta, fh, indent=1)
    print(f"[cache] wrote {n_written} rows -> {BANK_CACHE} "
          f"({meta['seconds']}s)", flush=True)
    return meta


class BankSource:
    """Serves the bank per (subject, class) group; question rows are
    materialised one group at a time."""

    def __init__(self):
        self.mode = None
        self.conn = None
        self.cache_meta = {}
        if ARGS.source in ("auto", "db"):
            self.conn = try_live_db()
            if self.conn is not None:
                self.mode = "db"
                print("[bank] using LIVE Postgres 127.0.0.1:5432/dream_app",
                      flush=True)
        if self.mode is None:
            if ARGS.source == "db":
                raise SystemExit("[bank] --source db: live DB unreachable")
            if not os.path.exists(BANK_CACHE) or \
                    not os.path.exists(BANK_INDEX):
                print("[bank] building cache from the nightly dump "
                      "(one-time, a few minutes)...", flush=True)
                self.cache_meta = build_bank_cache()
            else:
                self.cache_meta = (json.load(open(BANK_META,
                                                  encoding="utf-8"))
                                   if os.path.exists(BANK_META) else
                                   {"source": DUMP_ZIP, "rows": "?"})
            self.mode = "dump"
            print(f"[bank] using dump snapshot: {self.cache_meta}",
                  flush=True)

    def db_group_sizes(self):
        """Pass 1: (subject, class) -> row count (SQL aggregate)."""
        sizes = Counter()
        sql = ("SELECT subject, class_level, count(*) FROM board_questions "
               "WHERE question_text IS NOT NULL AND length(question_text)>10 "
               "AND correct_answer IS NOT NULL AND correct_answer <> '' "
               "GROUP BY 1,2")
        with self.conn.cursor() as cur:
            cur.execute(sql)
            for s, c, n in cur.fetchall():
                sizes[(s or "", int(c))] += n
        return sizes

    def db_group_rows(self, subject: str, klass: int, take: int):
        sql = ("SELECT id, question_text, correct_answer, question_type, "
               "board FROM board_questions "
               "WHERE subject=%(s)s AND class_level=%(c)s AND question_text "
               "IS NOT NULL AND length(question_text)>10 AND correct_answer "
               "IS NOT NULL AND correct_answer <> '' "
               "ORDER BY id LIMIT %(lim)s")
        out = []
        with self.conn.cursor() as cur:
            cur.execute(sql, {"s": subject, "c": klass, "lim": take})
            for rid, q, a, qtype, board in cur.fetchall():
                out.append({"id": str(rid), "q": q, "a": a or "",
                            "subject": subject, "class": klass,
                            "qtype": qtype or "", "board": board or ""})
        return out

    def dump_group_rows(self, entries):
        """Materialise rows for pre-selected (id, byte-offset) entries."""
        out = []
        fh = open(BANK_CACHE, "rb")
        try:
            for _rid, off in entries:
                fh.seek(off)
                out.append(json.loads(fh.readline().decode("utf-8")))
        finally:
            fh.close()
        return out

    def close(self):
        if self.conn is not None:
            try:
                self.conn.close()
            except Exception:
                pass


# --------------------------------------------------------------------------- #
# 3. Key parsing + numeric equivalence (sweep classify contract)
# --------------------------------------------------------------------------- #
_NUM_RX = re.compile(r"-?\d[\d,]*(?:\.\d+)?")
_FRAC_RX = re.compile(r"(-?\d[\d,]*(?:\.\d+)?)\s*/\s*(\d[\d,]*(?:\.\d+)?)")
_RATIO_RX = re.compile(r"^\s*-?\d+(?:\.\d+)?\s*:\s*-?\d+(?:\.\d+)?\s*$")


def parse_key(ans: str):
    """Stored correct_answer -> float, or None when not numerically
    parseable (MCQ letters, ratio-shaped keys, symbolic answers -- excluded
    honestly, never guessed)."""
    s = (ans or "").strip().lower()
    if not s or len(s) > 120:
        return None
    if _RATIO_RX.match(s):
        return None
    m = _FRAC_RX.search(s)
    if m:
        try:
            num = float(m.group(1).replace(",", ""))
            den = float(m.group(2).replace(",", ""))
            if den != 0:
                return num / den
        except (ValueError, ZeroDivisionError):
            return None
    m = _NUM_RX.search(s)
    if not m:
        return None
    try:
        return float(m.group(0).replace(",", ""))
    except ValueError:
        return None


def num_equiv(a: float, s: float) -> bool:
    return abs(a - s) <= max(0.01, 0.02 * max(abs(a), abs(s)))


_FIRST_NUM_RX = re.compile(r"-?\d+(?:\.\d+)?(?:e[+-]?\d+)?", re.I)


def first_number(text: str):
    m = _FIRST_NUM_RX.search((text or "").replace(",", ""))
    if not m:
        return None
    try:
        return float(m.group(0))
    except ValueError:
        return None


# --------------------------------------------------------------------------- #
# 4. Family identification + member recompute (production parity)
# --------------------------------------------------------------------------- #
import logging as _logging
_logging.disable(_logging.CRITICAL)

from backend.its.solver.semantic_qa import normalize_skeleton
from backend.its.solver.answer_pipeline import AuditTrail
from backend.its.solver.binding_executor import try_auto_bind
from backend.its.solver import modeling_layer as ML

try:    # the flywheel release gate -- production model_problem applies it
    from backend.services.release_calibration import withhold_if_gated
except Exception:
    withhold_if_gated = None

_FN_BY_NAME = {fn.__name__: fn for fn in ML._STRUCTURES}

# --------------------------------------------------------------------------- #
# Bounded worker process: family calls are time-bounded because the live
# bank contains at least one row that hangs the registry sweep for 28+
# minutes (competency_engine -> catalog_executor._sympy_rearrange ->
# sympify).  A thread watchdog cannot interrupt Python-level loops, so the
# calls run in a single reusable worker process; on timeout the worker is
# terminated and replaced (the event is counted, never hidden).  The worker
# also runs with the traveler family's semantic matcher stubbed to its
# lexical fallback so torch/MiniLM never loads (parent+worker stay under
# ~0.8GB); that family's lexical gate is unchanged and the bank has no
# traveler-on-growing-domain rows.
# --------------------------------------------------------------------------- #
IDENTIFY_TIMEOUT_S = 8.0
RECOMPUTE_TIMEOUT_S = 8.0
WARMUP_TIMEOUT_S = 90.0


def _worker_init():
    """Child-process setup: quiet logs, lexical-only semantic matcher."""
    import logging
    logging.disable(logging.CRITICAL)
    try:
        import backend.its.solver.semantic_matcher as _sm

        class _LexicalOnly:
            def match(self, text):
                return {}

        _sm.get_matcher = lambda: _LexicalOnly()
    except Exception:
        pass


def worker_ping():
    return True


_POOL = None
_POOL_BAD = False


def worker_call(fn_name: str, args: tuple, timeout_s: float):
    """Run fn(*args) in the worker with a hard timeout.  Returns the
    result, or None-with-counted-event on timeout/worker death."""
    global _POOL, _POOL_BAD
    if _POOL_BAD:
        return None
    from multiprocessing.pool import TimeoutError as _PoolTimeoutError
    import multiprocessing as mp
    if _POOL is None:
        try:
            ctx = mp.get_context("spawn")
            _POOL = ctx.Pool(1, initializer=_worker_init)
        except Exception as exc:
            print(f"[worker] pool init failed: {exc}", flush=True)
            _POOL_BAD = True
            return None
    try:
        async_res = _POOL.apply_async(getattr(sys.modules[__name__],
                                              fn_name), args)
        return async_res.get(timeout=timeout_s)
    except (_PoolTimeoutError, TimeoutError):
        G["worker_timeouts"] += 1
        _POOL.terminate()
        _POOL = None
        return None
    except Exception:
        G["worker_errors"] += 1
        _POOL.terminate()
        _POOL = None
        return None


def recompute_registry(fn, structure: str, text: str):
    """Parent-side wrapper: held-out recompute via the train family, in the
    bounded worker.  Status ok|family_no_match|guard_refusal|
    structure_drift|release_withheld|no_numeric|member_error|
    worker_timeout"""
    out = worker_call("worker_recompute_registry",
                      (fn.__name__, structure, text), RECOMPUTE_TIMEOUT_S)
    if out is None:
        return "worker_timeout", None, 0.0
    return out


def recompute_autobind(gate: str, text: str):
    out = worker_call("worker_recompute_autobind", (gate, text),
                      RECOMPUTE_TIMEOUT_S)
    if out is None:
        return "worker_timeout", None, 0.0
    return out


def _release_gate(r):
    if withhold_if_gated is None:
        return r
    try:
        return withhold_if_gated(r)
    except Exception:
        return r


def _registry_allows(text: str, best) -> bool:
    """The two registry-level refusals _model_problem_uncached applies after
    the guards (matrix brackets, symbolic asks)."""
    upper = best.structure.upper()
    if ML._MATRIX_BRACKETS.search(text) and "MATRIX" not in upper \
            and "DETERMINANT" not in upper:
        return False
    if upper in ML._ARITHMETIC_FAMILIES and \
            ML._SYMBOLIC_ASK_RE.search(text):
        return False
    return True


def identify_family(text: str):
    """Production model_problem decision, keeping the winning fn handle.

    Runs in the bounded WORKER PROCESS (see _POOL): a live-bank row was
    measured to hang the registry sweep for 28+ minutes inside
    competency_engine -> catalog_executor._sympy_rearrange -> sympify
    (sympy_parser.auto_symbol), so every family call is time-bounded; a
    hung identify is an honest refusal, not a guess.

    Returns ("registry", fn, structure) or ("autobind", gate) or None."""
    out = worker_call("identify", text, IDENTIFY_TIMEOUT_S)
    if out is None:
        return None
    kind = out[0]
    if kind == "registry":
        _k, structure, fn_name = out
        fn = _FN_BY_NAME.get(fn_name)
        if fn is None:
            return None
        return ("registry", fn, structure)
    return (kind,) + tuple(out[1:])


def worker_identify(text):
    """Worker-side identify: returns ('registry', structure, fn_name) |
    ('autobind', gate) | None.  Functions are returned by NAME so the
    result stays picklable."""
    if len(text) > 1600:
        # model_problem's ReDoS guard: the registry refuses long input
        # (production parity, and autobind's own cap is 2000)
        return None
    best = None
    best_fn_name = None
    for fn in ML._STRUCTURES:
        try:
            r = fn(text)
        except Exception:
            continue
        if r.matched and (best is None or r.confidence > best.confidence):
            best, best_fn_name = r, fn.__name__
    if best is not None:
        g = ML._redteam_guards(text, best)
        if g.matched and _registry_allows(text, g):
            g = _release_gate(g)
            if g.matched:
                return ("registry", g.structure, best_fn_name)
    aud = AuditTrail(lane="C")
    res = try_auto_bind(text, aud)
    if res is not None and str(res.label).startswith("VERIFIED"):
        gate = next((r.split(":", 1)[1] for r in aud.route
                     if r.startswith("autobind:")), "unknown")
        return ("autobind", gate)
    return None


def worker_recompute_registry(fn_name: str, structure: str, text: str):
    """Worker-side held-out recompute via the train family's compute path.
    Returns (status, numeric_or_None, ms)."""
    fn = _FN_BY_NAME[fn_name]
    t0 = time.perf_counter()
    try:
        r = fn(text)
    except Exception as exc:
        return f"member_error:{type(exc).__name__}", None, \
            (time.perf_counter() - t0) * 1000.0
    ms = (time.perf_counter() - t0) * 1000.0
    if not r.matched:
        return "family_no_match", None, ms
    r = ML._redteam_guards(text, r)
    if not r.matched:
        return "guard_refusal", None, ms
    if r.structure != structure:
        return "structure_drift", None, ms
    r = _release_gate(r)
    if not r.matched:
        return "release_withheld", None, ms
    num = r.numeric_answer
    if num is None and r.final_answer:
        num = first_number(r.final_answer)
    if num is None:
        return "no_numeric", None, ms
    try:
        num = float(num)
    except (TypeError, ValueError):
        return "no_numeric", None, ms
    if not math.isfinite(num):
        return "no_numeric", None, ms
    return "ok", num, ms


def worker_recompute_autobind(gate: str, text: str):
    t0 = time.perf_counter()
    try:
        aud = AuditTrail(lane="C")
        res = try_auto_bind(text, aud)
    except Exception as exc:
        return f"member_error:{type(exc).__name__}", None, \
            (time.perf_counter() - t0) * 1000.0
    ms = (time.perf_counter() - t0) * 1000.0
    if res is None:
        return "family_no_match", None, ms
    fired = next((r.split(":", 1)[1] for r in aud.route
                  if r.startswith("autobind:")), None)
    if fired != gate:
        return "gate_mismatch", None, ms
    if res.numeric is None or not math.isfinite(float(res.numeric)):
        return "no_numeric", None, ms
    return "ok", float(res.numeric), ms


# --------------------------------------------------------------------------- #
# 5. Stratified plan + clustering (three tiers, all reported)
# --------------------------------------------------------------------------- #
#
# TIER A (the SCIENTIST-literal design): exact normalize_skeleton equality.
# TIER B (documented relaxation): content-word template key -- skeleton with
#         values already masked, stopwords dropped, light stemming, tokens
#         sorted (slot-type tokens kept).  Order-insensitivity is
#         conservative here: recompute runs the family on each member's own
#         text, so a permuted twin is recomputed with its own numbers in its
#         own roles and simply fails if the family misreads it -- it can
#         cost precision, never inflate it.
# TIER C (the fixture fallback the bank forces): the 2026-09-20 bank
#         snapshot is authored one-question-per-node and has essentially no
#         same-template numeric clusters (measured; see the report).  Every
#         numeric-key row is therefore its own singleton cluster: family
#         identified by the production registry dispatch, recompute on the
#         row's own text, compared to the stored key.  This is the same
#         measurement per fixture; the cluster-consistency signal simply
#         does not exist on this bank (reported, not hidden).
#
_STOPWORDS = frozenset("""a an the is are was were be been being am do does
did done has have had having of in on at to for with by from as and or but
nor so yet if then than that this these those it its he she they them his
her their our your my me us you we i who whom whose which what when where
why how not no yes very too also just only about above below between into
onto over under again further once here there all any both each few more
most other some such own same can will would shall should may might
must""".split())
_TOK_RX = re.compile(r"<[a-z:]+>|[a-z]+")


def _stem(w: str) -> str:
    return w[:-1] if len(w) > 3 and w.endswith("s") else w


def template_key(skel: str) -> str:
    """Tier-B cluster key: masked-skeleton content tokens, sorted."""
    toks = []
    for t in _TOK_RX.findall(skel):
        if t.startswith("<"):
            toks.append(t)          # slot-type tokens stay in the key
        elif t not in _STOPWORDS:
            toks.append(_stem(t))
    return " ".join(sorted(toks))


def cluster_group(rows):
    """Tier-A and Tier-B clusters with >=3 members and >=2 key-parseable
    members.  Returns (exact_clusters, tmpl_clusters)."""
    exact = defaultdict(list)
    tmpl = defaultdict(list)
    for row in rows:
        try:
            skel, _slots = normalize_skeleton(row["q"])
        except Exception:
            continue
        exact[skel].append(row)
        tmpl[template_key(skel)].append(row)

    def qualifying(clusters):
        out = []
        for _key, members in clusters.items():
            if len(members) < 3:
                continue
            eligible = [m for m in members
                        if parse_key(m["a"]) is not None]
            if len(eligible) < 2:
                continue
            out.append((members, eligible))
        return out

    return qualifying(exact), qualifying(tmpl)


def build_plan(src):
    """Per-(subject,class) deterministic take, stratified like
    sweep_full_runner: equal per-group take, id-ordered rows.

    dump mode: one index pass collects counts AND (id, byte-offset) entries
    per group (id/offset metadata only, no question texts -- ~25MB).
    db mode: counts via SQL aggregate; rows fetched per group by LIMIT."""
    take = None
    buckets = defaultdict(list)
    if src.mode == "dump":
        with open(BANK_INDEX, encoding="utf-8") as fh:
            for line in fh:
                r = json.loads(line)
                buckets[(r["subject"], int(r["class"]))].append(
                    (r["id"], r["off"]))
        sizes = Counter({k: len(v) for k, v in buckets.items()})
    else:
        sizes = src.db_group_sizes()
    n_groups = len(sizes)
    take = ARGS.take if ARGS.take > 0 else \
        max(1, math.ceil(SCAN_BUDGET / max(1, n_groups)))
    filters = set()
    for g in ARGS.group:
        s, _, c = g.partition("|")
        filters.add((s, int(c) if c else None))
    plan = []
    for (subject, klass), size in sorted(sizes.items()):
        if filters and not any(subject == fs and (fc is None or
                                                  klass == fc)
                               for fs, fc in filters):
            continue
        item = {"subject": subject, "class": klass, "take": take,
                "size": size}
        if src.mode == "dump":
            item["entries"] = sorted(buckets[(subject, klass)])[:take]
        plan.append(item)
    scanned = sum(min(p["size"], p["take"]) for p in plan)
    h = hashlib.sha256()
    h.update(json.dumps([[p["subject"], p["class"], p["take"], p["size"]]
                         for p in plan]).encode())
    print(f"[plan] {n_groups} (subject,class) groups, "
          f"{sum(sizes.values()):,} answerable rows, scan cap -> "
          f"{scanned:,} rows (take {take}/group) fp={h.hexdigest()[:12]}",
          flush=True)
    return plan, h.hexdigest()[:16]


# --------------------------------------------------------------------------- #
# 6. The LOMO loop
# --------------------------------------------------------------------------- #
G = {   # global counters (the honest accounting around the families)
    "rows_scanned": 0,
    "clusters_formed": 0,
    "clusters_eligible": 0,
    "clusters_low_eligible": 0,
    "cluster_unmatched": 0,
    "trials_exact": 0,
    "trials_template": 0,
    "trials_singleton": 0,
    "singleton_unmatched": 0,
    "heldout_trials": 0,
    "shipped": 0,
    "matches": 0,
    "multipart_keys": 0,
    "mismatches_multipart": 0,
    "worker_timeouts": 0,
    "worker_errors": 0,
}
FAM = {}          # family key -> stats dict


def fam_stats(key: str, kind: str, detail: str = ""):
    st = FAM.get(key)
    if st is None:
        st = FAM[key] = {
            "family": key, "kind": kind, "detail": detail,
            "clusters": 0, "members": 0, "shipped": 0, "matches": 0,
            "ms": [], "modes": Counter(),
            "sources": Counter(), "samples": [],
        }
    return st


def _score_member(st, member, ident, source):
    """One held-out recompute trial against the stored key."""
    G["heldout_trials"] += 1
    G[f"trials_{source}"] += 1
    st["members"] += 1
    st["sources"][source] += 1
    expected = parse_key(member["a"])
    if expected is None:
        st["modes"]["key_unparseable"] += 1
        return
    # multi-part keys ("X = 5; Y = 3") can never match a single numeric
    # recompute -- counted, so the caveat is quantified in the report
    multipart = len(_NUM_RX.findall(member["a"])) > 1 or \
        ";" in member["a"]
    if multipart:
        G["multipart_keys"] += 1
    if ident[0] == "registry":
        status, num, ms = recompute_registry(ident[1], ident[2],
                                             member["q"])
    else:
        status, num, ms = recompute_autobind(ident[1], member["q"])
    st["ms"].append(round(ms, 2))
    if status == "ok":
        st["shipped"] += 1
        G["shipped"] += 1
        if num_equiv(num, expected):
            st["matches"] += 1
            G["matches"] += 1
        else:
            st["modes"]["mismatch"] += 1
            if multipart:
                st["modes"]["mismatch_multipart_key"] += 1
                G["mismatches_multipart"] += 1
            if len(st["samples"]) < 3:
                st["samples"].append({
                    "qid": member["id"], "q": member["q"][:170],
                    "expected": member["a"][:60],
                    "got": f"{num:.6g}",
                })
    else:
        base = status.split(":")[0]
        st["modes"][base] += 1
        if base == "member_error" and len(st["samples"]) < 3:
            st["samples"].append({
                "qid": member["id"], "q": member["q"][:170],
                "expected": member["a"][:60], "got": status,
            })


def _identify_and_key(train_q):
    """Family identification on the train member + the stats-dict key."""
    ident = identify_family(train_q)
    if ident is None:
        return None, None
    if ident[0] == "registry":
        _kind, fn, structure = ident
        return ident, (f"{structure}#{fn.__name__}", "registry",
                       fn.__name__)
    _kind, gate = ident
    return ident, (f"AUTOBIND:{gate}", "autobind",
                   "binding_executor.try_auto_bind")


def run_group(item, rows):
    G["rows_scanned"] += len(rows)
    exact_cl, tmpl_cl = cluster_group(rows)
    G["clusters_formed"] += len(exact_cl)
    consumed = set()          # member ids already scored in a multi-member
                              # cluster -- never scored twice

    # ---- Tier A: exact-skeleton clusters (SCIENTIST-literal LOMO) ----
    for members, eligible in exact_cl:
        if len(eligible) < 2:
            G["clusters_low_eligible"] += 1
            continue
        G["clusters_eligible"] += 1
        ident, stkey = _identify_and_key(eligible[0]["q"])
        if ident is None:
            G["cluster_unmatched"] += 1
            consumed.update(m["id"] for m in members)
            continue
        st = fam_stats(*stkey)
        st["clusters"] += 1
        consumed.update(m["id"] for m in members)
        for member in eligible[1:]:          # train member excluded
            _score_member(st, member, ident, "exact")

    # ---- Tier B: relaxed template clusters (not already consumed) ----
    for members, eligible in tmpl_cl:
        if any(m["id"] in consumed for m in members):
            continue
        if len(eligible) < 2:
            continue
        ident, stkey = _identify_and_key(eligible[0]["q"])
        if ident is None:
            consumed.update(m["id"] for m in members)
            continue
        st = fam_stats(*stkey)
        st["clusters"] += 1
        consumed.update(m["id"] for m in members)
        for member in eligible[1:]:
            _score_member(st, member, ident, "template")

    # ---- Tier C: singleton clusters -- every remaining numeric-key row is
    #      its own held-out fixture (the bank's one-question-per-node
    #      reality; documented in the report) ----
    for row in rows:
        if row["id"] in consumed:
            continue
        if parse_key(row["a"]) is None:
            continue              # no ground truth -> no trial
        ident, stkey = _identify_and_key(row["q"])
        if ident is None:
            G["singleton_unmatched"] += 1
            continue
        st = fam_stats(*stkey)
        _score_member(st, row, ident, "singleton")


# --------------------------------------------------------------------------- #
# 7. Checkpoint IO
# --------------------------------------------------------------------------- #

def _median(vals):
    if not vals:
        return 0.0
    v = sorted(vals)
    return v[len(v) // 2]


def save_checkpoint(plan, fp, done_keys, t_start):
    ck = {
        "plan_fp": fp,
        "groups_done": sorted(done_keys),
        "globals": dict(G),
        "families": {k: {**{f: v for f, v in st.items()
                            if f not in ("ms", "modes", "samples",
                                         "_median_ms_only", "sources")},
                         "modes": dict(st["modes"]),
                         "sources": dict(st["sources"]),
                         "ms": st["ms"][:5000],
                         "samples": st["samples"]}
                     for k, st in FAM.items()},
        "rows_scanned": G["rows_scanned"],
        "elapsed_s": round(time.time() - t_start, 1),
        "ts": time.strftime("%Y-%m-%d %H:%M:%S"),
        "source": SRC.mode,
    }
    tmp = CKPT + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(ck, fh, indent=1)
    os.replace(tmp, CKPT)


def load_checkpoint(fp):
    if not os.path.exists(CKPT):
        return set()
    with open(CKPT, encoding="utf-8") as fh:
        ck = json.load(fh)
    if ck.get("plan_fp") != fp:
        raise SystemExit(
            f"[ckpt] plan fingerprint {ck.get('plan_fp')!r} != current "
            f"{fp!r} -- the bank changed; delete {CKPT} to start fresh.")
    for k, st in ck.get("families", {}).items():
        st2 = fam_stats(k, st.get("kind", "registry"), st.get("detail", ""))
        for f in ("clusters", "members", "shipped", "matches"):
            st2[f] = st.get(f, 0)
        st2["modes"] = Counter(st.get("modes", {}))
        st2["sources"] = Counter(st.get("sources", {}))
        st2["ms"] = list(st.get("ms", []))
        st2["samples"] = st.get("samples", [])
        # the ms list is summarised in the checkpoint; keep the median only
        st2["_median_ms_only"] = st.get("ms_median", 0.0)
    G.update(ck.get("globals", {}))
    print(f"[ckpt] resuming: {len(ck.get('groups_done', []))} groups done, "
          f"{G['rows_scanned']} rows already scanned", flush=True)
    return set(ck.get("groups_done", []))


# --------------------------------------------------------------------------- #
# 8. Reports
# --------------------------------------------------------------------------- #

def write_reports(meta, elapsed_s, partial_note=""):
    fams = [st for st in FAM.values() if st["shipped"] + st["members"] > 0]
    for st in fams:
        st["accuracy"] = (st["matches"] / st["shipped"]) if st["shipped"] \
            else 0.0
        st["coverage"] = (st["shipped"] / st["members"]) if st["members"] \
            else 0.0
        med = st.get("_median_ms_only")
        if st["ms"]:
            st["median_ms"] = _median(st["ms"])
        elif med is not None:
            st["median_ms"] = med
        else:
            st["median_ms"] = 0.0
    fams.sort(key=lambda s: (-(s["accuracy"] * s["coverage"]),
                             -s["shipped"]))

    total_shipped = sum(s["shipped"] for s in fams)
    total_matches = sum(s["matches"] for s in fams)
    headline = (total_matches / total_shipped) if total_shipped else 0.0
    reg_shipped = sum(s["shipped"] for s in fams if s["kind"] == "registry")
    reg_matches = sum(s["matches"] for s in fams if s["kind"] == "registry")
    reg_headline = (reg_matches / reg_shipped) if reg_shipped else 0.0

    # ---- registry-fn rollups: the unit a C8 lane would enable.  A
    #      dispatcher (model_competency, model_maths, ...) owns many
    #      sub-structures; the verdict is per owning fn (autobind gates
    #      roll up to themselves).  Structure-level detail stays in the
    #      table; the bar list uses these rollups.
    rolls_map = {}
    for s in fams:
        rk = s["detail"] if s["kind"] == "registry" else s["family"]
        r = rolls_map.get(rk)
        if r is None:
            r = rolls_map[rk] = {"family": rk, "kind": s["kind"],
                                 "structures": 0, "clusters": 0,
                                 "members": 0, "shipped": 0, "matches": 0,
                                 "ms": [], "modes": Counter()}
        r["structures"] += 1
        for f in ("clusters", "members", "shipped", "matches"):
            r[f] += s[f]
        r["ms"].extend(s.get("ms") or [])
        r["modes"].update(s["modes"])
    rollups = sorted(rolls_map.values(),
                     key=lambda r: (-(r["matches"] / r["shipped"]
                                      if r["shipped"] else 0.0)
                                    * (r["shipped"] / r["members"]
                                       if r["members"] else 0.0),
                                    -r["shipped"]))
    for r in rollups:
        r["accuracy"] = (r["matches"] / r["shipped"]) if r["shipped"] \
            else 0.0
        r["coverage"] = (r["shipped"] / r["members"]) if r["members"] \
            else 0.0
        r["median_ms"] = _median(r["ms"]) if r["ms"] else 0.0
    above = [r for r in rollups if r["shipped"] >= MIN_SHIPPED
             and r["accuracy"] >= BAR]
    below = [r for r in rollups if r["shipped"] >= MIN_SHIPPED
             and r["accuracy"] < BAR]
    small = [r for r in rollups if r["shipped"] < MIN_SHIPPED]

    # ---------------- JSON ----------------
    out = {
        "generated": time.strftime("%Y-%m-%d %H:%M:%S"),
        "harness": os.path.abspath(__file__),
        "bank_source": {**meta, "live_db_used": SRC.mode == "db"},
        "method": {
            "clustering": "per (subject, class) group; TIER A: exact "
                          "normalize_skeleton equality (SCIENTIST-literal); "
                          "TIER B: content-word template key (stopwords "
                          "dropped, light stem, slot-type tokens kept, "
                          "sorted); both need >=3 members, >=2 "
                          "key-parseable; TIER C: singleton clusters -- "
                          "the bank is authored one-question-per-node and "
                          "has essentially no same-template numeric "
                          "clusters (measured), so every numeric-key row "
                          "is its own held-out fixture",
            "lomo": "family identified on the train member via the "
                    "production registry sweep + red-team guards + "
                    "release gate (autobind lane as fallback); every "
                    "other eligible member is a held-out recompute trial "
                    "(Tier C: the row itself)",
            "match_rule": "numeric-equivalent within max(0.01, 2% of "
                          "max(|a|,|s|))",
            "precision": "matches / shipped (guard refusals, family "
                         "non-matches, structure drift and no-numeric "
                         "results are NOT shipped: coverage losses, "
                         "never precision hits)",
            "bar": BAR,
        },
        "globals": dict(G),
        "headline": {
            "weighted_recompute_accuracy": round(headline, 6),
            "families": len(fams),
            "registry_only_accuracy": round(reg_headline, 6),
            "families_at_or_above_bar": len(above),
            "families_below_bar": len(below),
            "families_insufficient_fixtures": len(small),
        },
        "families": [
            {**{f: s[f] for f in ("family", "kind", "detail", "clusters",
                                  "members", "shipped", "matches")},
             "accuracy": round(s["accuracy"], 6),
             "coverage": round(s["coverage"], 6),
             "median_ms": round(s["median_ms"], 2),
             "failure_modes": dict(s["modes"]),
             "sources": dict(s["sources"]),
             "samples": s["samples"]}
            for s in fams
        ],
        "family_rollups": [
            {**{f: r[f] for f in ("family", "kind", "structures",
                                  "clusters", "members", "shipped",
                                  "matches")},
             "accuracy": round(r["accuracy"], 6),
             "coverage": round(r["coverage"], 6),
             "median_ms": round(r["median_ms"], 2),
             "verdict": ("enable" if r["shipped"] >= MIN_SHIPPED and
                         r["accuracy"] >= BAR else
                         "no-enable" if r["shipped"] >= MIN_SHIPPED else
                         "insufficient-fixtures"),
             "failure_modes": dict(r["modes"])}
            for r in rollups
        ],
        "elapsed_s": round(elapsed_s, 1),
        "partial_note": partial_note,
    }
    with open(OUT_JSON, "w", encoding="utf-8") as fh:
        json.dump(out, fh, indent=1, ensure_ascii=False)

    # ---------------- MD ----------------
    L = []
    w = L.append
    if SRC.mode == "db":
        src_line = ("live Postgres 127.0.0.1:5432/dream_app")
    else:
        src_line = (f"nightly dump snapshot: {meta.get('source', '?')} "
                    f"({meta.get('member', '?')}, built "
                    f"{meta.get('built_ts', '?')})")
    w("# LOMO Recompute-Accuracy Baseline (C8 gate)")
    w("")
    w(f"- Generated: {out['generated']}")
    w(f"- Bank source: **{SRC.mode}** -- {src_line}")
    if SRC.mode != "db":
        w("  - The production stack was DOWN while this harness ran "
          "(watchdog: 99 consecutive down checks; docker VM stopped) and "
          "this agent is barred from Docker commands -- the nightly dump "
          "snapshot is the honest reachable bank. Its date is stamped "
          "above; rows added after it are not measured.")
    w(f"- Method: {out['method']['lomo']}.")
    w(f"- Precision rule: {out['method']['precision']}.")
    w(f"- C8 bar: **precision >= {BAR:.0%}** per family.")
    if partial_note:
        w(f"- **PARTIAL RUN: {partial_note}**")
    w("")
    w("## Headline")
    w("")
    w(f"**{headline:.1%} weighted recompute precision across "
      f"{len(fams)} families** "
      f"({total_matches:,}/{total_shipped:,} shipped held-out recomputes "
      f"matched the stored key; registry families only: "
      f"{reg_headline:.1%} over {reg_shipped:,} shipped).")
    w("")
    w(f"- Held-out trials: {G['heldout_trials']:,} "
      f"(exact-skeleton clusters: {G['trials_exact']:,}, relaxed template "
      f"clusters: {G['trials_template']:,}, singleton fixtures: "
      f"{G['trials_singleton']:,})")
    if G["heldout_trials"]:
        w(f"- Shipped (family produced a numeric): {G['shipped']:,} "
          f"({G['shipped'] / G['heldout_trials']:.1%} coverage of trials)")
    w(f"- Clusters with >=3 members and no matching family: "
      f"{G['cluster_unmatched']:,}; singleton numeric rows with no "
      f"matching family: {G['singleton_unmatched']:,} (honest "
      f"non-coverage; no family to gate)")
    w(f"- Caveat: {G['multipart_keys']:,} trials used a multi-part stored "
      f"key (\"X = a; Y = b\"), unscoreable against a single numeric "
      f"recompute; {G['mismatches_multipart']:,} of the mismatches are "
      f"these -- they inflate the mismatch count but no single-value "
      f"lane could ever serve them.")
    w("")
    w("## Clustering yield (an honest finding about the bank)")
    w("")
    w(f"- Clusters with >=3 members formed from {G['rows_scanned']:,} "
      f"scanned rows: exact-skeleton {G['clusters_formed']:,} eligible "
      f"{G['clusters_eligible']:,} "
      f"(+{G['clusters_low_eligible']:,} low-eligible).")
    w("- The 2026-09-20 bank snapshot is authored **one question per "
      "node**: same-template numeric clusters are essentially absent, so "
      "SCIENTIST's 'unlimited verified fixtures from clusters' premise "
      "does not hold on this bank. The measurement therefore rests on "
      "Tier-C singleton fixtures (each numeric-key row is its own held-out "
      "recompute trial; the family program is fixed, hand-coded and never "
      "fitted to the row). Cluster-consistency signals (train-vs-member "
      "template agreement) exist only for the tiny Tier-A/B fixture set "
      "and are included where available.")
    w("")
    w("## Per-family table (sorted by accuracy x coverage)")
    w("")
    w("| family (registry fn) | kind | clusters | held-out members | "
      "shipped | matches | precision | coverage | median ms | top failure "
      "modes |")
    w("|---|---|---|---|---|---|---|---|---|---|")
    for s in fams:
        modes = ", ".join(f"{k}={v}" for k, v in
                          s["modes"].most_common(3)) or "-"
        name = s["family"] if s["kind"] == "autobind" else \
            s["family"].split("#")[0]
        w(f"| {name} ({s['detail']}) | {s['kind']} | {s['clusters']:,} | "
          f"{s['members']:,} | {s['shipped']:,} | {s['matches']:,} | "
          f"**{s['accuracy']:.1%}** | {s['coverage']:.1%} | "
          f"{s['median_ms']:.1f} | {modes} |")
    w("")
    w("## The 98% bar (verdicts per registry family)")
    w("")
    w(f"The C8 lane enables a family as a unit, so verdicts are per "
      f"owning registry fn (dispatcher sub-structures merged; autobind "
      f"gates stand alone). Families with >= {MIN_SHIPPED} shipped "
      f"recomputes get a verdict; smaller ones are listed as insufficient "
      f"fixtures.")
    w("")
    w("**AT OR ABOVE the 98% bar (C8 lane may enable):**")
    w("")
    if above:
        for r in above:
            w(f"- {r['family']}: precision {r['accuracy']:.2%} on "
              f"{r['shipped']:,} shipped (coverage {r['coverage']:.1%}; "
              f"{r['structures']} structure(s), median "
              f"{r['median_ms']:.1f} ms)")
    else:
        w("- none")
    w("")
    w("**BELOW the 98% bar (C8 lane must NOT enable):**")
    w("")
    if below:
        for r in below:
            worst = ", ".join(f"{k}={v}" for k, v in
                              r["modes"].most_common(3)) or "-"
            w(f"- {r['family']}: precision {r['accuracy']:.2%} on "
              f"{r['shipped']:,} shipped ({worst})")
    else:
        w("- none")
    w("")
    if small:
        w(f"**Insufficient fixtures (< {MIN_SHIPPED} shipped):** " +
          ", ".join(f"{r['family']} ({r['shipped']} shipped, "
                    f"{r['accuracy']:.0%})"
                    for r in small[:25]) +
          ("; ..." if len(small) > 25 else ""))
        w("")
    w("## Mismatch samples (first 3 per family)")
    w("")
    for s in fams:
        if s["samples"]:
            w(f"### {s['family'].split('#')[0]} ({s['detail']})")
            w("")
            for sm in s["samples"]:
                w(f"- qid {sm['qid'][:8]}...: expected "
                  f"`{sm['expected']}` got `{sm['got']}` -- "
                  f"q: {sm['q'][:130]}")
            w("")
    w("## How to resume / re-report")
    w("")
    w("```")
    w("cd D:\\platform\\deploy\\backend")
    w("python tests\\recompute_lomo_harness.py --resume")
    w("python tests\\recompute_lomo_harness.py --report")
    w("```")
    w("")
    with open(OUT_MD, "w", encoding="utf-8") as fh:
        fh.write("\n".join(L))
    print(f"[report] {OUT_JSON}\n[report] {OUT_MD}", flush=True)
    print(f"[headline] {headline:.1%} weighted precision across "
          f"{len(fams)} families; above bar {len(above)}, below bar "
          f"{len(below)}, insufficient {len(small)}", flush=True)


def report_from_checkpoint():
    """--report: rebuild json+md from the checkpoint alone."""
    global SRC
    if not os.path.exists(CKPT):
        raise SystemExit("[report] no checkpoint to report from")
    with open(CKPT, encoding="utf-8") as fh:
        ck = json.load(fh)
    SRC = type("SrcStub", (), {"mode": ck.get("source", "dump"),
                               "cache_meta": {}})()
    load_checkpoint(ck.get("plan_fp", ""))
    meta = json.load(open(BANK_META, encoding="utf-8")) \
        if os.path.exists(BANK_META) else {"source": "checkpoint"}
    write_reports(meta, ck.get("elapsed_s", 0.0),
                  ck.get("partial_note", ""))


# --------------------------------------------------------------------------- #
# 9. Main
# --------------------------------------------------------------------------- #

def main():
    global SRC
    if ARGS.build_cache:
        build_bank_cache()
        return
    SRC = BankSource()
    t_start = time.time()
    plan, fp = build_plan(SRC)
    done_keys = load_checkpoint(fp) if ARGS.resume else set()
    if ARGS.resume and not done_keys:
        print("[ckpt] no usable checkpoint -- fresh run", flush=True)

    partial_note = ""
    stop_reason = ""
    print(f"[lomo] start: {len(plan)} groups, scan budget "
          f"{min(SCAN_BUDGET, ARGS.max_rows or SCAN_BUDGET):,}, "
          f"rss {rss_mb():.0f}MB", flush=True)

    # warm-up: bootstrap the worker pool (spawn + backend imports land
    # here, under a generous timeout) and pay the family imports once
    t0 = time.perf_counter()
    ping = worker_call("worker_ping", (), WARMUP_TIMEOUT_S)
    ident = identify_family(
        "An ant crawls at 1 cm/s along a rubber band which stretches "
        "uniformly at 1 km/s. The band is initially 1 km long. Will the "
        "ant ever reach the other end?") if ping else None
    print(f"[warm-up] worker ping={ping} "
          f"({time.perf_counter() - t0:.2f}s), identify "
          f"matched={ident is not None}, rss {rss_mb():.0f}MB",
          flush=True)

    last_ckpt_rows = G["rows_scanned"]
    try:
        for item in plan:
            key = f"{item['subject']}|{item['class']}"
            if key in done_keys:
                continue
            if SRC.mode == "dump":
                rows = SRC.dump_group_rows(item["entries"])
                del item["entries"]      # free the taken entries' metadata
            else:
                rows = SRC.db_group_rows(item["subject"], item["class"],
                                         item["take"])
            if not rows:
                done_keys.add(key)
                continue
            run_group(item, rows)
            del rows
            done_keys.add(key)
            if G["rows_scanned"] - last_ckpt_rows >= CKPT_EVERY:
                save_checkpoint(plan, fp, done_keys, t_start)
                last_ckpt_rows = G["rows_scanned"]
                print(f"  {G['rows_scanned']:,} rows | clusters "
                      f"{G['clusters_eligible']:,} | trials "
                      f"{G['heldout_trials']:,} | shipped "
                      f"{G['shipped']:,} | matches {G['matches']:,} | "
                      f"rss {rss_mb():.0f}MB | "
                      f"{time.time() - t_start:.0f}s", flush=True)
            r = rss_mb()
            if r > RSS_LIMIT_MB:
                stop_reason = (f"RSS {r:.0f}MB above the {RSS_LIMIT_MB}MB "
                               f"guard -- checkpointed and stopped to "
                               f"protect the host")
                break
            if ARGS.max_rows and G["rows_scanned"] >= ARGS.max_rows:
                stop_reason = f"--max-rows {ARGS.max_rows} reached"
                break
    except KeyboardInterrupt:
        stop_reason = "interrupted -- checkpoint current"
    finally:
        save_checkpoint(plan, fp, done_keys, t_start)
        SRC.close()

    if stop_reason:
        partial_note = stop_reason
    elif len(done_keys) < len(plan):
        partial_note = f"{len(done_keys)}/{len(plan)} groups done"
    print(f"[lomo] done ({time.time() - t_start:.0f}s): "
          f"{G['rows_scanned']:,} rows, {G['clusters_eligible']:,} "
          f"eligible clusters, {G['heldout_trials']:,} trials, "
          f"{G['shipped']:,} shipped, {G['matches']:,} matches"
          + (f"  ({stop_reason})" if stop_reason else ""), flush=True)
    meta = getattr(SRC, "cache_meta", {}) or \
        {"source": "live Postgres 127.0.0.1:5432/dream_app"}
    write_reports(meta, time.time() - t_start, partial_note)


if __name__ == "__main__":
    if ARGS.report:
        report_from_checkpoint()
    else:
        main()
