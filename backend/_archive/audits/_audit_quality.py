"""Comprehensive quality audit of all generated CBSE nodes."""
import json
from pathlib import Path
from collections import defaultdict

OUTPUT_DIR = Path(r"D:\platform\cbse_coverage_output")

all_nodes = []
for f in sorted(OUTPUT_DIR.glob("*_result.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    for chunk in data.get("results", []):
        if "_error" in chunk:
            continue
        for node in chunk.get("nodes", []):
            node["_subject"] = data["subject"]
            node["_chapter"] = data["chapter"]
            all_nodes.append(node)

print(f"Total nodes: {len(all_nodes)}")
print()

# 1. Field completeness
REQUIRED_FIELDS = [
    "node_id", "topic", "content_snippet", "subject", "class_level", "board",
    "chapter", "chapter_name", "difficulty", "estimated_time", "is_root",
    "concept_tags", "scope_constraints", "prerequisite_node_ids", "prerequisite_reasons",
    "forward_node_ids", "forward_reasons", "cross_subject_prereqs", "cross_subject_reasons",
    "source_file"
]

print("=== FIELD COMPLETENESS ===")
field_fill = defaultdict(int)
for node in all_nodes:
    for field in REQUIRED_FIELDS:
        val = node.get(field)
        if val is not None and val != "" and val != [] and val != {}:
            field_fill[field] += 1

for field in REQUIRED_FIELDS:
    pct = field_fill[field] / len(all_nodes) * 100
    flag = "" if pct > 90 else " *** LOW" if pct < 50 else " *"
    print(f"  {field}: {field_fill[field]}/{len(all_nodes)} ({pct:.0f}%){flag}")

# 2. Content quality metrics
print()
print("=== CONTENT QUALITY ===")

# content_snippet length
snippet_lens = [len(n.get("content_snippet", "")) for n in all_nodes]
avg_snippet = sum(snippet_lens) / len(snippet_lens)
short_snippets = sum(1 for l in snippet_lens if l < 50)
good_snippets = sum(1 for l in snippet_lens if l >= 100)
print(f"  content_snippet avg length: {avg_snippet:.0f} chars")
print(f"  short (<50 chars): {short_snippets} ({short_snippets/len(all_nodes)*100:.0f}%)")
print(f"  good (>=100 chars): {good_snippets} ({good_snippets/len(all_nodes)*100:.0f}%)")

# concept_tags
has_tags = sum(1 for n in all_nodes if n.get("concept_tags") and len(n["concept_tags"]) > 0)
avg_tags = sum(len(n.get("concept_tags", [])) for n in all_nodes) / len(all_nodes)
print(f"  nodes with concept_tags: {has_tags}/{len(all_nodes)} ({has_tags/len(all_nodes)*100:.0f}%)")
print(f"  avg tags per node: {avg_tags:.1f}")

# scope_constraints
has_scope = sum(1 for n in all_nodes if n.get("scope_constraints") and len(n["scope_constraints"]) > 0)
avg_scope = sum(len(n.get("scope_constraints", [])) for n in all_nodes) / len(all_nodes)
print(f"  nodes with scope_constraints: {has_scope}/{len(all_nodes)} ({has_scope/len(all_nodes)*100:.0f}%)")
print(f"  avg constraints per node: {avg_scope:.1f}")

# 3. Prerequisite quality
print()
print("=== PREREQUISITES ===")
has_prereqs = sum(1 for n in all_nodes if n.get("prerequisite_node_ids") and len(n["prerequisite_node_ids"]) > 0)
has_prereq_reasons = sum(1 for n in all_nodes if n.get("prerequisite_reasons") and 
                         isinstance(n["prerequisite_reasons"], dict) and len(n["prerequisite_reasons"]) > 0)
is_root = sum(1 for n in all_nodes if n.get("is_root") == True)
no_prereq_no_root = sum(1 for n in all_nodes if 
                        (not n.get("prerequisite_node_ids") or len(n["prerequisite_node_ids"]) == 0) 
                        and not n.get("is_root"))
print(f"  Nodes with prerequisites: {has_prereqs}")
print(f"  Nodes with prerequisite reasons: {has_prereq_reasons}")
print(f"  Root nodes (is_root=true): {is_root}")
print(f"  No prereqs AND not root (gap): {no_prereq_no_root}")

# 4. Cross-subject links
print()
print("=== CROSS-SUBJECT LINKS ===")
has_cross = sum(1 for n in all_nodes if n.get("cross_subject_prereqs") and len(n["cross_subject_prereqs"]) > 0)
has_cross_reasons = sum(1 for n in all_nodes if n.get("cross_subject_reasons") and 
                        isinstance(n["cross_subject_reasons"], dict) and len(n["cross_subject_reasons"]) > 0)
print(f"  Nodes with cross-subject links: {has_cross}")
print(f"  Nodes with cross-subject reasons: {has_cross_reasons}")

# 5. Difficulty distribution
print()
print("=== DIFFICULTY DISTRIBUTION ===")
diff = defaultdict(int)
for n in all_nodes:
    diff[n.get("difficulty", "missing")] += 1
for d, c in sorted(diff.items(), key=lambda x: -x[1]):
    print(f"  {d}: {c} ({c/len(all_nodes)*100:.0f}%)")

# 6. Estimated time distribution
print()
print("=== ESTIMATED TIME ===")
times = [n.get("estimated_time", 0) for n in all_nodes]
time_dist = defaultdict(int)
for t in times:
    time_dist[t] += 1
for t, c in sorted(time_dist.items()):
    print(f"  {t} min: {c} ({c/len(all_nodes)*100:.0f}%)")

# 7. By subject
print()
print("=== BY SUBJECT ===")
by_subj = defaultdict(list)
for n in all_nodes:
    by_subj[n["_subject"]].append(n)

for subj in sorted(by_subj.keys()):
    nodes = by_subj[subj]
    has_tags = sum(1 for n in nodes if n.get("concept_tags") and len(n["concept_tags"]) > 0)
    has_prereqs = sum(1 for n in nodes if n.get("prerequisite_node_ids") and len(n["prerequisite_node_ids"]) > 0)
    has_cross = sum(1 for n in nodes if n.get("cross_subject_prereqs") and len(n["cross_subject_prereqs"]) > 0)
    avg_snip = sum(len(n.get("content_snippet", "")) for n in nodes) / len(nodes)
    print(f"  {subj}: {len(nodes)} nodes | tags:{has_tags} | prereqs:{has_prereqs} | cross:{has_cross} | avg_snippet:{avg_snip:.0f}")

# 8. Error chapters
print()
print("=== ERRORS ===")
errors = 0
for f in sorted(OUTPUT_DIR.glob("*_result.json")):
    data = json.loads(f.read_text(encoding="utf-8"))
    for chunk in data.get("results", []):
        if "_error" in chunk:
            errors += 1
            print(f"  {data['chapter']}: {chunk['_error']}")
if errors == 0:
    print("  No errors")
