"""mine_tryits.py -- extract OpenStax TRY IT practice blocks as Lane C
binding prompts.

Try-Its are the practice twins of worked examples (2-4x their volume)
but ship WITHOUT solutions in the PDF (answers are an online
supplement).  So they cannot be anchor-verified chains -- instead they
become Lane C items: the student binds the numbers to roles, the
binding executor computes and verifies (the escrow contract holds:
nothing is shown as verified until computed from a confirmed binding).

License policy identical to mine_openstax: restricted renditions are
scrubbed to ids only; CC-BY keeps the question text with attribution.

Output: cbse_data/openstax_tryits/<book>.json
"""

from __future__ import annotations

import json
import re
import time
from pathlib import Path
from typing import Dict, List

import fitz

from backend.tools.mine_openstax import PDF_DIRS, license_of

OUT_DIR = Path(r"D:\platform\cbse_data\openstax_tryits")

_TRYIT_RE = re.compile(r"TRY IT\s*:\s*:\s*(\d+\.\d+)")
_FURNITURE = [re.compile(p, re.I) for p in (
    r"^This OpenStax book is available for free at .*$",
    r"^Access for free at .*$",
    r"^Chapter \d+ .*$",
    r"^\d{1,4}$",
    r"^http(s)?://\S+$",
)]


def _clean(line: str) -> bool:
    s = line.strip()
    return bool(s) and not any(p.match(s) for p in _FURNITURE)


def extract_tryits(pdf_path: Path) -> List[Dict]:
    pdf = fitz.open(str(pdf_path))
    text = "\n".join(pdf[p].get_text() for p in range(pdf.page_count))
    pdf.close()
    lines = text.split("\n")
    marks = []
    for i, ln in enumerate(lines):
        m = _TRYIT_RE.search(ln)
        if m:
            marks.append((i, m.group(1)))
    out: List[Dict] = []
    for k, (i, tid) in enumerate(marks):
        end = marks[k + 1][0] if k + 1 < len(marks) else min(i + 30,
                                                             len(lines))
        block = []
        for ln in lines[i + 1:end]:
            if _TRYIT_RE.search(ln) or re.search(r"EXAMPLE\s+\d+\.\d+", ln,
                                                 re.I):
                break
            if _clean(ln):
                block.append(ln.strip())
        q = " ".join(block)[:500].strip()
        if len(q) > 20:
            out.append({"id": tid, "question": q})
    return out


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    totals = {"books": 0, "tryits": 0}
    t0 = time.time()
    seen = set()
    for d in PDF_DIRS:
        if not d.exists():
            continue
        for pdf_path in sorted(d.glob("*.pdf")):
            key = pdf_path.stem.lower()
            if key in seen:
                continue
            seen.add(key)
            try:
                items = extract_tryits(pdf_path)
            except Exception as exc:
                print(f"  !! {pdf_path.name}: {exc}")
                continue
            if not items:
                continue
            lic = license_of(pdf_path)
            payload = {"book": pdf_path.stem, "n_tryits": len(items),
                       "license": lic, "tryits": items}
            if lic != "CC-BY-4.0":
                for it in payload["tryits"]:
                    it.pop("question", None)
                payload["surface_policy"] = "regenerate"
            (OUT_DIR / f"{pdf_path.stem}.json").write_text(
                json.dumps(payload, indent=1, ensure_ascii=True))
            totals["books"] += 1
            totals["tryits"] += len(items)
            print(f"  {pdf_path.stem:44s} {len(items):5d} tryits [{lic[:8]}]")
    totals["elapsed_s"] = round(time.time() - t0, 1)
    print(json.dumps(totals))
    (OUT_DIR / "_summary.json").write_text(json.dumps(totals, indent=2))


if __name__ == "__main__":
    main()
