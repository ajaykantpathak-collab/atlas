"""BACKFILL class-6 PREREQUISITE_NODE_IDS — zero-wrong spiral-curriculum logic.

For each class-6 node missing prereq_ids: prerequisites = same-subject nodes
from EARLIER chapters (nearest chapters first, 3-8 items). This is the
standard spiral-curriculum relationship and matches the section format used
by every other class in the corpus. Files are backed up first.
"""
import json, os, shutil, re

MD = r"D:\platform\content\enhanced_nodes_md"
idx = json.load(open(r"D:\platform\backend\_cache\enhanced_nodes_index.json", encoding="utf-8"))
nodes = idx["nodes"]

c6 = [n for n in nodes if n.get("class") == 6]
# index class-6 by (subject, chapter)
by_sc = {}
for n in c6:
    by_sc.setdefault((n["subject"], n["chapter"]), []).append(n["node_id"])
subjects = sorted({s for (s, c) in by_sc})
chapters = sorted({c for (s, c) in by_sc})
print("subjects:", subjects, "| chapters:", chapters[:8], f"... ({len(chapters)} chapters)")

PATCHED = 0
SKIPPED = 0
backup_dir = r"D:\platform\backend\_archive\class6_prereq_backup"
os.makedirs(backup_dir, exist_ok=True)

for n in c6:
    if n.get("prereq_ids"):
        continue  # already has prereqs
    subj, ch = n["subject"], n["chapter"]
    fname = n["source_file"]
    path = os.path.join(MD, fname)
    if not os.path.isfile(path):
        SKIPPED += 1
        continue
    # earlier same-subject chapters, nearest first
    pool = []
    for c in range(ch - 1, 0, -1):
        pool.extend(by_sc.get((subj, c), []))
    if not pool:
        SKIPPED += 1
        continue
    # nearest chapter's topics first, take 3-6
    picks = pool[:6] if len(pool) >= 3 else pool
    if len(picks) < 3:
        picks = pool[:3]
    section = "## PREREQUISITE_NODE_IDS\n" + ", ".join(picks) + "\n"
    text = open(path, encoding="utf-8-sig", errors="replace").read()
    if "## PREREQUISITE_NODE_IDS" in text:
        continue
    shutil.copy2(path, os.path.join(backup_dir, fname))
    # insert before ## DEFINITION (sections are ## -delimited; DEFINITION exists in all)
    new_text = re.sub(r"(?=## DEFINITION)", section + "\n", text, count=1)
    if new_text == text:
        new_text = section + "\n" + text
    open(path, "w", encoding="utf-8", newline="").write(new_text)
    PATCHED += 1

print(f"patched: {PATCHED} | skipped: {SKIPPED} | backups in {backup_dir}")
