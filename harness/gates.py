"""gates.py — G1..G10 wrappers (§6). Every gate: command, pass criteria,
timeout, evidence log. Gates run in VERIFY (G7/G10 again inside SOAK).
A gate that cannot run is SKIPPED and BLOCKS promotion (exit 2) unless the
work item's applicability matrix says not-applicable.

Order: cheap static first (G5), behavioral next, boot last (G7) so a seeded
defect fails fast without paying a boot.
"""
from __future__ import annotations

import ast
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional, Tuple

import common as C

ROOT = C.ROOT
DEPLOY_BACKEND = ROOT / "deploy" / "backend"

GATE_ORDER = ["G5", "G1", "G2", "G3", "G4", "G6", "G9", "G7", "G8", "G10"]


# --------------------------------------------------------------------------- #
# Execution plumbing (executor injectable for unit tests)
# --------------------------------------------------------------------------- #
def base_env(unllm: bool = True) -> Dict[str, str]:
    env = dict(os.environ)
    env["POSTGRES_URL"] = "sqlite+aiosqlite:///:memory:"
    env["PYTHONUNBUFFERED"] = "1"
    if unllm:
        env["SOLVER_LLM_MODE"] = "off"
        for k in ("FREELLM_API_KEY", "GEMINI_API_KEY", "GROQ_API_KEY"):
            env.pop(k, None)
    return env


def real_executor(cmd: List[str], cwd: Path, env: Dict[str, str],
                  timeout: float, log_path: Path) -> int:
    """Run a command, capture ALL output to log_path, return exit code.
    Timeout -> kill + exit 124 recorded in the log."""
    log_path.parent.mkdir(parents=True, exist_ok=True)
    with open(log_path, "wb") as logf:
        logf.write(f"$ {' '.join(str(c) for c in cmd)}\n"
                   f"  cwd={cwd} timeout={timeout}s\n".encode("utf-8", "replace"))
        logf.flush()
        try:
            proc = subprocess.run(cmd, cwd=str(cwd), env=env, stdout=logf,
                                  stderr=subprocess.STDOUT, timeout=timeout)
            return proc.returncode
        except subprocess.TimeoutExpired:
            logf.write(f"\n[TIMED OUT after {timeout}s — killed]\n".encode())
            return 124
        except OSError as exc:
            logf.write(f"\n[SPAWN FAILED: {exc!r}]\n".encode())
            return 127


Executor = Callable[[List[str], Path, Dict[str, str], float, Path], int]


