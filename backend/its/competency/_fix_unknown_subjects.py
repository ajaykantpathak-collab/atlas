"""One-off fixer: set correct subject on class-11 catalogs that carry subject "unknown".

Book code -> subject map is derived from the NCERT text cache content
(D:/node_generator/ncert-mcp/data/processed/text_cache_new/<stem>.txt):
  kehb (Hornbill)                -> english
  kesp (Snapshot)                -> english
  keww (Woven Words)             -> english
  keks (English Language Skills) -> english
  kehe (Human Ecology & Family Sciences) -> home_science
  kepy (Psychology)              -> psychology
  kest (Statistics for Economics)-> economics

Only the "subject" field is written, and only on catalogs whose current
subject is empty/whitespace or the literal "unknown" (case-insensitive).
Files are re-dumped with ensure_ascii=False, indent=2 + trailing newline,
which matches the existing on-disk formatting exactly.
"""

import json
import os
import re
import sys

COMP_DIR = os.path.dirname(os.path.abspath(__file__))
CACHE_DIR = r"D:\node_generator\ncert-mcp\data\processed\text_cache_new"

SUBJECT_BY_BOOK = {
    "kehb": "english",
    "kesp": "english",
    "keww": "english",
    "keks": "english",
    "kehe": "home_science",
    "kepy": "psychology",
    "kest": "economics",
}

# Light content guard: each book code must show one of these markers in the
# first 1500 chars of its cache file, otherwise we refuse to write that file.
CONTENT_GUARD = {
    "kehb": r"hornbill|portrait of a lady|afraid to die|discovering tut|ailing planet|note-making|summarising|sub-titling|essay-writing|letter-writing|creative writing|silk road|the adventure",
    "kesp": r"summer of the|beautiful white horse|the address|marga minco|mother's day|priestley|melon city|cronin|birth",
    "keww": r"woven words|short stories|poetry|essays|lament|rocking-horse|garridebs|pappachi|lahiri|soyinka|wordsworth|keats|hughes|auden|kolatkar|russell|chandrasekhar|devy|tribal verse|patterns of creativity|nightingale|ruskin|mustachios|glory at twilight|luncheon|elkana|banyan|ajamil|three passions|good book|coming|telephone conversation|mother tongue|marriage of true minds",
    "keks": r"language|performing art|astronomy|yurveda|yoga|indian art|mathematics|alchemy|chemistry|metallurgy|earth|holistic health",
    "kehe": r"human ecology|family sciences|adolescence|fabrics|apparel|childhood|resources|communication technology|adulthood|care and maintenance|food, nutrition|understanding oneself|community and society",
    "kepy": r"psychology|methods of enquiry|human memory|motivation and emotion|sensory|learning|thinking|development",
    "kest": r"economics|collection of data|presentation of data|central tendency|index numbers|statistical tools|census|sampling|correlation|marshall",
}


def book_code(stem: str) -> str:
    m = re.match(r"^([a-z]+)", stem)
    return m.group(1) if m else ""


def main() -> int:
    fixed, skipped, rejected = [], [], []
    for fname in sorted(os.listdir(COMP_DIR)):
        if not (fname.startswith("catalog_") and fname.endswith(".json")):
            continue
        path = os.path.join(COMP_DIR, fname)
        with open(path, encoding="utf-8") as fh:
            data = json.load(fh)

        cur = str(data.get("subject", "")).strip().lower()
        if cur not in ("", "unknown", "none", "null"):
            continue  # already labelled; never touch

        stem = os.path.basename(str(data.get("source_file", ""))).strip()
        stem = re.sub(r"\.txt$", "", stem, flags=re.I)
        code = book_code(stem)
        target = SUBJECT_BY_BOOK.get(code)
        if target is None:
            rejected.append((fname, stem, "no book-code mapping"))
            continue

        cache_path = os.path.join(CACHE_DIR, stem + ".txt")
        if not os.path.exists(cache_path):
            rejected.append((fname, stem, "cache file missing"))
            continue
        with open(cache_path, encoding="utf-8", errors="replace") as fh:
            head = fh.read(1500)
        if not re.search(CONTENT_GUARD[code], head, re.I):
            rejected.append((fname, stem, f"content guard failed for {code}"))
            continue

        data["subject"] = target
        with open(path, "w", encoding="utf-8", newline="\n") as fh:
            json.dump(data, fh, ensure_ascii=False, indent=2)
            fh.write("\n")
        fixed.append((fname, cur or "<empty>", target, stem))

    print(f"FIXED {len(fixed)}")
    for fname, old, new, stem in fixed:
        print(f"  {fname} | {old} -> {new} | {stem}")
    if rejected:
        print(f"REJECTED {len(rejected)} (left untouched)")
        for fname, stem, why in rejected:
            print(f"  {fname} | {stem} | {why}")
    return 0 if not rejected else 1


if __name__ == "__main__":
    sys.exit(main())
