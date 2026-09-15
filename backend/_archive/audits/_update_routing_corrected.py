"""Update board_routing_map.json to use corrected subject labels.
Also rebuild the CBSE node index used for matching with corrected subjects."""
import json
import re
from pathlib import Path
from collections import defaultdict

# Load corrections
corrections_path = Path(r"D:\platform\cbse_data\cross_board\mappings\subject_corrections.json")
corrections = json.loads(corrections_path.read_text(encoding="utf-8"))
print(f"Loaded {len(corrections)} subject corrections")

# Load existing routing map
routing_path = Path(r"D:\platform\cbse_data\cross_board\mappings\board_routing_map.json")
routing = json.loads(routing_path.read_text(encoding="utf-8"))
print(f"Loaded {len(routing)} routing entries")

# The routing map maps CISCE node_id → {source, cbse_node_id, ...}
# The CBSE node_ids in the routing map need to be matched against corrected subjects
# But the routing map already has the cbse_node_id set — we just need to make sure
# the matching used corrected subjects.

# Actually, the routing map was built using the ORIGINAL (wrong) subject labels.
# We need to rebuild it with corrected subjects so that:
# - A CISCE chemistry node matches against CORRECTED CBSE chemistry nodes
# - A CISCE biology node matches against CORRECTED CBSE biology nodes
# etc.

# Load CBSE nodes with corrections applied
CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
cbse_nodes = []
for f in CBSE_OUTPUT.glob("*_result.json"):
    if f.stat().st_size < 500:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
    except:
        continue
    for chunk in data.get("results", []):
        for node in chunk.get("nodes", []):
            nid = node.get("node_id", "")
            cls = node.get("class_level", "?")
            if isinstance(cls, str):
                try: cls = int(cls)
                except: cls = 0

            subj = node.get("subject", "?").strip()
            # Normalize
            if subj == "math": subj = "maths"
            if subj == "phy": subj = "physics"
            if subj == "bt": subj = "biotech"
            if subj == "sci": subj = "science"
            if subj == "histciv": subj = "history_civics"
            if subj in ("his", "history"): subj = "hist"
            if subj == "geo": subj = "geography"
            if subj == "acc": subj = "accounts"
            if subj == "legal": subj = "legal_studies"
            if subj == "pe": subj = "health_and_physical_education"
            if subj == "amath": subj = "applied_maths"
            if subj == "applied_ath": subj = "applied_maths"
            if subj == "Political Science": subj = "political_science"
            if subj in ("", "English", "English Language"): subj = "English Literature"
            if subj == "history_civivs": subj = "history_civics"

            # Apply correction if exists
            if nid in corrections:
                subj = corrections[nid]["corrected_subject"]

            cbse_nodes.append({
                "node_id": nid,
                "topic": node.get("topic", "").lower(),
                "subject": subj,
                "class_level": cls,
            })

print(f"CBSE nodes with corrections: {len(cbse_nodes)}")

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

# Also load class 1-5 from Neo4j
from neo4j import GraphDatabase
driver = GraphDatabase.driver('bolt://localhost:7687', auth=('neo4j','dream_neo4j_2024'))
with driver.session() as s:
    r = s.run("MATCH (n:KnowledgeNode) WHERE n.class_level >= 1 AND n.class_level <= 5 RETURN n")
    for rec in r:
        node = dict(rec["n"])
        nid = node.get("node_id", "")
        if nid:
            cisce_nodes.append({
                "node_id": nid,
                "title": (node.get("topic") or "").lower(),
                "subject": node.get("subject", ""),
                "class": node.get("class_level", 0),
                "syllabus": (node.get("content_snippet") or "").lower()[:300],
            })
driver.close()

print(f"CISCE nodes (all classes): {len(cisce_nodes)}")

# Subject mapping
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

cbse_by_subj = defaultdict(list)
for n in cbse_nodes:
    cbse_by_subj[n["subject"]].append(n)

SKIP = {"english", "hindi", "English Literature", "Hindi"}

def get_keywords(text):
    stop = {"the","a","an","of","and","in","on","to","for","with","by","from","at","is","are","as","its","their","this","that","these","those","into","using","through","about","between","among","or","vs","versus","types","type","kind","kinds","definition","concept","introduction","basic","basics","advanced","study","detailed","general","specific","properties","revisited","overview","meaning","features","characteristics","importance","advantages","disadvantages","merits","demerits"}
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

# Rebuild routing
routing_new = {}
matched = 0
unmatched = 0

for cisce_n in cisce_nodes:
    cisce_subj = cisce_n["subject"]

    if cisce_subj in SKIP or cisce_subj in {"English Literature", "Hindi"}:
        routing_new[cisce_n["node_id"]] = {
            "source": "cisce",
            "cisce_node_id": cisce_n["node_id"],
            "cbse_node_id": None,
            "reason": "language_subject_no_match",
            "class": cisce_n["class"],
            "subject": cisce_subj,
        }
        unmatched += 1
        continue

    cbse_candidates = []
    for cbse_subj, cbse_subj_keys in SUBJECT_MAP.items():
        if cisce_subj in cbse_subj_keys or cisce_subj == cbse_subj:
            for k in cbse_subj_keys:
                cbse_candidates.extend(cbse_by_subj.get(k, []))
            cbse_candidates.extend(cbse_by_subj.get(cbse_subj, []))
    cbse_candidates.extend(cbse_by_subj.get(cisce_subj, []))

    if not cbse_candidates:
        routing_new[cisce_n["node_id"]] = {
            "source": "cisce",
            "cisce_node_id": cisce_n["node_id"],
            "cbse_node_id": None,
            "reason": "no_cbse_subject",
            "class": cisce_n["class"],
            "subject": cisce_subj,
        }
        unmatched += 1
        continue

    match = find_best_match(cisce_n, cbse_candidates)
    if match:
        routing_new[cisce_n["node_id"]] = {
            "source": "cbse",
            "cisce_node_id": cisce_n["node_id"],
            "cbse_node_id": match,
            "reason": "concept_match",
            "class": cisce_n["class"],
            "subject": cisce_subj,
        }
        matched += 1
    else:
        routing_new[cisce_n["node_id"]] = {
            "source": "cisce",
            "cisce_node_id": cisce_n["node_id"],
            "cbse_node_id": None,
            "reason": "no_concept_match",
            "class": cisce_n["class"],
            "subject": cisce_subj,
        }
        unmatched += 1

# Save
routing_path.write_text(json.dumps(routing_new, indent=2, ensure_ascii=False), encoding="utf-8")

print(f"\n{'='*60}")
print(f"  UPDATED ROUTING MAP (with corrected subjects)")
print(f"{'='*60}")
print(f"  CISCE → CBSE:  {matched}")
print(f"  CISCE → CISCE: {unmatched}")
print(f"  Total:         {len(routing_new)}")
print(f"  CBSE coverage: {100*matched//len(routing_new)}%")

# By class
by_class = defaultdict(lambda: {"cbse": 0, "cisce": 0})
for nid, info in routing_new.items():
    cls = info.get("class", 0)
    by_class[cls][info["source"]] += 1

print(f"\n{'Class':>6s} {'→CBSE':>8s} {'→CISCE':>8s} {'Total':>8s}")
print("-" * 35)
for cls in sorted(by_class.keys()):
    s = by_class[cls]
    print(f"{cls:6d} {s['cbse']:8d} {s['cisce']:8d} {s['cbse']+s['cisce']:8d}")

print(f"\nSaved to {routing_path}")
