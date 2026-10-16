"""runner.py — change-loop state machine, legality, tamper-evident receipts.

States (§5): INTAKE -> PLAN -> IMPLEMENT -> VERIFY -> REVIEW -> STAGED ->
SOAK -> READY; REWORK (bounded 3); FAILED; ROLLED_BACK; SHIPPED (owner-only).

Design: a work item's CURRENT STATE is always the to_state of its LAST
receipt — wi.json holds only metadata. Every transition writes exactly one
receipt; no receipt, no transition (fail-closed, exit 4). The chain is
hash-linked via prev_receipt_sha256; status re-verifies links AND every
referenced gate log (missing/mismatched log = tamper, exit 6).
"""
from __future__ import annotations

import json
import re
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional, Tuple

import common as C

WI_RX = re.compile(r"^WI-\d{8}-\d{3}$")
TERMINAL = {"SHIPPED", "FAILED", "ROLLED_BACK"}
LEGAL = {
    ("INTAKE", "PLAN"), ("PLAN", "IMPLEMENT"), ("IMPLEMENT", "VERIFY"),
    ("VERIFY", "REVIEW"), ("REVIEW", "STAGED"), ("STAGED", "SOAK"),
    ("SOAK", "READY"), ("READY", "SHIPPED"), ("REWORK", "IMPLEMENT"),
}
MAX_REWORK = 3


class LoopError(Exception):
    def __init__(self, code: int, msg: str):
        super().__init__(msg)
        self.code = code


# --------------------------------------------------------------------------- #
# Work item plumbing
# --------------------------------------------------------------------------- #
def wi_dir(cfg: Dict[str, Any], wi: str) -> Path:
    return C.cfg_path(cfg, "receipts") / wi


def list_wis(cfg: Dict[str, Any]) -> List[str]:
    rdir = C.cfg_path(cfg, "receipts")
    if not rdir.exists():
        return []
    return sorted(d.name for d in rdir.iterdir()
                  if d.is_dir() and WI_RX.match(d.name))


def new_wi(cfg: Dict[str, Any], title: str, lanes: List[str]) -> str:
    today = datetime.now().strftime("%Y%m%d")
    n = 1 + sum(1 for w in list_wis(cfg) if w.startswith(f"WI-{today}"))
    wi = f"WI-{today}-{n:03d}"
    while wi_dir(cfg, wi).exists():  # never collide
        n += 1
        wi = f"WI-{today}-{n:03d}"
    d = wi_dir(cfg, wi)
    d.mkdir(parents=True)
    (d / "wi.json").write_text(json.dumps({
        "work_item": wi, "title": title, "lanes": lanes,
        "created_utc": C.iso_utc(), "plan_path": None,
    }, indent=1), encoding="utf-8")
    write_receipt(cfg, wi, "NEW", "INTAKE",
                  notes=f"title={title!r} lanes={lanes}")
    return wi


def receipts_of(cfg: Dict[str, Any], wi: str) -> List[Path]:
    d = wi_dir(cfg, wi)
    if not d.exists():
        raise LoopError(C.EXIT_MISSING, f"unknown work item: {wi}")
    files = [p for p in d.glob("*.json")
             if p.name not in ("wi.json", "judge_verdict.json", "soak_report.json",
                               "g7_pid.json")]
    def n_of(p: Path):
        try:
            return int(p.name.split("_", 1)[0])
        except ValueError:
            return 10 ** 9
    return sorted(files, key=n_of)


def state_of(cfg: Dict[str, Any], wi: str) -> str:
    rcpts = receipts_of(cfg, wi)
    if not rcpts:
        return "INTAKE"
    doc = json.loads(rcpts[-1].read_text(encoding="utf-8"))
    return doc.get("to_state", "INTAKE")


def rework_count(cfg: Dict[str, Any], wi: str) -> int:
    n = 0
    for p in receipts_of(cfg, wi):
        doc = json.loads(p.read_text(encoding="utf-8"))
        if doc.get("to_state") == "REWORK":
            n += 1
    return n


def judge_fail_streak(cfg: Dict[str, Any], wi: str) -> int:
    """Consecutive judge FAIL verdicts across rework cycles: a FAIL
    increments, a PASS resets, other transitions keep the streak (§8)."""
    streak = 0
    for p in receipts_of(cfg, wi):
        doc = json.loads(p.read_text(encoding="utf-8"))
        if doc.get("from_state") == "VERIFY" and doc.get("to_state") == "REWORK" \
                and doc.get("judge_verdict") == "FAIL":
            streak += 1
        elif doc.get("from_state") == "VERIFY" and doc.get("to_state") == "REVIEW":
            streak = 0
    return streak


