"""mine_openstax.py -- extract worked examples from OpenStax PDFs directly.

The HTML parse never finished (7/56 books); the PDFs are born-digital
with a clean text layer and a rigid 'EXAMPLE n.m / Solution / TRY IT'
structure, so fitz (PyMuPDF) extracts them in ~2-3 s per book.  This is
the fast path to the solved-example corpus (ARCHITECTURE.md 17.S1:
solutions compiled to anchor-verified IR via ms_compiler).

Output per book:  cbse_data/openstax_examples/<book>.json
    {"book": ..., "n_examples": N,
     "examples": [{"id": "8.2", "problem": ..., "solution": ...,
                   "ir": {...}|null, "anchor_verified": bool}]}

Usage:
    python -m backend.tools.mine_openstax                # priority maths/sci
    python -m backend.tools.mine_openstax --all          # every PDF found
"""

from __future__ import annotations

import argparse
import json
import re
import time
from pathlib import Path
from typing import Dict, List, Optional

import fitz

from backend.its.solver.ms_compiler import compile_chain

PDF_DIRS = [
    Path(r"D:\KnowledgeBase\OpenStax"),
    Path(r"D:\garbage\cisce\openstax"),
]
OUT_DIR = Path(r"D:\platform\cbse_data\openstax_examples")

# classes 6-12 core first; everything else with --all
_PRIORITY = ("prealgebra", "elementaryalgebra", "intermediatealgebra",
             "algebra", "collegealgebra", "precalculus", "calculus",
             "chemistry", "introductorystatistics", "statistics",
             "collegephysics", "physics", "principles-finance",
             "financial-accounting")

_EXAMPLE_RE = re.compile(r"EXAMPLE\s+(\d+\.\d+)", re.I)   # OP renditions
# use 'Example 3.5' title case; prealgebra uses 'EXAMPLE 1.11'
_SOLUTION_RE = re.compile(r"\bSolution\b")
_TRYIT_RE = re.compile(r"TRY IT\s*:{0,2}")
_FURNITURE = [
    re.compile(p, re.I)
    for p in (
        r"^This OpenStax book is available for free at .*$",
        r"^Access for free at .*$",
        r"^Chapter \d+ .*$",
        r"^\d{1,4}$",                      # bare page numbers
        r"^http(s)?://\S+$",
    )
]

_LICENSE_SAFE = "CC-BY-4.0"
_LICENSE_RESTRICTED = "CC-BY-NC-SA-DO-NOT-SHIP"


def license_of(pdf_path: Path) -> str:
    """License stated inside the PDF we actually hold.  Policy (ARCHI-
    TECTURE.md 18): the file's own notice governs use of that file."""
    pdf = fitz.open(str(pdf_path))
    head = "\n".join(pdf[p].get_text() for p in range(min(10,
                                                          pdf.page_count)))
    pdf.close()
    if re.search(r"[Nn]oncommercial|[Ss]hare[Aa]like", head):
        return _LICENSE_RESTRICTED
    return _LICENSE_SAFE


def _clean_line(line: str) -> bool:
    """False when the line is page furniture to drop."""
    s = line.strip()
    if not s:
        return False
    return not any(p.match(s) for p in _FURNITURE)


def extract_book(pdf_path: Path) -> List[Dict]:
    """All EXAMPLE blocks: id, problem statement, worked solution."""
    pdf = fitz.open(str(pdf_path))
    text = "\n".join(pdf[p].get_text() for p in range(pdf.page_count))
    pdf.close()

    lines = [ln for ln in text.split("\n")]
    marks: List[tuple] = []          # (line_index, example_id)
    for i, ln in enumerate(lines):
        m = _EXAMPLE_RE.search(ln)
        if m:
            marks.append((i, m.group(1)))
    if not marks:
        return []

    examples: List[Dict] = []
    for k, (i, ex_id) in enumerate(marks):
        end = marks[k + 1][0] if k + 1 < len(marks) else min(
            i + 80, len(lines))
        block: List[str] = []
        for ln in lines[i + 1:end]:
            if _TRYIT_RE.search(ln) or _EXAMPLE_RE.search(ln):
                break
            if _clean_line(ln):
                block.append(ln.strip())
        if not block:
            continue
        # problem = up to 'Solution'; solution = after it
        sol_at: Optional[int] = None
        for j, ln in enumerate(block):
            if _SOLUTION_RE.search(ln):
                sol_at = j
                break
        if sol_at is None:
            problem, solution = block, []
        else:
            problem, solution = block[:sol_at], block[sol_at + 1:]
        examples.append({
            "id": ex_id,
            "problem": " ".join(problem)[:800],
            "solution_lines": [s[:400] for s in solution[:60]],
        })
    return examples


def _compile_examples(examples: List[Dict]) -> List[Dict]:
    """Run the marking-scheme compiler over each solution."""
    for ex in examples:
        lines = ex["solution_lines"]
        if not any("=" in ln for ln in lines):
            ex["ir"], ex["anchor_verified"] = None, False
            continue
        try:
            ir, report = compile_chain(lines)
            ex["ir"] = ir.to_dict() if ir.steps else None
            ex["anchor_verified"] = bool(
                ir.anchor_value is not None and report.passed)
        except Exception:
            ex["ir"], ex["anchor_verified"] = None, False
    return examples


def _iter_pdfs(all_books: bool):
    seen = set()
    for d in PDF_DIRS:
        if not d.exists():
            continue
        for pdf in sorted(d.glob("*.pdf")):
            key = pdf.stem.lower()
            if key in seen:
                continue
            seen.add(key)
            if all_books or any(p in key for p in _PRIORITY):
                yield pdf


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--all", action="store_true",
                    help="extract every OpenStax PDF, not just priority")
    args = ap.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    totals = {"books": 0, "examples": 0, "with_solution": 0,
              "anchor_verified": 0}
    t0 = time.time()
    for pdf in _iter_pdfs(args.all):
        try:
            examples = extract_book(pdf)
        except Exception as exc:
            print(f"  !! {pdf.name}: {exc}")
            continue
        if not examples:
            continue
        examples = _compile_examples(examples)
        n_ver = sum(1 for e in examples if e["anchor_verified"])
        n_sol = sum(1 for e in examples if e["solution_lines"])
        license_tag = license_of(pdf)
        payload = {"book": pdf.stem, "n_examples": len(examples),
                   "n_anchor_verified": n_ver,
                   "license": license_tag, "examples": examples}
        if license_tag == _LICENSE_RESTRICTED:
            # structure only: IR is facts and methods (not copyrightable
            # expression); surface text from THIS file must never ship.
            for ex in payload["examples"]:
                ex.pop("problem", None)
                ex.pop("solution_lines", None)
            payload["surface_policy"] = "regenerate"
        (OUT_DIR / f"{pdf.stem}.json").write_text(
            json.dumps(payload, indent=1, ensure_ascii=True))
        totals["books"] += 1
        totals["examples"] += len(examples)
        totals["with_solution"] += n_sol
        totals["anchor_verified"] += n_ver
        print(f"  {pdf.stem:44s} {len(examples):5d} examples "
              f"{n_ver:5d} anchor-verified")
    totals["elapsed_s"] = round(time.time() - t0, 1)
    print(json.dumps(totals))
    (OUT_DIR / "_summary.json").write_text(json.dumps(totals, indent=2))


if __name__ == "__main__":
    main()
