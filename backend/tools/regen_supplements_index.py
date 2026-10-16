"""Regenerate deploy/content/supplements/_supplements_index.json.

The supplements API (api/supplements.py) serves ONLY what's in this
index — adding a .marker file without regenerating leaves it invisible.
Run after ANY supplement add/edit:

    python -m backend.tools.regen_supplements_index

Index format (consumed by api/supplements.py._load_index):
  { subject_dir: { category_dir: [ {file, class, topic, bytes} ] } }

class is parsed from the c{N}_ filename prefix (0 = class-agnostic);
topic is the humanized filename stem. No file is opened — this is a
pure filesystem scan, so it's cheap even on the full ~9k-file library.
"""
import json
import os
import re
import sys

ROOT = os.path.normpath(os.path.join(
    os.path.dirname(__file__), "..", "..", "content", "supplements"))
OUT = os.path.join(ROOT, "_supplements_index.json")

CLS_RE = re.compile(r"^c(\d{1,2})_")


def _scan(root: str) -> dict:
    idx: dict = {}
    for subject in sorted(os.listdir(root)):
        sdir = os.path.join(root, subject)
        if not os.path.isdir(sdir) or subject.startswith("_"):
            continue
        cats: dict = {}
        for cat in sorted(os.listdir(sdir)):
            cdir = os.path.join(sdir, cat)
            if not os.path.isdir(cdir):
                continue
            files = []
            for fname in sorted(os.listdir(cdir)):
                fpath = os.path.join(cdir, fname)
                if not os.path.isfile(fpath):
                    continue
                # index only real markers: .pre_* backup siblings
                # (.pre_depth/.pre_board, 1,300+ files from the depth and
                # board-word waves) are byte-diffs of live markers and
                # must never appear as topics (BOARD-SNIFF-FIX finding)
                if not fname.endswith(".marker"):
                    continue
                m = CLS_RE.match(fname)
                stem = os.path.splitext(fname)[0]
                # topic = stem minus the c{N}_ class prefix, underscores→
                # spaces (matches the records the original generator emitted)
                topic = (stem.split("_", 1)[1] if m else stem).replace("_", " ")
                files.append({
                    "file": f"{subject}/{cat}/{fname}",
                    "class": int(m.group(1)) if m else 0,
                    "topic": topic,
                    "bytes": os.path.getsize(fpath),
                })
            if files:
                cats[cat] = files
        if cats:
            idx[subject] = cats
    return idx


def main() -> None:
    root = sys.argv[1] if len(sys.argv) > 1 else ROOT
    out = os.path.join(root, "_supplements_index.json")
    idx = _scan(root)
    tmp = out + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(idx, fh, indent=1)
    os.replace(tmp, out)
    total = sum(len(v) for s in idx.values() for v in s.values())
    print(f"supplements index rebuilt: {total} files, "
          f"{len(idx)} subjects -> {out}")


if __name__ == "__main__":
    main()