# --------------------------------------------------------------------------- #
# Receipts
# --------------------------------------------------------------------------- #
def write_receipt(cfg: Dict[str, Any], wi: str, from_state: str, to_state: str,
                  gates: Optional[List[Dict[str, Any]]] = None,
                  evidence: Optional[Dict[str, Any]] = None,
                  notes: str = "", extra: Optional[Dict[str, Any]] = None) -> Path:
    d = wi_dir(cfg, wi)
    rcpts = receipts_of(cfg, wi)
    prev_sha = C.sha256_file(rcpts[-1]) if rcpts else None
    n = len(rcpts) + 1
    doc = {
        "receipt_id": C.receipt_id(),
        "work_item": wi,
        "from_state": from_state, "to_state": to_state,
        "actor": "agent:harness-runner",
        "ts_utc": C.iso_utc(),
        "gates": gates or [],
        "evidence": evidence or {},
        "notes": notes,
        "prev_receipt_sha256": prev_sha,
    }
    if extra:
        doc.update(extra)
    path = d / f"{n:02d}_{from_state}_{to_state}.json"
    path.write_text(json.dumps(doc, indent=1, ensure_ascii=False), encoding="utf-8")
    return path


def verify_chain(cfg: Dict[str, Any], wi: str) -> List[Dict[str, Any]]:
    """Walk receipts; verify hash links + gate-log existence/sha. Returns
    the chain docs. Raises LoopError(EXIT_TAMPER) on any violation.

    Corrections are NEW receipts with a "correction" list — the ledger is
    never edited. A correction names one (receipt file, gate id, field) and
    a reason; verify_chain honors covered mismatches transparently (they
    are printed as notices, not tamper)."""
    docs: List[Dict[str, Any]] = []
    paths: List[Path] = []
    for p in receipts_of(cfg, wi):
        try:
            doc = json.loads(p.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            raise LoopError(C.EXIT_TAMPER, f"unparseable receipt {p.name}: {exc}")
        docs.append(doc)
        paths.append(p)
    # pre-collect corrections (they may appear after the receipt they cover)
    corrections: List[Dict[str, Any]] = []
    for doc in docs:
        corrections += doc.get("correction", []) or []
    prev_path: Optional[Path] = None
    for p, doc in zip(paths, docs):
        expected_prev = C.sha256_file(prev_path) if prev_path else None
        if doc.get("prev_receipt_sha256") != expected_prev:
            raise LoopError(C.EXIT_TAMPER,
                            f"chain broken at {p.name}: prev_receipt_sha256 mismatch")
        for g in doc.get("gates", []) or []:
            log = g.get("log")
            if log:
                logp = C.ROOT / log if not Path(log).is_absolute() else Path(log)
                if not logp.exists():
                    raise LoopError(C.EXIT_TAMPER,
                                    f"{p.name} references missing log: {log}")
                if g.get("log_sha256") and C.sha256_file(logp) != g["log_sha256"]:
                    covered = any(c.get("receipt") == p.name
                                  and c.get("gate") == g.get("id")
                                  and c.get("field") == "log_sha256"
                                  for c in corrections)
                    if covered:
                        print(f"[chain] NOTICE: {p.name} gate {g.get('id')} "
                              f"log sha unpinned by correction (live log)")
                    else:
                        raise LoopError(
                            C.EXIT_TAMPER,
                            f"{p.name} log sha mismatch: {log}")
        prev_path = p
    return docs


def write_correction(cfg: Dict[str, Any], wi: str, receipt: str, gate: str,
                     field: str, reason: str) -> Path:
    """Append a correction receipt (never edit history)."""
    state = state_of(cfg, wi)
    return write_receipt(
        cfg, wi, state, state,
        notes=f"CORRECTION: {receipt} gate {gate} field {field}: {reason}",
        extra={"correction": [{"receipt": receipt, "gate": gate,
                               "field": field, "reason": reason}]})


def require(cond: bool, code: int, msg: str) -> None:
    if not cond:
        raise LoopError(code, msg)


# --------------------------------------------------------------------------- #
# Plan parsing (§5 legality: VERIFY requires a plan receipt naming scope,
# matrix, citation; §11 valve: IMPROVEMENT cites corpus/telemetry, REFACTOR
# cites the parity baseline)
# --------------------------------------------------------------------------- #
def parse_plan(text: str) -> Dict[str, Any]:
    def section(name: str) -> str:
        m = re.search(rf"^##\s+{re.escape(name)}\s*$\n(.*?)(?=^##\s|\Z)",
                      text, re.M | re.S)
        return m.group(1).strip() if m else ""

    files = [ln.strip().lstrip("- ").strip()
             for ln in section("Files in scope").splitlines()
             if ln.strip().startswith("-")]
    matrix: Dict[str, Dict[str, str]] = {}
    for ln in section("Gates expected (applicability matrix)").splitlines():
        m = re.match(r"-\s*(G\d+)\s*:\s*(apply|not_applicable)\s*(?:\((.+)\))?",
                     ln.strip())
        if m:
            matrix[m.group(1)] = {"applies": m.group(2)}
            if m.group(3):
                matrix[m.group(1)]["reason"] = m.group(3)
    plan = {
        "type": section("Type").strip().upper(),
        "citation": section("Citation (improvement valve / refactor baseline)"),
        "files": files,
        "matrix": matrix,
        "approach": section("Approach"),
    }
    require(plan["type"] in ("IMPROVEMENT", "REFACTOR"), C.EXIT_MISSING,
            "plan must declare Type: IMPROVEMENT or REFACTOR")
    require(len(plan["citation"]) >= 10, C.EXIT_MISSING,
            "plan citation missing/short (§11 valve: IMPROVEMENT cites a corpus "
            "case or telemetry row; REFACTOR cites the parity baseline)")
    require(plan["files"], C.EXIT_MISSING, "plan must list >= 1 file in scope")
    require(plan["approach"], C.EXIT_MISSING, "plan must have an Approach section")
    return plan


def cmd_plan(cfg: Dict[str, Any], wi: str, plan_path: Path) -> int:
    state = state_of(cfg, wi)
    require(state == "INTAKE", C.EXIT_ILLEGAL, f"plan requires INTAKE, at {state}")
    text = plan_path.read_text(encoding="utf-8")
    plan = parse_plan(text)
    # files not yet on disk are legitimate NEW scope — the snapshot records
    # them as new and rollback deletes them
    dest = wi_dir(cfg, wi) / "plan.md"
    shutil.copyfile(plan_path, dest)
    meta = json.loads((wi_dir(cfg, wi) / "wi.json").read_text(encoding="utf-8"))
    meta["plan_path"] = str(dest)
    (wi_dir(cfg, wi) / "wi.json").write_text(json.dumps(meta, indent=1), encoding="utf-8")
    write_receipt(cfg, wi, "INTAKE", "PLAN", evidence={
        "plan": {"path": str(dest), "sha256": C.sha256_file(dest)},
        "files_in_scope": plan["files"],
        "gates_expected": plan["matrix"],
        "wi_type": plan["type"], "citation": plan["citation"][:400],
    }, notes=f"type={plan['type']} files={len(plan['files'])}")
    print(f"[runner] {wi}: INTAKE -> PLAN (plan receipt written)")
    return C.EXIT_OK


# --------------------------------------------------------------------------- #
# Transitions
# --------------------------------------------------------------------------- #
def _check_advance(cfg: Dict[str, Any], wi: str, to: str) -> str:
    state = state_of(cfg, wi)
    if to == "REWORK":
        require(state not in TERMINAL and state not in ("READY", "SHIPPED"),
                C.EXIT_ILLEGAL, f"REWORK illegal from {state}")
        rc = rework_count(cfg, wi)
        require(rc < MAX_REWORK, C.EXIT_ILLEGAL,
                f"REWORK cap ({MAX_REWORK}) exceeded — item must go FAILED")
        return state
    require((state, to) in LEGAL, C.EXIT_ILLEGAL,
            f"illegal transition {state} -> {to}")
    return state


def cmd_advance(cfg: Dict[str, Any], wi: str, to: str) -> int:
    state = _check_advance(cfg, wi, to)
    if to == "REWORK":
        rc = rework_count(cfg, wi) + 1
        write_receipt(cfg, wi, state, "REWORK",
                      notes=f"rework #{rc}/{MAX_REWORK}")
        print(f"[runner] {wi}: {state} -> REWORK ({rc}/{MAX_REWORK})")
        return C.EXIT_OK
    if to == "IMPLEMENT":
        write_receipt(cfg, wi, state, to, notes="implementation begins")
        print(f"[runner] {wi}: {state} -> IMPLEMENT")
        return C.EXIT_OK
    if to == "STAGED":
        verdict = wi_dir(cfg, wi) / "judge_verdict.json"
        require(verdict.exists(), C.EXIT_MISSING,
                "REVIEW -> STAGED requires judge_verdict.json with verdict PASS")
        v = json.loads(verdict.read_text(encoding="utf-8"))
        require(v.get("verdict") == "PASS", C.EXIT_MISSING,
                f"judge verdict is {v.get('verdict')}, not PASS")
        plan = json.loads(_plan_receipt(cfg, wi).read_text(encoding="utf-8"))
        files = plan["evidence"]["files_in_scope"]
        snap = C.cfg_path(cfg, "snapshots") / wi / "manifest.json"
        require(snap.exists(), C.EXIT_MISSING,
                "REVIEW -> STAGED requires a snapshot manifest (run: "
                "harness.py snapshot " + wi + ")")
        man = json.loads(snap.read_text(encoding="utf-8"))
        covered = {f["path"] for f in man.get("files", [])}
        missing = [f for f in files if f not in covered]
        require(not missing, C.EXIT_MISSING,
                f"snapshot manifest does not cover: {missing}")
        write_receipt(cfg, wi, state, to, evidence={"judge": "PASS",
                                                    "snapshot": str(snap)})
        print(f"[runner] {wi}: REVIEW -> STAGED (judge PASS + snapshot verified)")
        return C.EXIT_OK
    if to == "READY":
        report = wi_dir(cfg, wi) / "soak_report.json"
        require(report.exists(), C.EXIT_MISSING,
                "SOAK -> READY requires soak_report.json")
        doc = json.loads(report.read_text(encoding="utf-8"))
        reds = [k for k, v in doc.get("thresholds", {}).items() if v is False]
        require(doc.get("all_green", False), C.EXIT_GATE_RED,
                f"soak thresholds red: {reds or 'see soak_report.json'}")
        write_receipt(cfg, wi, state, to, evidence={"soak_report": str(report)})
        print(f"[runner] {wi}: SOAK -> READY (soak all green)")
        return C.EXIT_OK
    raise LoopError(C.EXIT_ILLEGAL, f"advance --to {to} not handled here")


def _plan_receipt(cfg: Dict[str, Any], wi: str) -> Path:
    for p in receipts_of(cfg, wi):
        doc = json.loads(p.read_text(encoding="utf-8"))
        if doc.get("to_state") == "PLAN":
            return p
    raise LoopError(C.EXIT_MISSING, f"{wi}: no PLAN receipt found")


def cmd_rework_to_failed(cfg: Dict[str, Any], wi: str) -> int:
    write_receipt(cfg, wi, state_of(cfg, wi), "FAILED",
                  notes="two consecutive judge FAIL verdicts (§8)")
    print(f"[runner] {wi}: -> FAILED (two consecutive judge FAILs)")
    return C.EXIT_JUDGE_FAIL


def cmd_review(cfg: Dict[str, Any], wi: str, verdict_path: Path) -> int:
    state = state_of(cfg, wi)
    require(state == "VERIFY", C.EXIT_ILLEGAL, f"review requires VERIFY, at {state}")
    last = json.loads(receipts_of(cfg, wi)[-1].read_text(encoding="utf-8"))
    gates = last.get("gates", [])
    reds = [g["id"] for g in gates if not g.get("ok")]
    require(not reds, C.EXIT_GATE_RED,
            f"cannot review with red gates: {reds}")
    require(verdict_path.exists(), C.EXIT_MISSING, f"verdict file missing: {verdict_path}")
    v = json.loads(verdict_path.read_text(encoding="utf-8"))
    require(v.get("verdict") in ("PASS", "FAIL"), C.EXIT_MISSING,
            "verdict must be PASS or FAIL")
    require(v.get("work_item") == wi, C.EXIT_MISSING,
            f"verdict names work_item {v.get('work_item')}, expected {wi}")
    require(isinstance(v.get("independent_reruns"), list) and v["independent_reruns"],
            C.EXIT_MISSING, "verdict must record independent_reruns (§8)")
    dest = wi_dir(cfg, wi) / "judge_verdict.json"
    if verdict_path.resolve() != dest.resolve():
        shutil.copyfile(verdict_path, dest)
    if v["verdict"] == "PASS":
        write_receipt(cfg, wi, "VERIFY", "REVIEW",
                      notes=f"judge PASS; reruns={v['independent_reruns']}",
                      extra={"judge_verdict": "PASS"})
        print(f"[runner] {wi}: VERIFY -> REVIEW (judge PASS)")
        return C.EXIT_OK
    streak = judge_fail_streak(cfg, wi) + 1
    if streak >= 2:
        return cmd_rework_to_failed(cfg, wi)
    write_receipt(cfg, wi, "VERIFY", "REWORK",
                  notes=f"judge FAIL #1: issues={[i.get('desc', '')[:80] for i in v.get('issues', [])]}",
                  extra={"judge_verdict": "FAIL"})
    print(f"[runner] {wi}: VERIFY -> REWORK (judge FAIL; return evidence, not arguments)")
    return C.EXIT_JUDGE_FAIL


def cmd_ship_confirm(cfg: Dict[str, Any], wi: str, manifest: Path) -> int:
    state = state_of(cfg, wi)
    require(state == "READY", C.EXIT_ILLEGAL,
            f"ship-confirm requires READY, at {state} (owner fires the ship, "
            "then records it here)")
    require(manifest.exists(), C.EXIT_MISSING, f"ship manifest missing: {manifest}")
    write_receipt(cfg, wi, "READY", "SHIPPED", evidence={
        "ship_manifest": str(manifest),
        "ship_manifest_sha256": C.sha256_file(manifest),
    })
    print(f"[runner] {wi}: READY -> SHIPPED (owner-recorded)")
    return C.EXIT_OK


# --------------------------------------------------------------------------- #
# verify / soak / rollback — engines injected (gates.py, soak.py,
# snapshots.py); tests pass fakes. All three write exactly one receipt.
# --------------------------------------------------------------------------- #
def changed_files_evidence(cfg: Dict[str, Any], wi: str,
                           files: List[str]) -> List[Dict[str, Any]]:
    """sha256_before (snapshot manifest if present) vs sha256_after (disk)."""
    snap = C.cfg_path(cfg, "snapshots") / wi / "manifest.json"
    before = {}
    if snap.exists():
        for f in json.loads(snap.read_text(encoding="utf-8")).get("files", []):
            before[f["path"]] = f["sha256"]
    out = []
    for f in files:
        p = C.ROOT / f
        after = C.sha256_file(p) if p.exists() else None
        out.append({"path": f, "sha256_before": before.get(f),
                    "sha256_after": after})
    return out


def cmd_verify(cfg: Dict[str, Any], wi: str,
               gate_runner: Optional[Callable[[Dict[str, Any], str, List[str],
                                              Dict[str, Any]], List[Dict[str, Any]]]] = None) -> int:
    state = state_of(cfg, wi)
    require(state == "IMPLEMENT", C.EXIT_ILLEGAL,
            f"verify requires IMPLEMENT, at {state}")
    plan_doc = json.loads(_plan_receipt(cfg, wi).read_text(encoding="utf-8"))
    files = plan_doc["evidence"]["files_in_scope"]
    matrix = plan_doc["evidence"]["gates_expected"]
    if gate_runner is None:
        import gates as gates_mod
        gate_runner = gates_mod.run_applicable_gates
    results = gate_runner(cfg, wi, files, matrix)
    evidence = {"changed_files": changed_files_evidence(cfg, wi, files)}
    reds = [g["id"] for g in results if not g.get("ok")]
    write_receipt(cfg, wi, "IMPLEMENT", "VERIFY", gates=results,
                  evidence=evidence,
                  notes=("all applicable gates green" if not reds
                         else f"red/blocking gates: {reds}"))
    if reds:
        print(f"[runner] {wi}: VERIFY RED — blocked gates: {reds} (exit 2)")
        return C.EXIT_GATE_RED
    print(f"[runner] {wi}: IMPLEMENT -> VERIFY ({len(results)} gates green)")
    return C.EXIT_OK


def cmd_soak(cfg: Dict[str, Any], wi: str,
             soak_runner: Optional[Callable[[Dict[str, Any], str], Dict[str, Any]]] = None) -> int:
    state = state_of(cfg, wi)
    require(state in ("STAGED", "SOAK"), C.EXIT_ILLEGAL,
            f"soak requires STAGED or SOAK, at {state}")
    if soak_runner is None:
        import soak as soak_mod
        soak_runner = soak_mod.run_soak
    report = soak_runner(cfg, wi)
    report_path = wi_dir(cfg, wi) / "soak_report.json"
    report_path.write_text(json.dumps(report, indent=1, ensure_ascii=False),
                           encoding="utf-8")
    report["report_path"] = str(report_path)
    greens = all(v for v in report.get("thresholds", {}).values()) \
        if report.get("thresholds") else report.get("all_green", False)
    write_receipt(cfg, wi, "STAGED", "SOAK",
                  evidence={"soak_report": report.get("report_path"),
                            "thresholds": report.get("thresholds", {})},
                  notes="soak thresholds green" if greens else "soak RED")
    if not greens:
        print(f"[runner] {wi}: soak RED -> state SOAK with red thresholds "
              "(rollback or rework; exit 2)")
        return C.EXIT_GATE_RED
    print(f"[runner] {wi}: STAGED -> SOAK (all thresholds green)")
    return C.EXIT_OK


def cmd_rollback(cfg: Dict[str, Any], wi: str,
                 restore: Optional[Callable[[Dict[str, Any], str], List[Dict[str, Any]]]] = None) -> int:
    state = state_of(cfg, wi)
    require(state in ("STAGED", "SOAK", "READY"), C.EXIT_ILLEGAL,
            f"rollback is legal from STAGED/SOAK/READY, at {state}")
    if restore is None:
        import snapshots as snap_mod
        restore = snap_mod.restore_files
    table = restore(cfg, wi)
    ok = all(r["ok"] for r in table)
    require(ok, C.EXIT_MISSING, "restore sha256 verification failed — manual attention")
    write_receipt(cfg, wi, state, "ROLLED_BACK", evidence={"restored": table},
                  notes=f"{len(table)} file(s) restored byte-identical")
    print(f"[runner] {wi}: {state} -> ROLLED_BACK ({len(table)} files, sha256 verified)")
    return C.EXIT_OK


# --------------------------------------------------------------------------- #
# status
# --------------------------------------------------------------------------- #
def cmd_status(cfg: Dict[str, Any], wi: str) -> int:
    try:
        docs = verify_chain(cfg, wi)
    except LoopError as exc:
        print(f"[status] TAMPER ALERT: {exc}")
        return exc.code
    meta_path = wi_dir(cfg, wi) / "wi.json"
    meta = json.loads(meta_path.read_text(encoding="utf-8")) if meta_path.exists() else {}
    print(f"== {wi} :: {meta.get('title', '')}")
    print(f"   lanes: {meta.get('lanes', [])}  created: {meta.get('created_utc')}")
    print(f"   state: {state_of(cfg, wi)}   reworks: {rework_count(cfg, wi)}/{MAX_REWORK}"
          f"   judge-fail streak: {judge_fail_streak(cfg, wi)}")
    for p, doc in zip(receipts_of(cfg, wi), docs):
        gates = doc.get("gates", [])
        gsum = ""
        if gates:
            ok = sum(1 for g in gates if g.get("ok"))
            gsum = f"  gates {ok}/{len(gates)}"
        print(f"   {p.name:44s} {doc.get('from_state'):>9s} -> {doc.get('to_state'):<9s}"
              f" {doc.get('ts_utc')}{gsum}")
    print(f"   chain: {len(docs)} receipt(s), hash links verified OK")
    return C.EXIT_OK


def cmd_status_all(cfg: Dict[str, Any]) -> int:
    wis = list_wis(cfg)
    if not wis:
        print("[status] no work items")
        return C.EXIT_OK
    bad = 0
    for wi in wis:
        try:
            verify_chain(cfg, wi)
        except LoopError as exc:
            bad += 1
            print(f"[status] TAMPER ALERT {wi}: {exc}")
    print(f"[status] {len(wis)} work item(s), chain verified"
          + (f", {bad} TAMPERED" if bad else ""))
    for wi in wis:
        print(f"  {wi:20s} {state_of(cfg, wi):12s} reworks={rework_count(cfg, wi)}")
    return C.EXIT_TAMPER if bad else C.EXIT_OK
