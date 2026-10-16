"""gen_social_learnpaths.py -- SOCIAL-ALL batch build step (2026-10-07).

Fills the two learnpath gaps the batch owns, using the existing
services.learnpath_builder engine (scan_chapter) untouched:

  1. CBSE HISTORY c11-c12   -- the brief's gap: 85 + 141 lesson files in
     enhanced_nodes_md, no path JSONs.  Written into the SAME
     _cache/learnpaths/ dir as every other subject, and _index.json is
     MERGED (existing 180 rows preserved; same-name rows replaced) --
     never clobbered, per the SOCIAL_GOLDEN batch precedent.

  2. CISCE social lanes     -- zero CISCE learnpaths existed anywhere
     (DEFAULT_CORPUS_ROOT is the CBSE corpus only).  histciv c6-c10
     (ICSE combined book), hist c11-c12 (ISC), geo c6-c12, econ c9-c12
     are generated from cisce_nodes_v2 into a SEPARATE
     _cache/learnpaths_cisce/ dir (get_path() takes cache_dir; a
     separate dir keeps board artifacts apart and makes a filename
     collision with CBSE lanes impossible by construction).

Build-time only: no DB, no Docker, no router import (stdlib-only engine).

Run:  cd D:/platform/deploy/backend
      python content_tools/gen_social_learnpaths.py
"""
from __future__ import annotations

import json
import os
import sys

_HERE = os.path.dirname(os.path.abspath(__file__))
_BACKEND = os.path.dirname(_HERE)
_DEPLOY = os.path.dirname(_BACKEND)
sys.path.insert(0, _BACKEND)

from services import learnpath_builder as lb  # noqa: E402

CBSE_CORPUS = os.path.join(_DEPLOY, "content", "enhanced_nodes_md")
CISCE_CORPUS = os.path.join(_DEPLOY, "content", "cisce_nodes_v2")
CBSE_OUT = lb.DEFAULT_OUT_DIR
CISCE_OUT = os.path.join(_BACKEND, "_cache", "learnpaths_cisce")


def _chapter_numbers(corpus_root: str, cls: int, subject: str):
    corpus = lb.list_corpus(corpus_root)
    variants = lb.SUBJECT_STEM_VARIANTS.get(subject, (subject,))
    return sorted({c["chapter"] for c in corpus.values()
                   if c["class"] == int(cls)
                   and c["subject_stem"] in variants})


def _write_chapter(corpus_root: str, out_dir: str, cls: int, subject: str,
                   chapter: int, corpus):
    path = lb.scan_chapter(corpus_root, cls, subject, chapter, corpus=corpus)
    if path is None:
        return None
    fname = lb.path_filename(cls, subject, chapter)
    with open(os.path.join(out_dir, fname), "w", encoding="utf-8") as fh:
        json.dump(path, fh, ensure_ascii=False, indent=1)
        fh.write("\n")
    return {"file": fname, "class": cls, "subject": subject,
            "chapter": chapter, "lessons": len(path["lessons"]),
            "cycle_breaks": len(path["cycle_breaks"])}


def gen_cbse_history() -> dict:
    """History c11+c12 into the CBSE learnpaths dir, _index.json merged."""
    os.makedirs(CBSE_OUT, exist_ok=True)
    corpus = lb.list_corpus(CBSE_CORPUS)
    new_rows, lessons = [], 0
    for cls in (11, 12):
        for ch in _chapter_numbers(CBSE_CORPUS, cls, "history"):
            row = _write_chapter(CBSE_CORPUS, CBSE_OUT, cls, "history", ch,
                                 corpus)
            if row:
                new_rows.append(row)
                lessons += row["lessons"]

    idx_path = os.path.join(CBSE_OUT, "_index.json")
    with open(idx_path, encoding="utf-8") as fh:
        idx = json.load(fh)
    old_paths = idx.get("paths", [])
    by_file = {r["file"]: r for r in old_paths}
    for r in new_rows:
        by_file[r["file"]] = r
    merged = sorted(by_file.values(),
                    key=lambda r: (r["class"], r["subject"], r["chapter"]))
    idx["paths"] = merged
    idx["chapters"] = len(merged)
    idx["nodes"] = sum(r["lessons"] for r in merged)
    idx["generated_at"] = idx.get("generated_at", "")  # history preserved
    idx["social_all_update"] = (
        "2026-10-07 SOCIAL-ALL: history c11-c12 added (merge, not clobber)")
    with open(idx_path, "w", encoding="utf-8") as fh:
        json.dump(idx, fh, ensure_ascii=False, indent=1)
        fh.write("\n")
    return {"lanes": sorted({(r["class"], r["subject"]) for r in new_rows}),
            "chapters": len(new_rows), "lessons": lessons}


def gen_cisce() -> dict:
    """All CISCE social lanes into _cache/learnpaths_cisce/ (fresh dir)."""
    os.makedirs(CISCE_OUT, exist_ok=True)
    corpus = lb.list_corpus(CISCE_CORPUS)
    rows, lessons, breaks = [], 0, 0
    lanes = (("histciv", range(6, 11)),
             ("hist", (11, 12)),
             ("geo", range(6, 13)),
             ("econ", range(9, 13)))
    for stem, classes in lanes:
        # canonicalize where the builder has a canonical name (geo ->
        # geography, econ -> economics, hist -> history); histciv has no
        # canonical alias and stays itself -- SUBJECT_STEM_VARIANTS then
        # matches the bare stem, which is exactly the corpus token.
        subject = lb.canonical_subject(stem) or stem
        for cls in classes:
            for ch in _chapter_numbers(CISCE_CORPUS, cls, subject):
                row = _write_chapter(CISCE_CORPUS, CISCE_OUT, cls, subject,
                                     ch, corpus)
                if row:
                    rows.append(row)
                    lessons += row["lessons"]
                    breaks += row["cycle_breaks"]

    by_file = {r["file"]: r for r in rows}   # same file can't repeat, but keep
    merged = sorted(by_file.values(),
                    key=lambda r: (r["class"], r["subject"], r["chapter"]))
    index = {
        "generated_at": "2026-10-07T00:00:00+00:00",
        "corpus_root": CISCE_CORPUS,
        "batch": "SOCIAL-ALL 2026-10-07",
        "chapters": len(merged),
        "nodes": sum(r["lessons"] for r in merged),
        "cycle_breaks": breaks,
        "paths": merged,
    }
    with open(os.path.join(CISCE_OUT, "_index.json"), "w",
              encoding="utf-8") as fh:
        json.dump(index, fh, ensure_ascii=False, indent=1)
        fh.write("\n")
    return {"lanes": sorted({(r["class"], r["subject"]) for r in merged}),
            "chapters": len(merged), "lessons": lessons,
            "cycle_breaks": breaks, "out_dir": CISCE_OUT}


if __name__ == "__main__":
    print("== CBSE history c11-c12 ==", flush=True)
    print(json.dumps(gen_cbse_history(), default=list))
    print("== CISCE social lanes ==", flush=True)
    print(json.dumps(gen_cisce(), default=list))
