"""
Manually match CISCE topics against CBSE topics using keyword overlap.
No API calls — pure algorithmic matching.
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

# Build CBSE topic index by subject
cbse_by_subj = defaultdict(list)
for n in cbse_nodes:
    cbse_by_subj[n["subject"]].append(n)

# Skip language subjects
SKIP = {"English Literature", "Hindi", "english", "hindi"}

# Extract keywords from a topic string
def get_keywords(text):
    # Remove common words
    stop = {"the","a","an","of","and","in","on","to","for","with","by","from","at","is","are","as","its","their","this","that","these","those","into","using","through","about","between","among","or","vs","versus","types","type","kind","kinds","definition","concept","introduction","basic","basics","advanced","study","detailed","general","specific","properties","revisited","overview"}
    words = re.findall(r'[a-z]+', text.lower())
    return set(w for w in words if len(w) > 2 and w not in stop)

# Match a CISCE topic against CBSE topics in matching subjects
def find_match(cisce_node, cbse_candidates):
    cisce_kw = get_keywords(cisce_node["title"] + " " + cisce_node["syllabus"])
    if not cisce_kw:
        return []

    best_matches = []
    for cbse_n in cbse_candidates:
        cbse_kw = get_keywords(cbse_n["topic"])
        if not cbse_kw:
            continue
        overlap = cisce_kw & cbse_kw
        # Need at least 2 keyword overlap, or 1 if it's a distinctive word
        if len(overlap) >= 2:
            score = len(overlap) / min(len(cisce_kw), len(cbse_kw))
            if score >= 0.3:
                best_matches.append((cbse_n["node_id"], score, overlap))

    best_matches.sort(key=lambda x: -x[1])
    return best_matches[:3]

# Process each CISCE node
results = {"both": [], "cisce_only": []}

for cisce_n in cisce_nodes:
    cisce_subj = cisce_n["subject"]

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
        # No CBSE equivalent subject — CISCE only
        results["cisce_only"].append(cisce_n)
        continue

    matches = find_match(cisce_n, cbse_candidates)
    if matches:
        results["both"].append({"cisce": cisce_n, "cbse_matches": matches})
    else:
        results["cisce_only"].append(cisce_n)

# Summary
print(f"\n{'='*60}")
print(f"  MANUAL CATEGORIZATION RESULTS")
print(f"{'='*60}")
print(f"  BOTH (matched):     {len(results['both'])}")
print(f"  CISCE_ONLY:         {len(results['cisce_only'])}")
print(f"  Total CISCE:        {len(cisce_nodes)}")

# Save CISCE-only by subject
cisce_only_by_subj = defaultdict(list)
for n in results["cisce_only"]:
    cisce_only_by_subj[n["subject"]].append(n)

print(f"\n{'='*60}")
print(f"  CISCE-ONLY BY SUBJECT")
print(f"{'='*60}")
for subj in sorted(cisce_only_by_subj.keys()):
    nodes = cisce_only_by_subj[subj]
    print(f"\n  {subj.upper()} — {len(nodes)} nodes:")
    for n in nodes:
        print(f"    {n['node_id']:25s} | c{n['class']} | {n['title'][:70]}")

# Save to file
out = Path(r"D:\platform\cisce_merge_output\manual_categorization.md")
with out.open("w", encoding="utf-8") as f:
    f.write(f"# Manual Categorization (Algorithmic Match)\n\n")
    f.write(f"## SUMMARY\n\n")
    f.write(f"- BOTH (matched): {len(results['both'])}\n")
    f.write(f"- CISCE_ONLY: {len(results['cisce_only'])}\n")
    f.write(f"- Total CISCE: {len(cisce_nodes)}\n\n")
    f.write(f"## CISCE_ONLY NODES ({len(results['cisce_only'])})\n\n")
    for subj in sorted(cisce_only_by_subj.keys()):
        nodes = cisce_only_by_subj[subj]
        f.write(f"### {subj} ({len(nodes)} nodes)\n\n")
        for n in nodes:
            f.write(f"- {n['node_id']} | c{n['class']} | {n['title']}\n")
        f.write("\n")

print(f"\n  Saved to {out}")
