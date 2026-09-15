"""
Build a board routing map: CISCE node_id → CBSE node_id (when concept matches).
When a CISCE student requests a topic:
  - If mapped → serve CBSE content
  - If not mapped → serve CISCE content from organized/

This avoids generating 747 new nodes. CBSE content is already enriched with prereqs.
"""
import json
import re
from pathlib import Path
from collections import defaultdict

# Load CBSE nodes
CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
cbse_nodes = []
for f in CBSE_OUTPUT.glob("*_result.json"):
    if f.stat().st_size < 500:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        subject = data.get("subject", "unknown")
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                cbse_nodes.append({
                    "node_id": node.get("node_id", ""),
                    "topic": node.get("topic", "").lower(),
                    "subject": subject,
                    "class_level": node.get("class_level", "?"),
                })
    except:
        pass

# Load CISCE nodes
cisce_data = json.loads(Path(r"D:\platform\content\index\node_index.json").read_text(encoding="utf-8"))
cisce_nodes = []
for n in cisce_data:
    cls = n.get("class", "?")
    if isinstance(cls, int) and cls >= 6:
        cisce_nodes.append({
            "node_id": n.get("node_id", ""),
            "title": n.get("title", "").lower(),
            "subject": n.get("subject", ""),
            "class": cls,
            "syllabus": n.get("syllabus", "").lower()[:300],
        })

print(f"CBSE: {len(cbse_nodes)} nodes")
print(f"CISCE: {len(cisce_nodes)} nodes")

# Subject mapping CBSE ↔ CISCE
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
}

# Build CBSE index by subject
cbse_by_subj = defaultdict(list)
for n in cbse_nodes:
    cbse_by_subj[n["subject"]].append(n)

# Skip language subjects (no concept matching)
SKIP = {"english", "hindi", "English Literature", "Hindi"}

def get_keywords(text):
    stop = {"the","a","an","of","and","in","on","to","for","with","by","from","at","is","are","as","its","their","this","that","these","those","into","using","through","about","between","among","or","vs","versus","types","type","kind","kinds","definition","concept","introduction","basic","basics","advanced","study","detailed","general","specific","properties","revisited","overview","meaning","features","characteristics","meaning","importance","advantages","disadvantages","merits","demerits"}
    words = re.findall(r'[a-z]+', text.lower())
    return set(w for w in words if len(w) > 2 and w not in stop)

def find_best_match(cisce_node, cbse_candidates):
    cisce_kw = get_keywords(cisce_node["title"] + " " + cisce_node["syllabus"])
    if not cisce_kw:
        return None

    best_match = None
    best_score = 0

    for cbse_n in cbse_candidates:
        cbse_kw = get_keywords(cbse_n["topic"])
        if not cbse_kw:
            continue
        overlap = cisce_kw & cbse_kw
        if len(overlap) >= 2:
            score = len(overlap) / min(len(cisce_kw), len(cbse_kw))
            if score > best_score and score >= 0.3:
                best_score = score
                best_match = cbse_n["node_id"]

    return best_match

# Build routing map
routing = {}
matched = 0
unmatched = 0

for cisce_n in cisce_nodes:
    cisce_subj = cisce_n["subject"]

    # Skip language subjects — always serve CISCE content
    if cisce_subj in SKIP or cisce_subj in {"English Literature", "Hindi"}:
        routing[cisce_n["node_id"]] = {
            "source": "cisce",
            "cisce_node_id": cisce_n["node_id"],
            "cbse_node_id": None,
            "reason": "language_subject_no_match"
        }
        unmatched += 1
        continue

    # Find matching CBSE subjects
    cbse_candidates = []
    for cbse_subj, cbse_subj_keys in SUBJECT_MAP.items():
        if cisce_subj in cbse_subj_keys or cisce_subj == cbse_subj:
            for k in cbse_subj_keys:
                cbse_candidates.extend(cbse_by_subj.get(k, []))
            cbse_candidates.extend(cbse_by_subj.get(cbse_subj, []))

    # Also try direct subject match
    cbse_candidates.extend(cbse_by_subj.get(cisce_subj, []))

    if not cbse_candidates:
        # No CBSE equivalent subject — serve CISCE
        routing[cisce_n["node_id"]] = {
            "source": "cisce",
            "cisce_node_id": cisce_n["node_id"],
            "cbse_node_id": None,
            "reason": "no_cbse_subject"
        }
        unmatched += 1
        continue

    match = find_best_match(cisce_n, cbse_candidates)
    if match:
        routing[cisce_n["node_id"]] = {
            "source": "cbse",
            "cisce_node_id": cisce_n["node_id"],
            "cbse_node_id": match,
            "reason": "concept_match"
        }
        matched += 1
    else:
        routing[cisce_n["node_id"]] = {
            "source": "cisce",
            "cisce_node_id": cisce_n["node_id"],
            "cbse_node_id": None,
            "reason": "no_concept_match"
        }
        unmatched += 1

# Summary
print(f"\n{'='*60}")
print(f"  BOARD ROUTING MAP")
print(f"{'='*60}")
print(f"  CISCE → CBSE (serve CBSE content):  {matched}")
print(f"  CISCE → CISCE (serve CISCE content): {unmatched}")
print(f"  Total CISCE nodes:                  {len(cisce_nodes)}")
print(f"  CBSE coverage:                      {100*matched//len(cisce_nodes)}%")

# Save routing map
out = Path(r"D:\platform\cbse_data\cross_board\mappings\board_routing_map.json")
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(routing, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"\n  Saved to {out}")

# Also save a summary by subject
subj_summary = defaultdict(lambda: {"cbse": 0, "cisce": 0})
for nid, info in routing.items():
    # Get subject from node_id
    parts = nid.split("_")
    if len(parts) >= 2:
        subj = parts[1]
    else:
        subj = "unknown"
    subj_summary[subj][info["source"]] += 1

print(f"\n{'='*60}")
print(f"  BY SUBJECT")
print(f"{'='*60}")
print(f"{'Subject':20s} {'→CBSE':>8s} {'→CISCE':>8s}")
print("-" * 40)
for subj in sorted(subj_summary.keys()):
    s = subj_summary[subj]
    print(f"{subj:20s} {s['cbse']:8d} {s['cisce']:8d}")
