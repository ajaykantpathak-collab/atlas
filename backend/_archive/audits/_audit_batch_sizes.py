"""Check token sizes per subject batch."""
import json
from pathlib import Path

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")
NODE_INDEX = Path(r"D:\platform\content\index\node_index.json")

# Load CISCE nodes
cisce_data = json.loads(NODE_INDEX.read_text(encoding="utf-8"))
cisce_by_subj = {}
for item in cisce_data:
    subj = item.get("subject", "unknown")
    if subj not in cisce_by_subj:
        cisce_by_subj[subj] = []
    cisce_by_subj[subj].append({
        "node_id": item.get("node_id", ""),
        "topic": item.get("title", ""),
        "class_level": item.get("class", "?"),
    })

# Load CBSE nodes by subject
cbse_by_subj = {}
for result_file in OUTPUT_DIR.glob("*_result.json"):
    if result_file.stat().st_size < 500:
        continue
    try:
        data = json.loads(result_file.read_text(encoding="utf-8"))
        subject = data.get("subject", "unknown")
        grade = data.get("grade", "?")
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                topic = node.get("topic", "")
                node_id = node.get("node_id", "")
                if topic:
                    if subject not in cbse_by_subj:
                        cbse_by_subj[subject] = []
                    cbse_by_subj[subject].append({
                        "node_id": node_id,
                        "topic": topic,
                        "class_level": node.get("class_level", grade),
                    })
    except:
        pass

# Subject mapping: CISCE subject -> CBSE subject(s)
SUBJECT_MAP = {
    "biology": ["biology", "science"],
    "chemistry": ["chemistry", "science"],
    "physics": ["physics", "science"],
    "maths": ["maths", "applied_maths"],
    "appmath": ["applied_maths", "maths"],
    "english": ["English Literature"],
    "English Literature": ["English Literature"],
    "English Language": ["English Literature"],
    "hindi": ["Hindi"],
    "history_civics": ["history_civics", "hist"],
    "hist": ["hist", "history_civics"],
    "geography": ["geography"],
    "accounts": ["accounts"],
    "economics": ["economics"],
    "economics_applications": ["economics"],
    "business_studies": ["business_studies"],
    "commerce": ["business_studies"],
    "commercial_applications": ["business_studies"],
    "commercial_studies": ["business_studies"],
    "computer_science": ["computer_science", "ai"],
    "biotech": ["biotech"],
    "home_science": ["home_science"],
    "legal_studies": ["legal_studies"],
    "mass_media": [],
    "political_science": ["political_science"],
    "psychology": ["psychology"],
    "sociology": ["sociology"],
    "evs": [],
}

print(f"{'CISCE Subject':<30} {'CISCE':>6} {'CBSE':>6} {'Est tokens':>10}")
print("-" * 60)

for subj in sorted(cisce_by_subj.keys()):
    cisce_nodes = cisce_by_subj[subj]
    cbse_subjects = SUBJECT_MAP.get(subj, [subj])
    cbse_nodes = []
    for cs in cbse_subjects:
        cbse_nodes.extend(cbse_by_subj.get(cs, []))
    
    # Estimate tokens: ~10 tokens per node (id + topic + class)
    est_tokens = (len(cisce_nodes) + len(cbse_nodes)) * 15
    print(f"  {subj:<28} {len(cisce_nodes):>6} {len(cbse_nodes):>6} {est_tokens:>10}")

print()
total_cisce = sum(len(v) for v in cisce_by_subj.values())
total_cbse = sum(len(v) for v in cbse_by_subj.values())
print(f"Total: CISCE={total_cisce}, CBSE={total_cbse}")
