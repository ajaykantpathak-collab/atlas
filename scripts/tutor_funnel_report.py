#!/usr/bin/env python3
"""
Aggregate tutor funnel telemetry into a hit-rate report.

Every deterministic layer in `TutorService.quick_question` already returns a
`method` field (pattern_solver, compute, template, multistep, routing,
fallback). `backend/routers/tutor.py` logs it as a structured event with
`LOG_FORMAT=json`. This script turns that stream into the one number that
matters: **what fraction of student questions reached a paid LLM.**

    deterministic = pattern_solver | compute | template | multistep
    concept       = routing
    paid          = llm / llm_bridge / anything else

Usage:
    python scripts/tutor_funnel_report.py --log backend.log
    cat app.log | python scripts/tutor_funnel_report.py
Exit 1 if no funnel events are found (usually means the server predates the
telemetry change, or logs are not JSON).
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from pathlib import Path

DETERMINISTIC = {"pattern_solver", "compute", "template", "multistep",
                 "pattern_solver_missing", "orchestrator", "template_reuse"}
CONCEPT = {"routing", "graph_rag", "teaching_context"}
PAID = {"llm", "llm_bridge", "llm_fallback"}


def classify(method: str) -> str:
    m = (method or "").lower()
    if m in DETERMINISTIC:
        return "deterministic"
    if m in CONCEPT:
        return "concept"
    if m in PAID:
        return "paid_llm"
    return "other"


def read_events(path: str | None):
    if path:
        text = Path(path).read_text(encoding="utf-8", errors="ignore")
    else:
        text = sys.stdin.read()
    for line in text.splitlines():
        line = line.strip()
        if not line.startswith("{"):
            continue
        try:
            yield json.loads(line)
        except json.JSONDecodeError:
            continue


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--log", help="log file; omit to read stdin")
    args = ap.parse_args()

    by_method: Counter[str] = Counter()
    by_tier: Counter[str] = Counter()
    by_type: Counter[str] = Counter()
    total = 0

    for event in read_events(args.log):
        if "tutor_method" not in event:
            continue
        total += 1
        method = str(event.get("tutor_method", ""))
        by_method[method] += 1
        by_tier[classify(method)] += 1
        by_type[str(event.get("tutor_type", "?"))] += 1

    if total == 0:
        print(
            "No funnel events found.\n"
            "  - Are logs JSON? (needs LOG_FORMAT=json)\n"
            "  - Does the server include the telemetry change in routers/tutor.py?\n"
            "  - Try: docker logs <container> 2>&1 | python scripts/tutor_funnel_report.py"
        )
        return 1

    print(f"questions seen: {total}\n")
    print("BY LAYER (method):")
    for m, c in by_method.most_common():
        print(f"  {c:>6}  {100 * c / total:5.1f}%  {m}")

    print("\nBY COST TIER:")
    for tier in ("deterministic", "concept", "other", "paid_llm"):
        c = by_tier.get(tier, 0)
        print(f"  {c:>6}  {100 * c / total:5.1f}%  {tier}")

    paid = by_tier.get("paid_llm", 0)
    free = total - paid
    print(
        f"\n{100 * free / total:.1f}% answered with no paid LLM call."
        f"  ({paid} question(s) went paid.)"
    )
    if paid == 0:
        print("  -> The deterministic funnel is absorbing everything. Well done.")
    else:
        top = by_tier.most_common()
        print("  -> Biggest paid sources above; each one is a coverage gap.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
