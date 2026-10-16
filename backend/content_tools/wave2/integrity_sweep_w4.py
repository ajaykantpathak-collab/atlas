"""Full integrity sweep: for every edited file, section sets must match backup."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from delatex_w4 import split_sections

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"

files = set()
mf = os.path.join(HERE, "delatex_manifest.jsonl")
for l in open(mf, encoding="utf-8"):
    r = json.loads(l)
    if not r.get("dry"):
        files.add(r["file"])
mf2 = os.path.join(HERE, "authoring", "w4_apply_manifest.jsonl")
for l in open(mf2, encoding="utf-8"):
    files.add(json.loads(l)["file"])

checked = missing_bak = mismatch = 0
for fn in sorted(files):
    bak = os.path.join(HERE, "backups_w4", fn)
    if not os.path.exists(bak):
        bak = os.path.join(HERE, "..", "backups", fn)
    if not os.path.exists(bak):
        missing_bak += 1
        print("NO BACKUP:", fn)
        continue
    _, oparts = split_sections(open(bak, encoding="utf-8").read())
    _, nparts = split_sections(open(os.path.join(CORPUS, fn), encoding="utf-8").read())
    if [p[1] for p in oparts] != [p[1] for p in nparts]:
        mismatch += 1
        print("SECTION SET MISMATCH:", fn)
    checked += 1
print(f"checked={checked} missing_backup={missing_bak} section_mismatch={mismatch}")
