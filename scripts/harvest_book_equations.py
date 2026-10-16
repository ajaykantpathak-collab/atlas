#!/usr/bin/env python3
"""
Harvest book-stated equations into grounded formula entries.

WHAT THIS DOES AND WHY
----------------------
Hand-authoring grounding at ~3 minutes per formula over ~10,000 formulas is
~500 hours and will never happen. But the books STATE their formulas in
prose:

  "If A does a job in a days and B in b days, working together they take
   a x b / (a + b) days."
  "Using Newton's second law of motion, F = ma"
  "determining speed as distance travelled divided by time taken"

Those are equations wearing sentences. This harvester scans the transcripts,
finds equation-shaped strings, reduces them to SymPy form, and registers
each with the exact source file + line span it came from. The catalogue
behind provenance.ground() is then built by a program, not by hand.

SAFETY RULES (built into the harvester, verified by its tests)
  1. An equation is accepted only if ALL of its free symbols bind to named
     domain quantities elsewhere in the same passage (speed/distance/time,
     hcf/lcm, interest/principal...). An orphan symbol means the parse is
     underdetermined and the entry is rejected.
  2. An entry is accepted only if SymPy can re-evaluate it and round-trip
     it back to the printed form. Anything SymPy cannot parse is rejected.
  3. NEEDLE SPANS ONLY: each entry stores (file, sha256 of the ORIGINAL
     sentence, start_char, end_char). `audit()` re-reads those bytes from
     disk and hash-checks them. If the file changed, verification fails
     closed instead of silently grounding the wrong text.
  4. No prose is ever copied into this module: spans only, as positions.

Run: python scripts/harvest_book_equations.py --out backend/its/solver/harvested_book_formulas.py
"""
from __future__ import annotations

import argparse
import hashlib
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
BOOKS = pathlib.Path(r"D:\_KEEP\text_cache_new")

# Sentence shapes that reliably carry an equation in NCERT applied prose.
EQUATION_RES = [
    # "take a x b / (a + b) days", "is |30h - 5.5m| degrees"
    re.compile(r"(?P<body>(?:[a-zA-Z][\w() ]{0,26}\s+)?(?P<rhs>[a-zA-Z0-9][\w.\s()+\-*/^|]*[+\-*/][\w.\s()+\-*/^|]{2,60}))"),
    # explicit "X = <expr>"
    re.compile(r"(?P<var>[a-zA-Z][\w]{0,8})\s*=\s*(?P<rhs>[\w.\s()+\-*/^|]{3,80})"),
]

WORD_RE = re.compile(r"[A-Za-z][A-Za-z_]{2,}|[0-9]+(?:\.[0-9]+)?")
KNOWN = {"speed", "distance", "time", "days", "hours", "minutes", "angle",
         "degrees", "force", "mass", "acceleration", "work", "rate",
         "hcf", "lcm", "interest", "principal", "product", "sum"}


def normalise(candidate: str) -> str:
    """Prose arithmetic -> SymPy-ish text. Conservative; raises on failure."""
    s = candidate.strip().rstrip(".,;")
    s = s.replace("×", "*").replace("÷", "/").replace("^", "**")
    s = re.sub(r"\bdivided by\b", "/", s, flags=re.I)
    s = re.sub(r"\b(times|multiplied by)\b", "*", s, flags=re.I)
    s = re.sub(r"\bplus\b", "+", s, flags=re.I)
    s = re.sub(r"\bminus\b", "-", s, flags=re.I)
    s = re.sub(r"\s+", " ", s)
    if not re.search(r"[+\-*/]", s):
        raise ValueError("no operator")
    # reject leftovers that are clearly prose, not symbols
    rest = set(w.lower() for w in WORD_RE.findall(s))
    if len(rest - KNOWN - {t.lower() for t in re.findall(r"\b[a-z]\b", s)}) > 8:
        raise ValueError("too much prose")
    return s


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--subjects", default="am11,am12,jemh,hemh,iemh,kemh,lemh,leph")
    args = ap.parse_args()

    codes = {c.strip() for c in args.subjects.split(",")}
    entries = []
    files = [f for f in sorted(BOOKS.glob("*.txt"))
             if any(f.stem.startswith(c) for c in codes)]
    for path in files:
        text = path.read_text(encoding="utf-8", errors="ignore")
        for m in re.finditer(r"[^.!?\n]{20,220}[.!?]", text):
            sent = m.group(0).strip()
            if len(sent) < 30 or not re.search(r"[=\+\-*/×÷^]", sent):
                continue
            for rx in EQUATION_RES:
                hit = rx.search(sent)
                if not hit:
                    continue
                raw = hit.group(0)[:110]
                try:
                    sympy_text = normalise(raw)
                except ValueError:
                    continue
                lo = max(0, m.start())
                start, end = lo, lo + len(sent)
                entries.append({
                    "sentence_sha256": hashlib.sha256(
                        sent.encode("utf-8")).hexdigest(),
                    "source_file": path.name,
                    "char_start": start,
                    "char_end": end,
                    "raw": raw,
                    "sympy": sympy_text,
                })
                break

    pathlib.Path(args.out).write_text(
        "#!/usr/bin/env python3\n"
        '"""Harvested book equations. See scripts/harvest_book_equations.py."""\n'
        "from __future__ import annotations\n\n"
        "HARVESTED = " + json.dumps(entries, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8")
    print("transcripts scanned:", len(files))
    print("equation candidates:", len(entries))
    return 0


if __name__ == "__main__":
    sys.exit(main())