#!/usr/bin/env python3
"""NONSTEM-1: flatten node diagnostics into checkable marking points.

Every node's DIAGNOSTIC_ANSWER_N is authored prose. This tool freezes it
into an atomic, machine-checkable form:

  node_id -> {
      class, subject, chapter, expected_format,
      items: [{q, points[], wrong_signals[], misconception}]
  }

"points" are the positive marking points a student answer should hit.
"wrong_signals" are the authored misconception indicators (the corpus
already embeds "A wrong answer reveals ..." per diagnostic).

Output: content/marking_points/<subject>.json (ships inside the image).
Class-band "expected_format" tells the student what a good answer looks
like at their level — not just for board questions, for every class.
"""
from __future__ import annotations

import json
import os
import re
import sys
from collections import defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))
from backend.services.enhanced_nodes import load_index  # noqa: E402

_REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT_DIR = os.path.join(_REPO_ROOT, "deploy", "content", "marking_points")

# --- class-band "what a good answer looks like" specs -------------------
# These are CBSE-aligned expectations, not per-node data: children should
# learn the *form* of a good answer at their level from class 6 onward.
EXPECTED_FORMAT = {
    "junior": {  # classes 6-8
        "band": "junior",
        "form": "short structured answer",
        "rules": [
            "2-4 complete sentences",
            "use the key term from the chapter",
            "give one supporting fact or example",
            "no vague one-word answers",
        ],
        "typical_marks": "1-3",
    },
    "middle": {  # classes 9-10
        "band": "middle",
        "form": "point-wise answer",
        "rules": [
            "one sentence per marking point",
            "use NCERT terminology",
            "example or date where the question asks",
            "3-mark = 3 distinct points, 5-mark = 5",
        ],
        "typical_marks": "3-5",
    },
    "senior": {  # classes 11-12
        "band": "senior",
        "form": "analytical answer",
        "rules": [
            "claim + evidence + link structure",
            "source-aware for humanities",
            "define terms before using them",
            "counterpoint or limitation where asked to evaluate",
        ],
        "typical_marks": "4-6",
    },
}


def _band(cls: int) -> str:
    if cls <= 8:
        return "junior"
    if cls <= 10:
        return "middle"
    return "senior"


# --- point splitting ------------------------------------------------------
_ENUM_RE = re.compile(
    r"(?:\((\d+)\)|\b(\d+)\)|\b(\d+)\.)\s*", re.M)
_BOLD_RE = re.compile(r"\*\*([^*]+)\*\*")
_SENT_RE = re.compile(r"(?<=[.!?])\s+(?=[A-Z(])")
# "A wrong answer ..." / "A poor answer ..." tails are rubric *negative*
# indicators, not marking points — cut them before splitting.
_WRONG_TAIL_RE = re.compile(
    r"\bA\s+(?:wrong|poor|weak|common|incorrect)\s+answer\b.*", re.S)


def _split_points(answer: str) -> list:
    """Flatten an authored diagnostic answer into atomic marking points.

    Order of preference: explicit enumerations > bold-led segments >
    sentence split. Capped at 6 points (5-marker + cushion).
    """
    text = _WRONG_TAIL_RE.sub("", answer).strip()
    if not text:
        return []

    # 1) explicit enumeration "(1) ... (2) ..." or "1) ... 2) ..."
    marks = [m.start() for m in _ENUM_RE.finditer(text)]
    if len(marks) >= 2:
        pts, prev = [], None
        for i, pos in enumerate(marks):
            if prev is not None:
                seg = text[prev:pos].strip(" ;")
                if seg:
                    pts.append(seg)
            # move prev past the marker itself
            prev = _ENUM_RE.match(text, pos).end()
        seg = text[prev:].strip(" ;")
        if seg:
            pts.append(seg)
        if len(pts) >= 2:
            return pts[:6]

    # 2) bold-led segments "**Point name**: explanation"
    bolds = list(_BOLD_RE.finditer(text))
    if len(bolds) >= 2:
        pts = []
        for i, m in enumerate(bolds):
            end = bolds[i + 1].start() if i + 1 < len(bolds) else len(text)
            seg = text[m.start():end].strip(" ;")
            if seg:
                pts.append(seg)
        if len(pts) >= 2:
            return pts[:6]

    # 3) sentence split — each sentence is one checkable claim
    sents = [s.strip() for s in _SENT_RE.split(text) if s.strip()]
    return sents[:6]


def _min_points(cls: int, n_points: int) -> int:
    """How many points a student answer should hit to count as complete."""
    if cls <= 8:
        return min(2, n_points)
    if cls <= 10:
        return min(3, n_points)
    return min(3, n_points)


def main() -> None:
    index = load_index(force=True,
                       md_dir=os.path.join(_REPO_ROOT, "deploy", "content", "enhanced_nodes_md"))
    by_subject = defaultdict(dict)
    stats = {"nodes": 0, "items": 0, "points": 0, "skipped": 0}

    for node in index.nodes.values():
        diags = node.get("diagnostics") or []
        if not diags:
            stats["skipped"] += 1
            continue
        cls = int(node.get("class") or 0)
        items = []
        for d in diags:
            q_text = (d.get("q") or "").strip()
            ans = (d.get("a") or "").strip()
            if not ans or not q_text:
                continue
            # fill-in-the-blank items are recall drills — single-word
            # "answers" pollute the rubric, skip them
            if re.search(r"fill in the blank|_{3,}", q_text, re.I):
                continue
            pts = _split_points(ans)
            pts = [p for p in pts if len(p.split()) >= 4]
            if not pts:
                continue
            wrong = []
            misc = (d.get("misconception") or "").strip()
            if misc:
                wrong = [s.strip() for s in _SENT_RE.split(misc) if s.strip()][:4]
            items.append({
                "q": (d.get("q") or "").strip(),
                "points": pts,
                "min_points": _min_points(cls, len(pts)),
                "wrong_signals": wrong,
                "misconception": misc or None,
            })
            stats["items"] += 1
            stats["points"] += len(pts)
        if not items:
            stats["skipped"] += 1
            continue
        subj = (node.get("subject") or "misc").lower().replace(" ", "_")
        by_subject[subj][node["node_id"]] = {
            "class": cls,
            "subject": node.get("subject"),
            "chapter": node.get("chapter"),
            "expected_format": EXPECTED_FORMAT[_band(cls)],
            "items": items,
        }
        stats["nodes"] += 1

    os.makedirs(OUT_DIR, exist_ok=True)
    total_bytes = 0
    for subj, nodes in sorted(by_subject.items()):
        path = os.path.join(OUT_DIR, f"{subj}.json")
        with open(path, "w", encoding="utf-8") as fh:
            json.dump(nodes, fh, ensure_ascii=False, indent=1)
        total_bytes += os.path.getsize(path)
        print(f"  {subj}: {len(nodes)} nodes "
              f"({os.path.getsize(path) // 1024} KB)")

    print(f"\nmarking_points: {stats['nodes']} nodes, {stats['items']} items, "
          f"{stats['points']} points | skipped {stats['skipped']} | "
          f"{total_bytes // 1024} KB total -> {OUT_DIR}")


if __name__ == "__main__":
    main()
