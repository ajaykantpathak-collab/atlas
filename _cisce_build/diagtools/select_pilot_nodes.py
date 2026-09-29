#!/usr/bin/env python3
"""select_pilot_nodes.py — mechanical pilot selection per DIAGRAM_SPEC.md v2 §8.

Pool: c9/c10 science + maths prefixes. Rank: chapter anchors first, then
priority-chapter nodes, then the rest by node number. Emits a TSV of
node_id \t class \t subject \t chapter \t derived_title.
"""
import json
import re
import sys
from pathlib import Path

CORPUS = Path(r"D:/platform/deploy/content/enhanced_nodes_md")

POOL = {
    "c9_bio": (9, "bio"), "c9_chem": (9, "chem"), "c9_physics": (9, "phy"),
    "c10_bio_cbse": (10, "bio"), "c10_chem_cbse": (10, "chem"), "c10_phy_cbse": (10, "phy"),
    "c9_math": (9, "math"), "c10_math_cbse": (10, "math"),
}
# priority chapters per prefix (NCERT process/system chapters)
PRIORITY = {
    "c10_bio_cbse": [1, 2, 3],
    "c10_chem_cbse": [1, 2, 4],
    "c10_phy_cbse": [9, 10, 11, 12],
    "c9_physics": [8, 9, 10, 11, 12],   # motion/force/gravitation/work-energy/sound
    "c9_chem": [1, 2, 3, 4],
    "c9_bio": [1, 2, 3],
    "c10_math_cbse": [4, 7, 8, 9, 10, 13, 14, 15],
    "c9_math": [1, 2, 6, 7, 11, 12, 13],
}

SEP_LIST = (" is defined as", " is the ", " are the ", " refers to ",
            " means ", " is a ", " is an ", " is ", " are ", " – ", " — ", " - ", ": ", ".")


def derive_title(definition: str) -> str:
    head = (definition or "").strip().split("\n")[0].strip()
    for sep in SEP_LIST:
        if sep in head:
            cand = head.split(sep, 1)[0].strip()
            if 3 <= len(cand) <= 60 and len(cand.split()) <= 10:
                return cand[0].upper() + cand[1:]
    return head[:60]


def read_definition(path: Path) -> str:
    text = path.read_text(encoding="utf-8-sig", errors="replace")
    m = re.search(r"^##\s*DEFINITION\s*$(.*?)(?=^##\s|\Z)", text, re.M | re.S)
    return m.group(1).strip() if m else ""


def main() -> None:
    entries = []
    for prefix, (cls, subj) in POOL.items():
        for f in sorted(CORPUS.glob(prefix + "*.md")):
            m = re.match(re.escape(prefix) + r"(?:_cbse|_ch)?_?(\d+)_(\d+)\.md$", f.name)
            if not m:
                continue
            chap, num = int(m.group(1)), int(m.group(2))
            title = derive_title(read_definition(f))
            entries.append({
                "node_id": f.stem, "class": cls, "subject": subj,
                "chapter": chap, "num": num, "title": title,
                "anchor": num == 1,
                "priority": chap in PRIORITY.get(prefix, []),
            })

    def rank(e):
        return (0 if e["anchor"] else 1 if e["priority"] else 2,
                e["class"], e["subject"], e["chapter"], e["num"])

    entries.sort(key=rank)
    out = Path(r"D:/platform/_cisce_build/diagtools/pilot_nodes.tsv")
    with out.open("w", encoding="utf-8", newline="\n") as fh:
        fh.write("node_id\tclass\tsubject\tchapter\tnum\ttitle\tanchor\tpriority\n")
        for e in entries:
            fh.write("%s\t%d\t%s\t%d\t%d\t%s\t%d\t%d\n" % (
                e["node_id"], e["class"], e["subject"], e["chapter"], e["num"],
                e["title"].replace("\t", " "), e["anchor"], e["priority"]))
    print("wrote %d entries -> %s" % (len(entries), out))
    print(json.dumps(entries[:12], indent=1)[:1200])


if __name__ == "__main__":
    sys.exit(main())
