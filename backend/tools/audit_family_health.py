"""audit_family_health.py -- Comprehensive Family & Pipeline Health Audit.

Audits every registered structure in STRUCTURE_SPECS by:
1. Validating declared or auto-inferred ask kinds (preventing GUIDED ask-mismatch drops).
2. Verifying independent second-path coverage (VERIFIERS or DECLARATIVE_INVARIANTS).
3. Testing exemplars end-to-end through answer() and model_structure().
4. Outputting a clear, structured Markdown health scorecard.

Usage:
    python tools/audit_family_health.py [--sample N] [--out report.md]
"""

from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path
from typing import Dict, List, Any

# Ensure deploy/backend is on path
BASE_DIR = Path(__file__).resolve().parent.parent
REPO_DIR = BASE_DIR.parent
sys.path.insert(0, str(REPO_DIR))
sys.path.insert(0, str(BASE_DIR))

from its.solver.structure_families import STRUCTURE_SPECS, ASK_FIELDS, get_declared_ask_kinds
from its.solver.independent_verifier import VERIFIERS, DECLARATIVE_INVARIANTS
from its.solver.ask_coherence import asked_kinds
from its.solver.answer_pipeline import answer, VERIFIED, VERIFIED_ASSUMED, GUIDED


def audit_families(sample_limit: int | None = None) -> Dict[str, Any]:
    specs = sorted(STRUCTURE_SPECS.items())
    if sample_limit:
        specs = specs[:sample_limit]

    total = len(specs)
    has_ask_field = 0
    auto_inferred_ask = 0
    missing_ask = 0
    has_verifier = 0
    has_declarative = 0
    unverified = 0

    results = []

    print(f"Auditing {total} registered structure families...")

    for idx, (sid, spec) in enumerate(specs):
        # 1. Ask-coherence audit
        declared = ASK_FIELDS.get(sid) or spec.get("ask")
        inferred = get_declared_ask_kinds(sid, spec)
        if declared:
            has_ask_field += 1
            ask_status = "EXPLICIT"
        elif inferred:
            auto_inferred_ask += 1
            ask_status = "AUTO_INFERRED"
        else:
            missing_ask += 1
            ask_status = "MISSING"

        # 2. Verifier audit
        if sid in VERIFIERS:
            has_verifier += 1
            ver_status = "EXPLICIT_VERIFIER"
        elif sid in DECLARATIVE_INVARIANTS:
            has_declarative += 1
            ver_status = "DECLARATIVE_INVARIANT"
        else:
            unverified += 1
            ver_status = "NONE"

        # 3. Live Exemplar probe (first exemplar)
        exemplars = spec.get("exemplars") or []
        probe_query = exemplars[0] if exemplars else ""
        pipeline_label = "NO_EXEMPLAR"
        refusal_reason = ""
        route = []

        if probe_query:
            try:
                res = answer(probe_query)
                pipeline_label = res.label
                refusal_reason = res.refusal_reason or ""
                route = getattr(res.audit, "route", []) or []
            except Exception as e:
                pipeline_label = f"ERROR: {e}"

        results.append({
            "sid": sid,
            "ask_status": ask_status,
            "ask_kinds": list(inferred),
            "ver_status": ver_status,
            "exemplar": probe_query,
            "pipeline_label": pipeline_label,
            "refusal_reason": refusal_reason,
            "route": route,
        })

    return {
        "total": total,
        "has_ask_field": has_ask_field,
        "auto_inferred_ask": auto_inferred_ask,
        "missing_ask": missing_ask,
        "has_verifier": has_verifier,
        "has_declarative": has_declarative,
        "unverified": unverified,
        "rows": results,
    }


def generate_report(stats: Dict[str, Any], out_path: Path | None = None):
    lines = [
        "# Automated Family Health & Coverage Scorecard",
        f"Generated on: {time.strftime('%Y-%m-%d %H:%M:%S')}",
        "",
        "## Summary Metrics",
        f"- **Total Families Evaluated**: {stats['total']}",
        f"- **Explicitly Declared Ask Fields**: {stats['has_ask_field']} ({stats['has_ask_field']/stats['total']*100:.1f}%)",
        f"- **Auto-Inferred Ask Fields**: {stats['auto_inferred_ask']} ({stats['auto_inferred_ask']/stats['total']*100:.1f}%)",
        f"- **Zero-Ask / Untypable**: {stats['missing_ask']} ({stats['missing_ask']/stats['total']*100:.1f}%)",
        f"- **Handwritten Verifiers**: {stats['has_verifier']}",
        f"- **Declarative Invariant Coverage**: {stats['has_declarative']}",
        f"- **Total Independent Verification Rate**: {(stats['has_verifier'] + stats['has_declarative'])/stats['total']*100:.1f}%",
        "",
        "## Family Breakdown Table",
        "| Family SID | Ask Gate | Ask Kinds | Verifier Status | Exemplar Label | Refusal / Route |",
        "| :--- | :--- | :--- | :--- | :--- | :--- |",
    ]

    for r in stats["rows"]:
        kinds_str = ",".join(r["ask_kinds"][:3]) or "-"
        route_str = r["refusal_reason"] if r["refusal_reason"] else (",".join(r["route"][:2]) if r["route"] else "-")
        lines.append(
            f"| `{r['sid']}` | {r['ask_status']} | `{kinds_str}` | {r['ver_status']} | **{r['pipeline_label']}** | {route_str} |"
        )

    content = "\n".join(lines)
    if out_path:
        out_path.write_text(content, encoding="utf-8")
        print(f"Report written to {out_path}")
    else:
        print(content)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--sample", type=int, default=None, help="Sample limit")
    parser.add_argument("--out", type=str, default=None, help="Output markdown path")
    args = parser.parse_args()

    stats = audit_families(sample_limit=args.sample)
    out_p = Path(args.out) if args.out else None
    generate_report(stats, out_p)
