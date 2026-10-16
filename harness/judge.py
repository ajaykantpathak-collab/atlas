"""judge.py — builder/judge separation (§8). Builds the judge brief from the
receipt chain; a FRESH-CONTEXT agent (no shared history with the builder)
receives only: the plan, the diffs, the gate logs, and the §8 protocol."""
from __future__ import annotations

import difflib
import json
from pathlib import Path
from typing import Any, Dict, List, Optional

import common as C

PROTOCOL = """
## Judge protocol (verbatim §8 of the operating prompt)

The agent that wrote the patch never grades it. You must, independently:

1. Re-run G5 in full and at least one behavioral gate (G1 or G6) yourself.
2. Check the diff for: banned phrases ("should work", unexplained
   TODO/FIXME), claims in the plan not backed by a log, pin changes,
   scope creep beyond the plan's file list.
3. Emit harness/receipts/<WI>/judge_verdict.json:

{"work_item": "<WI>", "verdict": "PASS|FAIL",
 "independent_reruns": [{"gate": "G5", "exit": 0}],
 "issues": [{"severity": "blocker|major|minor", "desc": "...",
             "evidence": "file:line or log path"}],
 "ts_utc": "..."}

FAIL -> the builder returns to REWORK with your issue list attached. The
builder may not argue issues away; it may only return new evidence. Two
consecutive FAIL verdicts -> FAILED.
"""


def _plan_receipt(cfg: Dict[str, Any], wi: str) -> Dict[str, Any]:
    import runner as R
    for p in R.receipts_of(cfg, wi):
        doc = json.loads(p.read_text(encoding="utf-8"))
        if doc.get("to_state") == "PLAN":
            return doc
    raise FileNotFoundError(f"{wi}: no PLAN receipt")


def _diffs(cfg: Dict[str, Any], wi: str, files: List[str]) -> str:
    snap = C.cfg_path(cfg, "snapshots") / wi / "manifest.json"
    blobs = {}
    if snap.exists():
        for e in json.loads(snap.read_text(encoding="utf-8"))["files"]:
            if e.get("blob"):
                blobs[e["path"]] = C.cfg_path(cfg, "snapshots") / wi / e["blob"]
    out = []
    for rel in files:
        cur = C.ROOT / rel
        new_text = cur.read_text(encoding="utf-8", errors="replace") \
            if cur.exists() else "(missing)"
        blob = blobs.get(rel)
        old_text = "(new file — no pre-change blob)" if blob is None else \
            blob.read_text(encoding="utf-8", errors="replace")
        diff = difflib.unified_diff(
            old_text.splitlines(), new_text.splitlines(),
            fromfile=f"a/{rel}", tofile=f"b/{rel}", lineterm="")
        out.append("\n".join(diff))
    return "\n\n".join(out)


def build_brief(cfg: Dict[str, Any], wi: str) -> Path:
    import runner as R
    plan_doc = _plan_receipt(cfg, wi)
    files = plan_doc["evidence"]["files_in_scope"]
    verify = None
    for p in R.receipts_of(cfg, wi):
        doc = json.loads(p.read_text(encoding="utf-8"))
        if doc.get("to_state") == "VERIFY":
            verify = doc
    lines = [f"# Judge brief — {wi}", "",
             f"Fresh-context judge. You did NOT build this change.", PROTOCOL,
             "## The plan", "",
             "```json",
             json.dumps(plan_doc.get("evidence", {}), indent=1,
                        ensure_ascii=False), "```", "",
             "## The plan document", "",
             "```markdown",
             (R.wi_dir(cfg, wi) / "plan.md").read_text(encoding="utf-8"),
             "```", "",
             "## The diffs", "", "```diff", _diffs(cfg, wi, files), "```", ""]
    if verify:
        lines += ["## The gate results (latest VERIFY receipt)", "",
                  "```json",
                  json.dumps(verify.get("gates", []), indent=1), "```", "",
                  "Gate logs live under the paths in each gate entry "
                  "(relative to D:\\platform); read them."]
    else:
        lines += ["## The gate results", "",
                  "(no VERIFY receipt yet — judge after verify)"]
    lines += ["", "## Your output", "",
              f"Write `harness/receipts/{wi}/judge_verdict.json` using the "
              "schema above, then hand it back to the coordinator."]
    path = R.wi_dir(cfg, wi) / "judge_brief.md"
    path.write_text("\n".join(lines), encoding="utf-8")
    return path


def validate_verdict(v: Dict[str, Any], wi: str) -> None:
    if v.get("verdict") not in ("PASS", "FAIL"):
        raise ValueError("verdict must be PASS or FAIL")
    if v.get("work_item") != wi:
        raise ValueError(f"verdict names {v.get('work_item')}, expected {wi}")
    if not (isinstance(v.get("independent_reruns"), list)
            and v["independent_reruns"]):
        raise ValueError("verdict must record independent_reruns (§8)")
    if not v.get("ts_utc"):
        raise ValueError("verdict must carry ts_utc")
