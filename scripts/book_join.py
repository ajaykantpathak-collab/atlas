#!/usr/bin/env python3
"""
BOOK-GROUNDED PIPELINE, stage 1: concept -> transcript index.

WHY
---
The 2,427 unlabelled catalogue concepts have no stored formula, and their
answers were written by an unverified LLM. D:\\_KEEP\\text_cache_new holds the
source BOOK TRANSCRIPTS, keyed by the SAME codes as the catalogue concept ids
(am11_007 -> am11_007_math_logical_reasoning.txt, jemh -> jemh101..jemh114.txt).
The books state their formulas explicitly, e.g.
    "If A does a job in a days and B in b days, working together they take
     a x b / (a + b) days."
so they are usable ground truth.

This stage is fully deterministic: no model, no guessing. It answers
"which concepts can be grounded in a source at all?" before any extraction.

Usage:
  python scripts/book_join.py               # index + coverage report
  python scripts/book_join.py --write       # also emit book_index.json
"""
from __future__ import annotations

import argparse
import collections
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CORPUS = ROOT / "backend" / "its" / "questions"
# SOURCES, in priority order.
#   text_cache_new      : book transcripts, coded am11_*/am12_*/jemh*/lemh*/...
#   enhanced_nodes_md   : 13,487 per-node markdown files whose FILENAMES are the
#                         node ids themselves (c10_math_cbse_01_001.md). The
#                         `enh:` catalogue ids strip the prefix straight onto
#                         these names -- no registry lookup needed, which is
#                         what I wrongly spent a cycle trying to build.
BOOKS = pathlib.Path(r"D:\_KEEP\text_cache_new")
NODE_MD = pathlib.Path(r"D:\_KEEP\enhanced_nodes_md")

# A transcript filename is <code>[_<topic>].txt.  Codes look like
# am11_007 / jemh103 / fegp101 and may carry a trailing topic slug.
#
# ORDER IS LOAD-BEARING: the longer `\\w+_\\d{3}` form must be tried FIRST.
# With the short form first, "am11_001_numbers_quantification" matched code
# "am11" and dumped "001_numbers_quantification" into the topic, so the code
# never matched the concept prefix am11_001 -- 1,049 concepts were reported
# ungrounded when their transcript was sitting right there.
NAME_RE = re.compile(r"^(\w{2,5}_\d{3}[a-z]?|[a-z]{2,5}\d{2,3}[a-z]?)(?:_(.*))?$",
                     re.I)


def book_codes() -> "dict[str, dict]":
    """code -> {path, topic, size} for every readable transcript."""
    out: "dict[str, dict]" = {}
    for f in sorted(BOOKS.rglob("*.txt")):
        try:
            size = f.stat().st_size
        except OSError:
            continue
        base = f.stem
        m = NAME_RE.match(base)
        code = (m.group(1) if m else base).lower()
        topic = (m.group(2) or "").replace("_", " ").strip() if m else ""
        # First writer wins per code; keep the largest if duplicated.
        if code not in out or size > out[code]["size"]:
            out[code] = {"path": str(f), "topic": topic, "size": size,
                         "name": f.name}
    return out


def node_md_index() -> "dict[str, dict]":
    """stem -> {path,size} for every per-node markdown file. The stem IS the
    node id (c10_math_cbse_01_001), which is what `enh:` ids strip onto."""
    out: "dict[str, dict]" = {}
    if not NODE_MD.exists():
        return out
    for f in NODE_MD.rglob("*"):
        if f.is_file() and f.suffix.lower() in (".md", ".txt"):
            try:
                size = f.stat().st_size
            except OSError:
                continue
            out[f.stem.lower()] = {"path": str(f), "size": size, "name": f.name}
    return out


def concept_prefix(cid: str) -> str:
    return cid.split(".")[0].lower() if "." in cid else cid.lower()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true")
    ap.add_argument("--out", default=str(ROOT / "scripts" / "book_index.json"))
    args = ap.parse_args()

    codes = book_codes()
    nmd = node_md_index()
    print("=" * 70)
    print("SOURCE INDEX")
    print("=" * 70)
    print("transcript codes (text_cache_new) :", len(codes))
    print("per-node markdown (enhanced_nodes_md):", len(nmd))
    empty = [c for c, v in codes.items() if v["size"] == 0]
    print("empty transcript (0 bytes)        :", len(empty))

    concepts = []
    for p in sorted(CORPUS.rglob("*.json")):
        if "math" not in p.name.lower():
            continue
        try:
            d = json.loads(p.read_text(encoding="utf-8"))
        except Exception:
            continue
        for c in d.get("concepts", []):
            qs = [str(q["q"]) for q in (c.get("questions") or []) if q.get("q")]
            if not qs:
                continue
            concepts.append({"id": str(c.get("id", "")),
                             "family": c.get("family"),
                             "qq": qs, "nq": len(qs)})

    by_pref = collections.defaultdict(list)
    for c in concepts:
        by_pref[concept_prefix(c["id"])].append(c)

    def source_for(cid: str):
        """Resolve a concept id to its source file. Transctipt code match
        first, then the per-node markdown whose stem is the bare id."""
        bare = cid.replace("enh:", "").lower()
        if bare in nmd:
            return nmd[bare]
        pref = concept_prefix(cid)
        hit = next((codes[k] for k in sorted(codes) if k.startswith(pref)), None)
        return hit

    grounded = ungrounded = 0
    sized = []
    for pref, items in by_pref.items():
        if any(source_for(c["id"]) for c in items):
            grounded += len(items)
            sized.append((pref, len(items)))
        else:
            ungrounded += len(items)

    total = grounded + ungrounded
    print()
    print("=" * 70)
    print("CONCEPT -> BOOK GROUNDING")
    print("=" * 70)
    print("catalogue concepts (maths) :", total)
    print("grounded in a transcript   : %d  (%.1f%%)" % (
        grounded, grounded / max(1, total) * 100))
    print("NO source available        : %d  (%.1f%%)" % (
        ungrounded, ungrounded / max(1, total) * 100))
    print("distinct prefixes          :", len(by_pref))
    print("prefixes with a transcript :", len(sized))
    print()
    print("best-covered prefixes (concepts):")
    sized.sort(key=lambda t: -t[1])
    for pref, n in sized[:15]:
        print("   %-14s %4d concepts" % (pref, n))
    print()
    miss = sorted(p for p in by_pref if not any(source_for(c["id"]) for c in by_pref[p]))
    print("prefixes with NO transcript (%d), top 20:" % len(miss))
    for p in miss[:20]:
        print("   %-14s %4d concepts" % (p, len(by_pref[p])))

    if args.write:
        rows = []
        for c in concepts:
            pref = concept_prefix(c["id"])
            hit = source_for(c["id"])
            rows.append({"id": c["id"], "prefix": pref,
                         "book": hit["path"] if hit else None,
                         "topic": (hit or {}).get("topic", ""),
                         "nq": c["nq"]})
        pathlib.Path(args.out).write_text(
            json.dumps(rows, indent=1, ensure_ascii=False), encoding="utf-8")
        print("\nwrote", args.out, "rows:", len(rows))
    return 0


if __name__ == "__main__":
    sys.exit(main())
