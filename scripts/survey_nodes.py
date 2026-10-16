"""
What do the 12,356 node files actually contain, and do they need definitions?

Follow-up to the maths grounding sample, which found 7 of 43 sampled nodes
had no DEFINITION block. Before calling that a defect, the question is
whether those node TYPES need one at all. A node that evaluates an expression
does not require a definition; a node that states a theorem does.

This surveys:
  1. subject and class distribution across the WHOLE corpus
  2. which sections appear, per subject
  3. for maths nodes with no DEFINITION, what sections they DO have --
     i.e. what kind of node they are
"""
from __future__ import annotations

import collections
import pathlib
import re
import sys

NODES = pathlib.Path(r"D:\_KEEP\enhanced_nodes_md")

SECTIONS = ["DEFINITION", "COGNITIVE_LEVEL", "MASTERY_CRITERIA",
            "SCOPE_BOUNDARY", "WALKTHROUGH", "EXAMPLE", "FORMULA",
            "DIAGNOSTIC_QUESTION_1", "DIAGNOSTIC_ANSWER_1"]

SUBJ_RE = re.compile(r"^c(\d+)_([a-z]+)")
SECTION_RE = re.compile(r"^##\s*([A-Z_0-9 ]{3,40})\s*$", re.M)


def main() -> int:
    files = sorted(NODES.rglob("*.md"))
    print("total node files:", len(files))

    subj = collections.Counter()
    cls = collections.Counter()
    have = collections.defaultdict(collections.Counter)
    body_sections = collections.defaultdict(collections.Counter)
    nodetail = []

    for f in files:
        stem = f.stem
        m = SUBJ_RE.match(stem)
        s = m.group(2) if m else "?"
        c = int(m.group(1)) if m else 0
        subj[s] += 1
        cls[c] += 1
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        names = {n.strip().upper() for n in SECTION_RE.findall(text)}
        for sec in SECTIONS:
            if sec in names:
                have[s][sec] += 1
        if "DEFINITION" not in names:
            body_sections[s][tuple(sorted(names))[:6]] += 1
            if len(nodetail) < 6:
                nodetail.append((stem, sorted(names)[:10]))

    print()
    print("=== subjects ===")
    for k, v in subj.most_common(18):
        print("  %-14s %5d" % (k, v))
    print()
    print("=== classes ===")
    print("  ", dict(sorted(cls.items())))

    print()
    print("=== section presence, maths vs others ===")
    for s in ("math", "maths", "phy", "chem", "bio"):
        if s not in subj:
            continue
        print("  %-7s (%d nodes)" % (s, subj[s]))
        for sec in SECTIONS:
            print("      %-22s %5.1f%%" % (sec, have[s][sec] / subj[s] * 100))

    print()
    print("=== maths nodes WITHOUT a DEFINITION: what do they carry? ===")
    tot = sum(body_sections["math"].values()) + body_sections["maths"].values()
    print("  total:", tot)
    for combo, n in body_sections["math"].most_common(8):
        print("   %5d  %s" % (n, ", ".join(combo)[:110]))
    if body_sections["maths"]:
        for combo, n in body_sections["maths"].most_common(4):
            print("   %5d  %s" % (n, ", ".join(combo)[:110]))
    print()
    print("  sample no-DEFINITION node ids:", [d[0] for d in nodetail])
    return 0


if __name__ == "__main__":
    sys.exit(main())