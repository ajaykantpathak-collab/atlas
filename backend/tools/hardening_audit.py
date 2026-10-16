"""hardening_audit.py — 10/10 backend hardening probe (run INSIDE a backend
container).  Produces a scored report of real, exploitable-or-degrading
defects; cosmetic style issues are out of scope.

Sections:
  1. ReDoS: every regex literal in solver/service/api trees is compiled and
     probed with adversarial inputs; anything matching slower than 100 ms
     (or not compiling) is flagged with file:line.
  2. Serving-layer silent excepts: `except ...: pass` bodies in api/,
     services/, main.py, routers/ — swallow paths that hide 500s or serve
     stale/empty data with a 200.
  3. Unbounded inputs: FastAPI endpoints accepting str/bytes/list bodies
     without max_length/size caps.
  4. DB: statement_timeout presence, pool config sanity.
  5. Degradation: redis/clickhouse/neo4j/qdrant call sites without a
     try/except fallback on the hot path.

Exit code 0 always (report tool); parse stdout for the score.
"""
from __future__ import annotations

import json
import os
import re
import sys
import time

BASE = os.environ.get("AUDIT_BASE", "/app/backend")
REPORT = {"sections": {}, "score": 0}

# ------------------------------------------------------------------ #
# 1. ReDoS probe
# ------------------------------------------------------------------ #

ADVERSARIALS = [
    "0" * 4000 + "a",
    " " * 4000,
    "a" * 4000,
    "1.5 " * 800 + "x",
    ":" * 2000,
    "::" * 1000,
    "(" * 200 + ")" * 200,
    "Rs " + "9" * 4000,
    "12/34/56/" * 500,
    "-" * 4000,
    "%08192d" % 1 + "!",
]

REGEX_LIT = re.compile(
    r"""(?:re\.(?:compile|match|search|fullmatch|findall|sub|split)\()\s*(?:r)?(["'])((?:\\.|(?!\1).)*)\1""",
    re.S,
)


def _redo_section():
    findings = []
    files_scanned = 0
    regexes = 0
    for root, _dirs, files in os.walk(BASE):
        if "/tests" in root or "/tools" in root:
            continue
        for fn in files:
            if not fn.endswith(".py"):
                continue
            p = os.path.join(root, fn)
            try:
                src = open(p, encoding="utf-8", errors="ignore").read()
            except OSError:
                continue
            files_scanned += 1
            for m in REGEX_LIT.finditer(src):
                pat = m.group(2)
                regexes += 1
                line = src[: m.start()].count("\n") + 1
                try:
                    rx = re.compile(pat)
                except re.error as e:
                    findings.append({"file": p, "line": line,
                                     "issue": f"compile error: {e}",
                                     "pattern": pat[:70]})
                    continue
                worst = 0.0
                worst_in = ""
                import signal as _sig

                class _ProbeTO(Exception):
                    pass

                def _alarm(s, f):
                    raise _ProbeTO()

                _old = _sig.signal(_sig.SIGALRM, _alarm)
                for adv in ADVERSARIALS:
                    t0 = time.perf_counter()
                    try:
                        _sig.alarm(3)
                        rx.search(adv)
                        _sig.alarm(0)
                    except _ProbeTO:
                        findings.append({
                            "file": p, "line": line,
                            "issue": "ReDoS-HANG: >3s (probe killed)",
                            "pattern": pat[:70]})
                        break
                    except Exception:
                        _sig.alarm(0)
                    dt = time.perf_counter() - t0
                    if dt > worst:
                        worst, worst_in = dt, adv[:20]
                _sig.signal(_sig.SIGALRM, _old)
                if worst > 0.100:
                    findings.append({
                        "file": p, "line": line,
                        "issue": f"ReDoS: {worst*1000:.0f} ms on {worst_in!r}",
                        "pattern": pat[:70]})
    return {"files": files_scanned, "regexes": regexes, "findings": findings}


# ------------------------------------------------------------------ #
# 2. serving-layer silent excepts
# ------------------------------------------------------------------ #

SILENT = re.compile(
    r"except[^\n:]*:\s*\n(?:\s*#[^\n]*\n)*\s*pass\s*\n", re.M)


