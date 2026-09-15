"""Check prompt sizes for each subject before running."""
import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
CISCE_INDEX = Path(r"D:\platform\content\index\node_index.json")

SUBJECT_MAP = {
    "maths": ["maths", "appmath"],
    "physics": ["physics"],
    "chemistry": ["chemistry"],
    "biology": ["biology", "biotech"],
    "english": ["english"],
    "hindi": ["hindi"],
    "history_civics": ["histciv", "hist", "history_civics"],
    "geography": ["geo", "geography"],
    "economics": ["econ", "economics", "econapp"],
    "accounts": ["acc", "accounts"],
    "business_studies": ["bs", "comm", "commstud", "commapp", "business_studies"],
    "computer_science": ["cs", "computer_science"],
    "psychology": ["psy", "psychology"],
    "sociology": ["soc", "sociology"],
    "political_science": ["pol", "political_science"],
    "home_science": ["home", "home_science"],
    "legal_studies": ["legal", "legal_studies"],
    "science": ["sci", "science", "evs"],
    "ai": ["ai"],
    "applied_maths": ["appmath"],
    "biotech": ["biotech"],
    "massmedia": ["massmedia"],
}

# Load CBSE
cbse_by_subj = defaultdict(list)
for f in CBSE_OUTPUT.glob("*_result.json"):
    if f.stat().st_size < 500: continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        subj = data.get("subject", "unknown")
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                cbse_by_subj[subj].append({"node_id": node.get("node_id",""), "topic": node.get("topic",""), "class_level": node.get("class_level","?")})
    except: pass

# Load CISCE
cisce_data = json.loads(CISCE_INDEX.read_text(encoding="utf-8"))
cisce_by_subj = defaultdict(list)
for item in cisce_data:
    cls = item.get("class", "?")
    if isinstance(cls, int) and cls >= 6:
        cisce_by_subj[item.get("subject","unknown")].append({"node_id": item.get("node_id",""), "title": item.get("title",""), "class": cls, "syllabus": item.get("syllabus","")[:150]})

print(f"{'Subject':25s} {'CBSE':>6s} {'CISCE':>6s} {'Prompt chars':>13s} {'~tokens':>8s}  Status")
print("-" * 75)

for cbse_subj in sorted(cbse_by_subj.keys()):
    cbse_nodes = cbse_by_subj[cbse_subj]
    cisce_subj_keys = SUBJECT_MAP.get(cbse_subj, [cbse_subj])
    cisce_nodes = []
    for ck in cisce_subj_keys:
        cisce_nodes.extend(cisce_by_subj.get(ck, []))

    # Estimate prompt size
    cbse_chars = sum(len(n["node_id"]) + len(str(n["class_level"])) + len(n["topic"]) + 10 for n in cbse_nodes)
    cisce_chars = sum(len(n["node_id"]) + len(str(n["class"])) + len(n["title"]) + len(n["syllabus"]) + 10 for n in cisce_nodes)
    total = cbse_chars + cisce_chars + 2000  # prompt template
    tokens = total // 4

    status = "OK" if tokens < 100000 else "TOO BIG - needs batching"
    print(f"{cbse_subj:25s} {len(cbse_nodes):6d} {len(cisce_nodes):6d} {total:13d} {tokens:8d}  {status}")