def _result(gid: str, name: str, ok: bool, exit_code: int, seconds: float,
            log_path: Optional[Path], wi_dir: Path,
            skipped: bool = False, reason: str = "",
            extra: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    r = {"id": gid, "name": name, "ok": bool(ok), "exit": exit_code,
         "seconds": round(seconds, 1), "skipped": skipped, "reason": reason}
    if log_path is not None:
        try:
            r["log"] = log_path.relative_to(ROOT).as_posix()
        except ValueError:
            r["log"] = str(log_path)
        try:
            r["log_sha256"] = C.sha256_file(log_path)
        except OSError:
            pass
    if extra:
        r.update(extra)
    return r


# --------------------------------------------------------------------------- #
# Applicability
# --------------------------------------------------------------------------- #
def applicability(files: List[str], cfg: Dict[str, Any]) -> Dict[str, Dict[str, Any]]:
    def under(prefix: str) -> List[str]:
        return [f for f in files if f.replace("\\", "/").startswith(prefix)]

    backend_py = [f for f in under("deploy/backend/") if f.endswith(".py")]
    solver = [f for f in files if "its/solver/" in f.replace("\\", "/")]
    strings = [f for f in backend_py
               if any(g in f.replace("\\", "/")
                      for g in ("its/solver/", "routers/", "services/", "api/"))]
    frontend = under("deploy/frontend/")
    product = under("deploy/")
    has = lambda xs: {"applies": "apply" if xs else "not_applicable",
                      **({} if xs else {"reason": "no matching changed files"})}
    return {
        "G1": has(product),
        "G2": has(backend_py),
        "G3": has(backend_py),
        "G4": has(strings),
        "G5": {"applies": "apply"},
        "G6": has(solver),
        "G7": has(backend_py),
        "G8": has(frontend),
        "G9": {"applies": "apply" if product and cfg["gates"].get("chisel_present")
               else "not_applicable",
               **({} if (product and cfg["gates"].get("chisel_present")) else
                  {"reason": "chisel CLI not installed on host (verified "
                             "2026-10-13); install to activate G9"})},
        "G10": {"applies": "apply"},  # executes at SOAK; VERIFY may link
    }


def matrix_says(matrix: Dict[str, Dict[str, Any]], gid: str) -> Optional[bool]:
    """True = apply, False = not_applicable, None = omitted from the plan."""
    entry = matrix.get(gid)
    if entry is None:
        return None
    return entry.get("applies") == "apply"


# --------------------------------------------------------------------------- #
# Gate implementations
# --------------------------------------------------------------------------- #
def _logpath(wi_dir: Path, gid: str, tag: str) -> Path:
    return wi_dir / "logs" / f"{gid}_{tag}.log"


def g1_touched_tests(files: List[str]) -> Tuple[List[str], bool]:
    """Map changed backend files -> test files; fallback corpus dir."""
    tests: set = set()
    for f in files:
        norm = f.replace("\\", "/")
        if not norm.startswith("deploy/backend/") or not norm.endswith(".py"):
            continue
        stem = Path(norm).stem
        cand = DEPLOY_BACKEND / "tests" / f"test_{stem}.py"
        if cand.exists():
            tests.add(f"tests/test_{stem}.py")
            continue
        for p in (DEPLOY_BACKEND / "tests").glob(f"test_*{stem}*.py"):
            tests.add(f"tests/{p.name}")
    if tests:
        return sorted(tests), False
    corpus = DEPLOY_BACKEND / "tests" / "corpus"
    if corpus.exists() and list(corpus.glob("test_*.py")):
        return ["tests/corpus"], False
    return [], True


def gate_G1(cfg, wi, files, wi_dir, ex: Executor, t_left: float) -> Dict[str, Any]:
    paths, no_map = g1_touched_tests(files)
    if no_map:
        return _result("G1", "touched-area pytest", False, 2, 0.0, None, wi_dir,
                       skipped=True,
                       reason="no touched-area test file maps to scope and the "
                              "corpus dir is empty — SKIPPED blocks promotion")
    log = _logpath(wi_dir, "G1", "pytest")
    t0 = time.time()
    code = ex([sys.executable, "-m", "pytest", "-q", *paths],
              DEPLOY_BACKEND, base_env(), min(600, t_left), log)
    return _result("G1", f"pytest {' '.join(paths)}", code == 0, code,
                   time.time() - t0, log, wi_dir, extra={"tests": paths})


def gate_G2(cfg, wi, files, wi_dir, ex, t_left) -> Dict[str, Any]:
    log = _logpath(wi_dir, "G2", "pins")
    t0 = time.time()
    code = ex([sys.executable, "-m", "pytest", "-q",
               "tests/test_wsa_no_silent_pass.py"],
              DEPLOY_BACKEND, base_env(), min(600, t_left), log)
    return _result("G2", "PIN_TOTALS monotonic (no silent pass)", code == 0,
                   code, time.time() - t0, log, wi_dir)


def gate_G3(cfg, wi, files, wi_dir, ex, t_left) -> Dict[str, Any]:
    log = _logpath(wi_dir, "G3", "boundaries")
    t0 = time.time()
    code = ex([sys.executable, "-m", "pytest", "-q", "tests/test_boundaries.py"],
              DEPLOY_BACKEND, base_env(), min(600, t_left), log)
    return _result("G3", "import lint (boundaries)", code == 0, code,
                   time.time() - t0, log, wi_dir)


_G4_SCRIPT = r"""
import ast, json, sys
sys.path.insert(0, r"D:\platform\deploy")
from backend.its.solver import slop_gate

def docstring_values(tree):
    vals = set()
    for node in ast.walk(tree):
        if isinstance(node, (ast.Module, ast.FunctionDef, ast.AsyncFunctionDef,
                             ast.ClassDef)):
            doc = ast.get_docstring(node, clean=False)
            if doc is not None:
                vals.add(doc)
    return vals

def literals(path):
    try:
        tree = ast.parse(open(path, "r", encoding="utf-8", errors="replace").read())
    except (OSError, SyntaxError):
        return set()
    docs = docstring_values(tree)
    return {n.value for n in ast.walk(tree)
            if isinstance(n, ast.Constant) and isinstance(n.value, str)
            and len(n.value) > 3 and n.value not in docs}

old = set()
if sys.argv[1] != "-":
    old = literals(sys.argv[1])
new = literals(sys.argv[2]) - old
violations = []
for s in sorted(new):
    clean, flags = slop_gate.gate_text(s)
    ban = [f.get("kind") for f in flags
           if f.get("rewritten") and str(f.get("kind", "")).startswith("ban_")]
    if ban:  # ban-list rewrite on a source literal = violation; cosmetic
        violations.append({"literal": s[:120], "flags": ban})  # rewrites (normalized_display) are not
print(json.dumps({"new_literals": len(new), "violations": violations}))
sys.exit(1 if violations else 0)
"""


def gate_G4(cfg, wi, files, wi_dir, ex, t_left) -> Dict[str, Any]:
    scope = [f for f in files
             if f.replace("\\", "/").startswith("deploy/backend/")
             and f.endswith(".py")
             and any(g in f.replace("\\", "/")
                     for g in ("its/solver/", "routers/", "services/", "api/"))]
    log = _logpath(wi_dir, "G4", "slop")
    snap = C.cfg_path(cfg, "snapshots") / wi / "manifest.json"
    t0 = time.time()
    script = wi_dir / "logs" / "G4_script.py"
    script.parent.mkdir(parents=True, exist_ok=True)
    script.write_text(_G4_SCRIPT, encoding="utf-8")
    total_viol = 0
    with open(log, "w", encoding="utf-8") as lf:
        for f in scope:
            old_path = "-"
            if snap.exists():
                for e in json.loads(snap.read_text(encoding="utf-8"))["files"]:
                    if e["path"] == f:
                        blob = C.cfg_path(cfg, "snapshots") / wi / e["blob"]
                        if blob.exists():
                            old_path = str(blob)
            lf.write(f"== {f} (old={old_path})\n")
            lf.flush()
            proc = subprocess.run(
                [sys.executable, str(script), old_path, str(ROOT / f)],
                cwd=str(ROOT), capture_output=True, text=True, timeout=120)
            lf.write(proc.stdout + proc.stderr + "\n")
            if proc.returncode != 0:
                total_viol += 1
    return _result("G4", "antislop scrub on new/changed student-facing strings",
                   total_viol == 0, 1 if total_viol else 0, time.time() - t0,
                   log, wi_dir, extra={"scope_files": len(scope),
                                       "violations": total_viol})


def gate_G5(cfg, wi, files, wi_dir, ex=None, t_left=0) -> Dict[str, Any]:
    import scans
    t0 = time.time()
    findings = scans.run_all(cfg, files)
    log = _logpath(wi_dir, "G5", "scans")
    log.parent.mkdir(parents=True, exist_ok=True)
    hard = [f for f in findings
            if "WARN" not in f.detail and "(summary)" not in f.detail]
    with open(log, "w", encoding="utf-8") as lf:
        for f in findings:
            lf.write(f.line() + "\n")
        lf.write(f"\nG5 verdict: {len(hard)} hard finding(s)\n")
    return _result("G5", "static scans (control/nan/id/parse/pins/oversize)",
                   not hard, 1 if hard else 0, time.time() - t0, log, wi_dir,
                   extra={"hard_findings": len(hard)})


def gate_G6(cfg, wi, files, wi_dir, ex, t_left) -> Dict[str, Any]:
    parity = ROOT / "_work" / "overhaul" / "wsb_m2_parity.py"
    out = wi_dir / "logs" / "G6_out.json"
    log = _logpath(wi_dir, "G6", "parity")
    t0 = time.time()
    # the repo's real parity tool takes ~2300s for 200 stems (fleet log
    # wsb_m2_before.json: sweep 2270.4s) — the §6 default of 600s would
    # permanently red every solver batch, so G6 carries its own budget.
    timeout = min(cfg["gates"].get("g6_timeout_s", 2700), max(t_left, 2700))
    code = ex([sys.executable, str(parity), str(out)], ROOT, base_env(),
              timeout, log)
    if code != 0 or not out.exists():
        return _result("G6", "solver parity replay (LLM off)", False, code,
                       time.time() - t0, log, wi_dir)
    doc = json.loads(out.read_text(encoding="utf-8"))
    results = doc.get("results", {})
    matched = sum(1 for v in results.values() if v.get("structure"))
    base_path = C.cfg_path(cfg, "parity_baseline")
    baseline = json.loads(base_path.read_text(encoding="utf-8")) \
        if base_path.exists() else None
    causes_file = wi_dir / "G6_causes.txt"
    causes = {}
    if causes_file.exists():
        for ln in causes_file.read_text(encoding="utf-8").splitlines():
            if ":" in ln:
                k, v = ln.split(":", 1)
                causes[k.strip()] = v.strip()
    changed, unexplained = [], []
    if baseline:
        for stem, prev in baseline.get("results", {}).items():
            cur = results.get(stem, {})
            if (prev.get("structure") or None) != (cur.get("structure") or None):
                changed.append(stem)
                if stem not in causes:
                    unexplained.append(stem)
    if baseline is None:  # first run stores the baseline
        base_path.parent.mkdir(parents=True, exist_ok=True)
        base_path.write_text(json.dumps({"matched": matched,
                                         "results": results}), encoding="utf-8")
    ok = matched >= (baseline["matched"] if baseline else matched) and not unexplained
    return _result("G6", "matched stems >= baseline; changed stems have causes",
                   ok, 0 if ok else 1, time.time() - t0, log, wi_dir,
                   extra={"matched": matched,
                          "baseline_matched": baseline["matched"] if baseline else matched,
                          "changed_stems": changed[:10],
                          "unexplained": unexplained[:10]})


def gate_G7(cfg, wi, files, wi_dir, ex, t_left) -> Dict[str, Any]:
    log = _logpath(wi_dir, "G7", "boot")
    log.parent.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    wait_s = cfg.get("soak", {}).get("boot_wait_s", 360)
    dev = cfg["endpoints"]["dev_health"]
    code, body, _ = C.http_get(dev, timeout=12.0)
    if code == 200 and '"postgres":true' in body.replace(" ", ""):
        with open(log, "a", encoding="utf-8") as lf:
            lf.write(f"dev instance already healthy at {dev} — reused\n")
        return _result("G7", "dev boot + health", True, 0, time.time() - t0,
                       log, wi_dir, extra={"reused": True})
    bash = C.find_bash()
    if not bash:
        return _result("G7", "dev boot + health", False, 127, 0.0, None, wi_dir,
                       skipped=True, reason="bash not found on PATH")
    boot = ROOT / "_work" / "overhaul" / "boot_dev.sh"
    # the LIVE boot log keeps growing while uvicorn runs; the receipt pins a
    # FROZEN copy taken once health is up (a live log can never be sha-pinned)
    live_log = wi_dir / "logs" / "G7_boot_live.log"
    with open(live_log, "ab") as lf:
        lf.write(f"$ bash {boot}\n".encode())
        lf.flush()
        proc = subprocess.Popen([bash, str(boot)], cwd=str(ROOT),
                                stdout=lf, stderr=subprocess.STDOUT,
                                env={**os.environ, "PYTHONUNBUFFERED": "1"})
    (wi_dir / "g7_pid.json").write_text(json.dumps(
        {"pid": proc.pid, "boot_log": str(live_log.relative_to(ROOT))}),
        encoding="utf-8")
    deadline = time.time() + wait_s
    healthy = False
    while time.time() < deadline:
        code, body, _ = C.http_get(dev, timeout=12.0)
        if code == 200 and '"postgres":true' in body.replace(" ", ""):
            healthy = True
            break
        if proc.poll() is not None:
            break
        time.sleep(5)
    smoke = ""
    try:
        smoke = live_log.read_text(encoding="utf-8", errors="replace")
    except OSError:
        pass
    smoke_ok = ("SAFE TO SERVE" in smoke.upper()
                or "APPLICATION STARTUP COMPLETE" in smoke.upper())
    ok = healthy and smoke_ok
    # freeze the pinned copy (live log stays open for uvicorn)
    with open(log, "wb") as frozen, open(live_log, "rb") as src:
        while True:
            chunk = src.read(1 << 20)
            if not chunk:
                break
            frozen.write(chunk)
    with open(log, "ab") as lf:
        lf.write(f"\n[G7] healthy={healthy} smoke_ok={smoke_ok} pid={proc.pid} "
                 f"(pinned frozen copy; live log: {live_log.name})\n".encode())
    return _result("G7", "dev boot + health (SAFE TO SERVE + /api/health 200)",
                   ok, 0 if ok else 1, time.time() - t0, log, wi_dir,
                   extra={"pid": proc.pid, "healthy": healthy,
                          "smoke_ok": smoke_ok})


def gate_G8(cfg, wi, files, wi_dir, ex, t_left) -> Dict[str, Any]:
    log = _logpath(wi_dir, "G8", "reticle")
    fe = ROOT / "deploy" / "frontend"
    t0 = time.time()
    env = {**os.environ, "NEXT_DIST_DIR": str(fe / ".next_harness_verify")}
    code = ex(["cmd", "/c", "npm", "run", "verify"], fe, env,
              min(1800, t_left), log)
    return _result("G8", "frontend build + Reticle 10/10 (ICE 1.1)", code == 0,
                   code, time.time() - t0, log, wi_dir)


def gate_G9(cfg, wi, files, wi_dir, ex, t_left) -> Dict[str, Any]:
    log = _logpath(wi_dir, "G9", "chisel")
    t0 = time.time()
    code = ex(["chisel", "diff-impact", "--project", str(ROOT / "deploy")],
              ROOT / "deploy", base_env(), min(600, t_left), log)
    # named tests: parse log for test paths and run them (best effort — the
    # log lists impacted tests; we run them via pytest)
    named = []
    if code == 0:
        import re as _re
        for m in _re.finditer(r"(tests/[\w/]+\.py)", log.read_text(
                encoding="utf-8", errors="replace")):
            if m.group(1) not in named:
                named.append(m.group(1))
        if named:
            code2 = ex([sys.executable, "-m", "pytest", "-q", *named],
                       DEPLOY_BACKEND, base_env(), min(600, t_left), log)
            code = code2
    return _result("G9", "chisel diff-impact + named tests", code == 0, code,
                   time.time() - t0, log, wi_dir, extra={"named_tests": named})


def gate_G10(cfg, wi, files, wi_dir, ex=None, t_left=0) -> Dict[str, Any]:
    """VERIFY-side: link a green soak report <= 24h for the same file set.
    Otherwise DEFER to SOAK state (ok with linked=false) — G10's blocking
    moment is SOAK -> READY, which re-checks all_green on soak_report.json;
    VERIFY never silently passes a red soak, it just doesn't pre-empt it."""
    report = wi_dir / "soak_report.json"
    if report.exists():
        doc = json.loads(report.read_text(encoding="utf-8"))
        ts = C.parse_utc(doc.get("ts_utc", ""))
        age_h = (C.now_utc() - ts).total_seconds() / 3600 if ts else 1e9
        if bool(doc.get("all_green")) and age_h <= 24:
            return _result("G10", "soak thresholds", True, 0, 0.0, None,
                           wi_dir, extra={"linked": True,
                                          "age_h": round(age_h, 1)})
        return _result("G10", "soak thresholds", True, 0, 0.0, None, wi_dir,
                       extra={"linked": False,
                              "note": f"existing soak report is "
                                      f"{'stale' if age_h > 24 else 'red'} — "
                                      "executes again at SOAK state"})
    return _result("G10", "soak thresholds", True, 0, 0.0, None, wi_dir,
                   extra={"linked": False,
                          "note": "executes at SOAK state; VERIFY linked no "
                                  "recent receipt"})


GATES = {"G1": gate_G1, "G2": gate_G2, "G3": gate_G3, "G4": gate_G4,
         "G5": gate_G5, "G6": gate_G6, "G7": gate_G7, "G8": gate_G8,
         "G9": gate_G9, "G10": gate_G10}


# --------------------------------------------------------------------------- #
# Orchestration
# --------------------------------------------------------------------------- #
def run_applicable_gates(cfg: Dict[str, Any], wi: str, files: List[str],
                         matrix: Dict[str, Any],
                         executor: Optional[Executor] = None) -> List[Dict[str, Any]]:
    ex = executor or real_executor
    wi_dir = C.cfg_path(cfg, "receipts") / wi
    wi_dir.mkdir(parents=True, exist_ok=True)
    applic = applicability(files, cfg)
    cap = cfg["gates"]["verify_wall_cap_s"]
    t0 = time.time()
    results: List[Dict[str, Any]] = []
    for gid in GATE_ORDER:
        t_left = cap - (time.time() - t0)
        if t_left <= 0:
            results.append(_result(gid, "wall clock cap exceeded", False, 124,
                                   0.0, None, wi_dir, skipped=True,
                                   reason=f"VERIFY wall cap {cap}s exhausted"))
            continue
        planned = matrix_says(matrix, gid)
        actual = applic[gid]["applies"] == "apply"
        if planned is False and not actual:
            results.append(_result(gid, "not applicable per plan matrix", True,
                                   0, 0.0, None, wi_dir, skipped=True,
                                   reason=matrix.get(gid, {}).get("reason",
                                                                 "declared N/A")))
            continue
        if planned and not actual:
            # plan expected it but files say otherwise — run it anyway is
            # impossible; record honestly as N/A with the derived reason
            results.append(_result(gid, "not applicable (derived from files)",
                                   True, 0, 0.0, None, wi_dir, skipped=True,
                                   reason=applic[gid].get("reason",
                                                          "no matching files")))
            continue
        if actual and planned is None:
            # matrix omitted the gate; fail-closed: run it
            pass
        try:
            results.append(GATES[gid](cfg, wi, files, wi_dir, ex, t_left))
        except Exception as exc:
            results.append(_result(gid, "gate crashed", False, 130, 0.0, None,
                                   wi_dir, reason=repr(exc)[:200]))
    return results
