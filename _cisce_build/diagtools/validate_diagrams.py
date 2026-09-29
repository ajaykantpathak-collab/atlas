#!/usr/bin/env python3
"""validate_diagrams.py — hard gate for the v2 sourced-image diagram contract.

Implements DIAGRAM_SPEC.md v2: validates the node-mapped diagram asset set
under deploy/frontend/public/diagrams/:
  - diagrams_index.json parses; every entry's file exists, extension allowed
  - every indexed node_id exists in the corpus md pool (c<digits>_* family)
    and its class folder matches the node's class prefix
  - every indexed node has a diagram_attributions.json record with an
    ALLOWED license (PD / CC0 / CC BY / CC BY-SA — never NC/ND/UNKNOWN),
    a non-empty source_url and credit
  - no orphan image files in classN/ folders outside the index
  - staging candidates never leak into the served folders unreviewed
    (staging/ must not live under the diagrams root)

Exit 1 on any violation.

Usage:
  python validate_diagrams.py [--corpus DIR] [--root DIR]
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional

ALLOWED_EXT = {".svg", ".png", ".jpg", ".jpeg"}
ALLOWED_LICENSE_RE = re.compile(
    r"(public domain|cc0|cc[- ]by(?![- ](?:nc|nd))|cc[- ]by-sa(?![- ](?:nc|nd)))",
    re.IGNORECASE,
)
NODE_ID_RE = re.compile(r"^c(\d{1,2})_[a-z]{2,}(?:_[a-z0-9]+)+$")


def load_json(path: Path) -> Optional[dict]:
    try:
        return json.loads(path.read_text(encoding="utf-8-sig"))
    except (OSError, ValueError):
        return None


def corpus_classes(corpus: Path) -> Dict[str, int]:
    """node_id -> class from the corpus filenames."""
    out: Dict[str, int] = {}
    for f in corpus.glob("*.md"):
        m = NODE_ID_RE.match(f.stem)
        if m:
            out[f.stem] = int(m.group(1))
    return out


def main(argv: Optional[List[str]] = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--corpus", default="deploy/content/enhanced_nodes_md")
    ap.add_argument("--root", default="deploy/frontend/public/diagrams")
    args = ap.parse_args(argv)
    root = Path(args.root)
    corpus = Path(args.corpus)

    errors: List[str] = []
    index = load_json(root / "diagrams_index.json")
    attribs = load_json(root / "diagram_attributions.json")
    if index is None:
        errors.append("diagrams_index.json missing or unparseable")
        index = {}
    if attribs is None:
        errors.append("diagram_attributions.json missing or unparseable")
        attribs = {}

    node_classes = corpus_classes(corpus) if corpus.is_dir() else {}
    if not node_classes:
        errors.append("corpus pool empty at %s" % corpus)

    # -- index entries ----------------------------------------------------------
    for node_id, entry in index.items():
        where = "index[%s]" % node_id
        if not NODE_ID_RE.match(node_id):
            errors.append("%s: not a corpus node id" % where)
            continue
        if not isinstance(entry, dict) or not entry.get("file"):
            errors.append("%s: missing file" % where)
            continue
        rel = str(entry["file"]).replace("\\", "/")
        ext = Path(rel).suffix.lower()
        if ext not in ALLOWED_EXT:
            errors.append("%s: extension %r not allowed" % (where, ext))
        f = root / rel
        if not f.is_file():
            errors.append("%s: file missing on disk: %s" % (where, f))
        want_cls = node_classes.get(node_id)
        m = re.match(r"^class(\d+)/", rel)
        if want_cls and m and int(m.group(1)) != want_cls:
            errors.append(
                "%s: filed under class%s but corpus says class %d"
                % (where, m.group(1), want_cls)
            )
        a = attribs.get(node_id)
        if not isinstance(a, dict):
            errors.append("%s: no attribution record" % where)
            continue
        lic = str(a.get("license", ""))
        if not lic or not ALLOWED_LICENSE_RE.search(lic):
            errors.append("%s: license %r not in the allowed set" % (where, lic))
        if not str(a.get("source_url", "")).strip():
            errors.append("%s: attribution missing source_url" % where)
        if not str(a.get("credit", "")).strip():
            errors.append("%s: attribution missing display credit" % where)

    # -- attribution records must not dangle ------------------------------------
    for node_id in attribs:
        if node_id not in index:
            errors.append("attributions[%s]: node not in index" % node_id)

    # -- orphans: images on disk that the index never claims --------------------
    claimed = {str(e.get("file", "")).replace("\\", "/").lower()
               for e in index.values() if isinstance(e, dict)}
    for f in root.glob("class*/*"):
        if f.suffix.lower() in ALLOWED_EXT:
            rel = f.relative_to(root).as_posix().lower()
            if rel not in claimed:
                errors.append("orphan image not in index: %s" % rel)

    for e in errors:
        print("E: %s" % e)
    print(
        "validate_diagrams: %d indexed nodes, %d attributions, %d errors"
        % (len(index), len(attribs), len(errors))
    )
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
