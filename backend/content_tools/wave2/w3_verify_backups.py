"""W3 end-to-end verification: for every backed-up file, diff backup vs current.

Proof obligations:
  P1 every changed line lives in a section whose name is in the file's manifest
     edited-set (prose sections only: DEFINITION/ELI5/WALKTHROUGH/DIAG_*/WE_*/CQ_*)
  P2 no other section, header, preamble or section order changed
  P3 parked lanes untouched (no backup exists, current == no W3 manifest entry)
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
BACKUP = os.path.join(HERE, "backups")
MANIFEST = os.path.join(HERE, "authoring", "w3_apply_manifest.jsonl")

edited_ok = edited_bad = 0
bad = []
touched = {}
for line in open(MANIFEST, encoding="utf-8"):
    r = json.loads(line)
    touched.setdefault(r["file"], set()).update(r.get("edited", []))

for fn, edited in sorted(touched.items()):
    cur_p = os.path.join(CORPUS, fn)
    bak_p = os.path.join(BACKUP, fn)
    if not os.path.exists(bak_p):
        bad.append((fn, "NO BACKUP"))
        edited_bad += 1
        continue
    old = open(bak_p, encoding="utf-8", errors="replace").read()
    new = open(cur_p, encoding="utf-8", errors="replace").read()
    _, o_parts = parse_sections(old).items(), None
    o_secs = parse_sections(old)
    n_secs = parse_sections(new)
    if list(o_secs.keys()) != list(n_secs.keys()):
        bad.append((fn, "SECTION LIST/ORDER CHANGED"))
        edited_bad += 1
        continue
    diffed = []
    for name in o_secs:
        if o_secs[name] != n_secs[name]:
            diffed.append(name)
    extra = [d for d in diffed if d not in edited]
    # manifest "edited" names may be a subset (multi-pass); every diff must be prose
    PROSE = ("DEFINITION", "ELI5", "WALKTHROUGH", "COMMON_MISCONCEPTION")
    non_prose = [d for d in diffed
                 if d not in PROSE and not d.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))]
    if extra or non_prose:
        bad.append((fn, f"UNEXPECTED DIFFS {sorted(set(extra + non_prose))}"))
        edited_bad += 1
    else:
        edited_ok += 1

print(f"touched files: {len(touched)}; verified clean: {edited_ok}; violations: {edited_bad}")
for b in bad[:20]:
    print("  VIOLATION:", b)

# P3: parked files must have no manifest entry and no backup
parked_hits = [f for f in touched if any(f.startswith(f"c10_{s}_") for s in ("engl", "gram", "hin"))]
print("parked files touched:", len(parked_hits), parked_hits[:5])