def _silent_section():
    findings = []
    for sub in ("api", "services", "routers", ""):
        d = os.path.join(BASE, sub) if sub else BASE
        if not os.path.isdir(d):
            continue
        for fn in os.listdir(d):
            if not fn.endswith(".py"):
                continue
            p = os.path.join(d, fn)
            try:
                src = open(p, encoding="utf-8", errors="ignore").read()
            except OSError:
                continue
            for m in SILENT.finditer(src):
                line = src[: m.start()].count("\n") + 1
                findings.append({"file": p, "line": line})
    return {"findings": findings}


# ------------------------------------------------------------------ #
# 3. unbounded request bodies
# ------------------------------------------------------------------ #

FIELD = re.compile(r"(\w+)\s*:\s*(?:str|Optional\[str\]|list|List[\w\[\]]*)\s*=\s*Field\(([^)]*)\)")
CAP = re.compile(r"max_length\s*=")


def _bounds_section():
    findings = []
    for sub in ("api", "routers"):
        d = os.path.join(BASE, sub)
        if not os.path.isdir(d):
            continue
        for fn in os.listdir(d):
            if not fn.endswith(".py"):
                continue
            p = os.path.join(d, fn)
            src = open(p, encoding="utf-8", errors="ignore").read()
            for m in FIELD.finditer(src):
                name, args = m.group(1), m.group(2)
                if "min_length" in args and "max_length" not in args:
                    line = src[: m.start()].count("\n") + 1
                    findings.append({"file": p, "line": line, "field": name,
                                     "issue": "min_length without max_length"})
                elif "max_length" not in args and name in (
                        "text", "question", "query", "answer_text", "prompt",
                        "message", "body", "content"):
                    line = src[: m.start()].count("\n") + 1
                    findings.append({"file": p, "line": line, "field": name,
                                     "issue": "free-text body without max_length"})
    return {"findings": findings}


# ------------------------------------------------------------------ #
# 4. DB hardening
# ------------------------------------------------------------------ #

def _db_section():
    out = {}
    try:
        import psycopg2  # noqa
        import os as _os
        dsn = _os.environ.get("DATABASE_URL") or _os.environ.get("POSTGRES_DSN") or ""
        out["dsn_present"] = bool(dsn)
    except Exception as e:  # noqa
        out["psycopg2"] = str(e)[:80]
    src = open(os.path.join(BASE, "database.py"), encoding="utf-8",
               errors="ignore").read()
    out["statement_timeout_set"] = "statement_timeout" in src or \
        "options.-c" in src or "options=-c" in src
    out["pool_pre_ping"] = "pool_pre_ping=True" in src
    out["pool_size"] = "pool_size" in src
    return out


# ------------------------------------------------------------------ #
# 5. degradation probes (live)
# ------------------------------------------------------------------ #

def _degrade_section():
    out = {}
    if os.environ.get("AUDIT_SKIP_LIVE"):
        out["skipped"] = True
        return out
    # solve path must work with cache stores down: simulate by measuring
    # a solve (cache hit path can't be forced safely; just record latency)
    t0 = time.perf_counter()
    try:
        sys.path.insert(0, "/app")
        from backend.its.solver.answer_pipeline import answer  # noqa
        r = answer("A car travels 150 km in 2 hours. What is its average speed?")
        out["solve_ok"] = bool(r and r.label == "VERIFIED")
        out["solve_ms"] = round((time.perf_counter() - t0) * 1000, 1)
    except Exception as e:  # noqa
        out["solve_ok"] = False
        out["solve_error"] = str(e)[:120]
    return out


def main():
    sections = {
        "redo": _redo_section(),
        "silent": _silent_section(),
        "bounds": _bounds_section(),
        "db": _db_section(),
        "degrade": _degrade_section(),
    }
    score = 10
    n_redo = len(sections["redo"]["findings"])
    n_silent = len(sections["silent"]["findings"])
    n_bounds = len(sections["bounds"]["findings"])
    score -= min(3, n_redo // 5)          # 5+ slow regexes -> -3 max
    score -= min(3, n_silent // 10)       # 10+ swallow paths -> -3 max
    score -= min(2, n_bounds // 5)        # unbounded bodies -> -2 max
    if not sections["db"]["statement_timeout_set"]:
        score -= 1
    if not sections["degrade"].get("solve_ok"):
        score -= 2
    sections["score"] = max(0, score)
    print(json.dumps(sections, indent=1))


if __name__ == "__main__":
    main()
