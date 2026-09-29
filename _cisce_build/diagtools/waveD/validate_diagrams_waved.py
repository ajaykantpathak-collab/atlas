#!/usr/bin/env python3
"""waveD validator — hard gate for the waveD PART-FILES only (never the
wave-A-owned diagrams_index.json). Per DIAGRAM_SPEC.md v2 §7 plus the wave-D
brief: every waveD node must exist in the CURRENT enhanced_nodes_index.json
(10,979 parsed nodes; game-system nodes excluded by construction), class
folder must match, license allowed, attribution complete, no orphans in the
waveD-owned class folders (6,7,8,11,12).
Usage: python validate_diagrams_waved.py
"""
from __future__ import annotations
import json, re, sys
from pathlib import Path
from typing import Dict, List, Optional

ALLOWED_EXT = {".svg", ".png", ".jpg", ".jpeg"}
ALLOWED_LICENSE_RE = re.compile(
    r"(public domain|cc0|cc[- ]by(?![- ](?:nc|nd))|cc[- ]by-sa(?![- ](?:nc|nd)))",
    re.IGNORECASE)
NODE_ID_RE = re.compile(r"^c(\d{1,2})_[a-z]{2,}(?:_[a-z0-9]+)+$")
DEPLOY_PUB = Path(r"D:/platform/deploy/frontend/public/diagrams")
ROOT_PUB = Path(r"D:/platform/frontend/public/diagrams")
NODE_INDEX = Path(r"D:/platform/backend/_cache/enhanced_nodes_index.json")
WAVED_FOLDERS = {6, 7, 8, 11, 12}


def load_json(path: Path) -> Optional[dict]:
    try:
        return json.loads(path.read_text(encoding="utf-8-sig"))
    except (OSError, ValueError):
        return None


def corpus_node_classes() -> Dict[str, int]:
    data = load_json(NODE_INDEX)
    out = {}
    for n in (data or {}).get("nodes", []):
        out[n["node_id"]] = int(n["class"])
    return out


def main() -> int:
    errors: List[str] = []
    root = DEPLOY_PUB
    index = load_json(root / "diagrams_index_waveD.json") or {}
    attribs = load_json(root / "diagram_attributions_waveD.json") or {}
    node_classes = corpus_node_classes()
    if not node_classes:
        errors.append("node index could not be loaded")
    if set(attribs) - set(index):
        for nid in set(attribs) - set(index):
            errors.append("attributions[%s]: node not in waveD index" % nid)

    for node_id, entry in index.items():
        where = "waveD_index[%s]" % node_id
        if not NODE_ID_RE.match(node_id):
            errors.append("%s: not a corpus node id" % where)
            continue
        want_cls = node_classes.get(node_id)
        if want_cls is None:
            errors.append("%s: NOT in current 10,979-node index" % where)
        m = re.match(r"^c(\d+)_", node_id)
        cls = int(m.group(1)) if m else None
        if cls not in WAVED_FOLDERS:
            errors.append("%s: class %s outside wave-D ownership" % (where, cls))
        rel = str(entry.get("file", "")).replace("\\", "/")
        ext = Path(rel).suffix.lower()
        if ext not in ALLOWED_EXT:
            errors.append("%s: extension %r not allowed" % (where, ext))
        fm = re.match(r"^class(\d+)/", rel)
        if not fm:
            errors.append("%s: file not under classN/: %s" % (where, rel))
        elif want_cls and int(fm.group(1)) != want_cls:
            errors.append("%s: filed class%s but index says %d"
                          % (where, fm.group(1), want_cls))
        for tree in (DEPLOY_PUB, ROOT_PUB):
            if not (tree / rel).is_file():
                errors.append("%s: file missing in %s: %s"
                              % (where, "deploy" if tree is DEPLOY_PUB else "root", rel))
        a = attribs.get(node_id)
        if not isinstance(a, dict):
            errors.append("%s: no attribution record" % where)
            continue
        lic = str(a.get("license", ""))
        if not lic or not ALLOWED_LICENSE_RE.search(lic):
            errors.append("%s: license %r not in allowed set" % (where, lic))
        if not str(a.get("source_url", "")).strip():
            errors.append("%s: attribution missing source_url" % where)
        if not str(a.get("credit", "")).strip():
            errors.append("%s: attribution missing display credit" % where)
        if not str(a.get("title", "")).startswith("File:"):
            errors.append("%s: attribution title not a Commons File: title" % where)

    claimed = {str(e.get("file", "")).replace("\\", "/").lower()
               for e in index.values() if isinstance(e, dict)}
    # Orphan scope: sibling waves publish sci anchors into class11/12
    # concurrently — only MY node families are mine to police there
    # (geo/hist); in class6-8 every science/geo file is wave-D pool.
    import re as _re
    for cls in sorted(WAVED_FOLDERS):
        d = root / ("class%d" % cls)
        if not d.is_dir():
            continue
        for f in d.iterdir():
            if f.suffix.lower() not in ALLOWED_EXT:
                continue
            if cls in (11, 12) and not _re.match(
                    r"^c1[12]_(geo|hist)_", f.name):
                continue
            rel = f.relative_to(root).as_posix().lower()
            if rel not in claimed:
                errors.append("orphan image not in waveD index: %s" % rel)

    for e in errors:
        print("E: %s" % e)
    print("validate_waveD: %d indexed nodes, %d attributions, %d errors"
          % (len(index), len(attribs), len(errors)))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
