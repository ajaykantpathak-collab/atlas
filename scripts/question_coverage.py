#!/usr/bin/env python3
"""
Deterministic-coverage counter for the question corpus.

WHY
---
Every concept in the corpus carries two fields:

    solution_type        e.g. "compute"  — what KIND of answer it has
    converted_to_compute true/false     — whether a deterministic solver
                                          actually exists for it

`converted_to_compute` is the honest progress bar for "how much of this app can
answer without an LLM". Measured on 2026-09-27 across 12 catalogs / 113 concepts
it was **0% true against 100% tagged `compute`** — the metadata that tracks the
work already exists and nothing had been ticked off. Without a counter, the
backlog is invisible and unprioritisable.

This is the same number the tutor funnel telemetry reports at runtime
(scripts/tutor_funnel_report.py). This one is static and build-time; that one is
what production traffic actually did. They should agree.

Usage:
    python scripts/question_coverage.py                 # full scan
    python scripts/question_coverage.py --limit 200     # quick sample
    python scripts/question_coverage.py --json          # CI output
    python scripts/question_coverage.py --fail-under 40 # gate a target
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUESTIONS = ROOT / "backend" / "its" / "questions"


def parse_subject(path: Path) -> str:
    """catalog_class9_maths_ch101.json -> class9_maths

    Drops the leading `catalog` and the chapter suffix. The previous version
    returned "catalog_class9" for every file, which made the work queue
    impossible to prioritise by subject.
    """
    parts = path.stem.split("_")
    if parts and parts[0] == "catalog":
        parts = parts[1:]
    return "_".join(parts[:2]) or path.stem


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0, help="only read N files (0 = all)")
    ap.add_argument("--json", action="store_true", dest="as_json")
    ap.add_argument("--fail-under", type=float, default=None,
                    help="exit 1 if coverage%% is below this")
    args = ap.parse_args()

    if not QUESTIONS.is_dir():
        print(f"corpus not found: {QUESTIONS}", file=sys.stderr)
        return 2

    files = sorted(QUESTIONS.rglob("catalog_*.json"))
    if args.limit:
        files = files[: args.limit]
    if not files:
        files = sorted(QUESTIONS.rglob("*.json"))
        if args.limit:
            files = files[: args.limit]

    concepts = 0
    questions = 0
    has_solution_type = 0
    missing_type = 0
    has_converted_flag = 0
    missing_converted_flag = 0
    by_type: Counter[str] = Counter()
    converted = 0
    computable = 0
    by_subject: dict[str, dict] = defaultdict(
        lambda: {"concepts": 0, "computable": 0, "converted": 0, "questions": 0}
    )
    queue: list[tuple[int, str, str]] = []
    unreadable = 0

    for path in files:
        try:
            data = json.loads(path.read_text(encoding="utf-8", errors="ignore"))
        except (json.JSONDecodeError, OSError):
            unreadable += 1
            continue
        subject = parse_subject(path)
        for concept in data.get("concepts", []) or []:
            concepts += 1
            has_type = "solution_type" in concept
            has_flag = "converted_to_compute" in concept
            if has_type:
                has_solution_type += 1
            else:
                missing_type += 1
            if has_flag:
                has_converted_flag += 1
            else:
                missing_converted_flag += 1
            stype = str(concept.get("solution_type", "unknown"))
            is_computable = stype == "compute"
            is_converted = concept.get("converted_to_compute") is True
            by_type[stype] += 1
            n_q = len(concept.get("questions", []) or [])
            questions += n_q
            b = by_subject[subject]
            b["concepts"] += 1
            b["questions"] += n_q
            if is_computable:
                computable += 1
                b["computable"] += 1
            if is_converted:
                converted += 1
                b["converted"] += 1
            elif is_computable and n_q:
                # Work queue: unconverted but tagged compute, most questions first.
                queue.append((n_q, subject, str(concept.get("id", "?"))))

    coverage = (100.0 * converted / computable) if computable else 0.0

    if args.as_json:
        print(json.dumps({
            "files": len(files),
            "concepts": concepts,
            "questions": questions,
            "computable_concepts": computable,
            "converted_concepts": converted,
            "coverage_pct": round(coverage, 2),
            "by_solution_type": dict(by_type),
            "unreadable_files": unreadable,
            "queue_size": len(queue),
        }, indent=2))
    else:
        print(f"files scanned      : {len(files)}  ({unreadable} unreadable)")
        print(f"concepts           : {concepts}")
        print(f"questions          : {questions}")
        print(f"\nSCHEMA (this is the blocker):")
        print(f"  has 'solution_type'        : {has_solution_type} "
              f"({100*has_solution_type/concepts if concepts else 0:.1f}%)")
        print(f"  MISSING 'solution_type'   : {missing_type}")
        print(f"  has 'converted_to_compute': {has_converted_flag} "
              f"({100*has_converted_flag/concepts if concepts else 0:.1f}%)")
        print(f"  MISSING 'converted...'   : {missing_converted_flag}")
        if missing_type or missing_converted_flag:
            print("\n  -> Coverage cannot be tracked until BOTH fields exist on every")
            print("     concept. Right now a concept with no metadata is invisible to")
            print("     this counter AND to anyone planning the solver backlog.")
        print(f"\ntagged 'compute'   : {computable}")
        print(f"converted (solved) : {converted}")
        print(f"DETERMINISTIC COVERAGE: {coverage:.1f}%  "
              f"({converted}/{computable} compute-tagged concepts)")
        print("\nBY SOLUTION TYPE:")
        for t, c in by_type.most_common(10):
            print(f"  {c:>6}  {t}")
        if queue:
            print(f"\nWORK QUEUE (unconverted, compute-tagged): {len(queue)} concepts")
            print("  most questions first:")
            for n, subject, cid in sorted(queue, reverse=True)[:10]:
                print(f"    {n:>4} q  {subject:<22} {cid}")
            # Which subjects owe the most? Each entry is a small deterministic
            # template; subjects whose answers are prose need retrieval, not
            # solving, and should NOT be in this queue.
            owed = Counter()
            for subject, info in by_subject.items():
                gap = info["computable"] - info["converted"]
                if gap > 0:
                    owed[subject] = gap
            print("\n  unconverted compute-tagged concepts BY SUBJECT:")
            for subject, gap in owed.most_common(14):
                print(f"    {gap:>5}  {subject}")
        else:
            print("\nWORK QUEUE: empty — every compute-tagged concept is converted.")

    if args.fail_under is not None and coverage < args.fail_under:
        print(f"\nFAIL: coverage {coverage:.1f}% is below the required "
              f"{args.fail_under:.1f}%", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
