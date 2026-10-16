"""W6 worked-example marker normalizer — CISCE lane.

WORKED_EXAMPLE sections must carry the lane-canonical ALL-CAPS markers
(**PROBLEM:**, **SOLUTION...:**, **ANSWER:**, **WHY THIS METHOD:**).
119 files use title-case variants (**Problem:** etc). This tool normalises
marker tokens inside WORKED_EXAMPLE_* sections only; everything else is
byte-preserved (digest manifest + per-file backup).

Usage: python w6_normalize_we.py [--corpus DIR] [--dry-run]
"""

import argparse
import hashlib
import json
import os
import re
import shutil
from collections import Counter

DEFAULT_CORPUS = r"D:\platform\deploy\content\cisce_nodes_v2"
DEFAULT_BACKUP = r"D:\platform\deploy\backend\content_tools\wave2\backups\normalize"
FILE_RE = re.compile(r"^c1[12]_([a-z]+(?:_[a-z0-9]+)*?)_isc_(\d+)_(\d+)\.md$")
PARKED = {"eng", "eng_elec", "eng_mod", "hin"}
SEC_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)

# canonical replacements for marker tokens (case-insensitive source)
CANON = [
    (re.compile(r"\*\*\s*problem\s*:?\s*\*\*", re.I), "**PROBLEM:**"),
    (re.compile(r"\*\*\s*solution\s*\(([^)]*)\)\s*:?\s*\*\*", re.I),
     lambda m: f"**SOLUTION ({m.group(1).strip()}):**"),
    (re.compile(r"\*\*\s*solution\s*:?\s*\*\*", re.I), "**SOLUTION:**"),
    (re.compile(r"\*\*\s*answer\s*:?\s*\*\*", re.I), "**ANSWER:**"),
    (re.compile(r"\*\*\s*why this method\s*:?\s*\*\*", re.I), "**WHY THIS METHOD:**"),
    # unbolded markers at section start
    (re.compile(r"(\n|^)[ \t]*Problem:[ \t]*", re.I), r"\1**PROBLEM:** "),
    (re.compile(r"(\n|^)[ \t]*Solution:[ \t]*", re.I), r"\1**SOLUTION:** "),
    (re.compile(r"(\n|^)[ \t]*Answer:[ \t]*", re.I), r"\1**ANSWER:** "),
]


def parse_sections(text: str):
    ms = list(SEC_RE.finditer(text))
    out = []
    for i, m in enumerate(ms):
        end = ms[i + 1].start() if i + 1 < len(ms) else len(text)
        out.append([m.group(0), m.group(1), text[m.end():end]])
    return (text[: ms[0].start()] if ms else text), out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--backup", default=DEFAULT_BACKUP)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    files = touched = 0
    counts = Counter()
    manifest = []
    for fn in sorted(os.listdir(args.corpus)):
        m = FILE_RE.match(fn)
        if not m or m.group(1) in PARKED:
            continue
        path = os.path.join(args.corpus, fn)
        with open(path, encoding="utf-8") as f:
            original = f.read()
        pre, parts = parse_sections(original)
        changed = False
        for p in parts:
            if not p[1].startswith("WORKED_EXAMPLE"):
                continue
            body = p[2]
            new = body
            for rx, rep in CANON:
                new, k = rx.subn(rep, new)
                if k:
                    counts[getattr(rx, "pattern", "?")[:40]] += k
            if new != body:
                p[2] = new
                changed = True
        if not changed:
            continue
        new_text = pre + "".join(h + b for h, _n, b in parts)
        if not args.dry_run:
            bak = os.path.join(args.backup, fn)
            os.makedirs(os.path.dirname(bak), exist_ok=True)
            if not os.path.exists(bak):
                shutil.copy2(path, bak)
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(new_text)
        touched += 1
        manifest.append({
            "file": fn,
            "before_sha256": hashlib.sha256(original.encode("utf-8")).hexdigest(),
            "after_sha256": hashlib.sha256(new_text.encode("utf-8")).hexdigest(),
        })
    out = os.path.join(os.path.dirname(args.backup), "normalize_manifest.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump({"files_touched": touched, "dry_run": args.dry_run,
                   "files": manifest}, f, ensure_ascii=False, indent=1)
    print(f"files touched: {touched} (dry_run={args.dry_run})")
    for k, v in counts.most_common():
        print(f"  {v:>4}  {k}")


if __name__ == "__main__":
    main()
