"""W4: classify node-id sections, R2 failure legs, and look for a title map."""
import json, re, os, sys, glob
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

HERE = os.path.dirname(os.path.abspath(__file__))
corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
recs = [json.loads(l) for l in open(os.path.join(HERE, "lane_scores_w4.jsonl"), encoding="utf-8")]
act = [r for r in recs if not r["parked"]]

NODE_ID_RE = re.compile(r"\bc\d+_[a-z0-9]+_", re.I)
DERIV_HINT_RE = re.compile(r"[=≥≤→]|Step \d|step \d|Example|∴|hence|therefore|substitut|derivation|solving", re.I)
TAKE_RE = re.compile(r"Takeaway|exam|CBSE|board|marks|NCERT|question paper|remember|keep in mind|In the exam", re.I)

r2legs = Counter()
r2_leg_files = {"walk_lt150": [], "no_step": [], "no_take": []}
id_display_files = set()
sections_with_ids_outside_graph = Counter()

for r in act:
    text = open(os.path.join(corpus, r["file"]), encoding="utf-8", errors="replace").read()
    sec = parse_sections(text)
    ww = sec.get("WALKTHROUGH", "")
    n = len(ww.split())
    if "R2_walk150" in r["misses"]:
        lt = n < 150
        st = not bool(DERIV_HINT_RE.search(ww))
        tk = not bool(TAKE_RE.search(ww))
        r2legs["total"] += 1
        if lt: r2legs["walk_lt150"] += 1; r2_leg_files["walk_lt150"].append(r["file"])
        if st: r2legs["no_step"] += 1; r2_leg_files["no_step"].append(r["file"])
        if tk: r2legs["no_take"] += 1; r2_leg_files["no_take"].append(r["file"])
        if lt and st: r2legs["lt150_and_nostep"] += 1
        if not lt and st and tk: r2legs["long_both_legs"] += 1
        if not lt and not st and tk: r2legs["long_takeaway_only"] += 1
    # display-text sections with ids (exclude by-design graph sections)
    GRAPH = {"PREREQUISITE_NODE_IDS", "FORWARD_NODE_IDS", "CROSS_SUBJECT_PREREQS"}
    for k, v in sec.items():
        if k in GRAPH:
            continue
        if NODE_ID_RE.search(v):
            id_display_files.add(r["file"])
            sections_with_ids_outside_graph[k] += 1

print("R2 legs:", dict(r2legs))
print("sample no_step files:", r2_leg_files["no_step"][:5])
print("sample walk_lt150 files:", r2_leg_files["walk_lt150"][:5])
print()
print("files with ids in NON-graph sections:", len(id_display_files))
print("sections (non-graph) with ids:", dict(sections_with_ids_outside_graph.most_common(15)))

# --- look at PREREQ_STUCK / ON_FAILURE / REASONS text in one sample file
text = open(os.path.join(corpus, "c11_acc_cbse_01_001.md"), encoding="utf-8").read()
sec = parse_sections(text)
for k in ("PREREQUISITE_NODE_IDS", "PREREQUISITE_REASONS", "CHAIN_DESCRIPTION", "PREREQ_STUCK", "ON_FAILURE", "CROSS_SUBJECT"):
    if k in sec:
        print(f"\n--- sample {k} ---")
        print(sec[k][:400])

# --- title map candidates
print("\n=== title map candidates on disk ===")
for pat in [r"D:\platform\deploy\backend\**\*node*title*.json",
            r"D:\platform\deploy\backend\**\*titles*.json",
            r"D:\platform\deploy\backend\_cache\*.json*",
            r"D:\platform\runtime_data\**\*title*.json",
            r"D:\platform\deploy\backend\content_tools\**\*.json"]:
    hits = glob.glob(pat, recursive=True)
    for h in hits[:8]:
        print(" ", h, os.path.getsize(h))
