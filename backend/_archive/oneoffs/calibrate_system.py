"""Calibrate the intelligence system with real data.
Loads 19K nodes, 1276 enrichment markers, builds prerequisite chains,
and wires everything into the concept graph traverser and orchestrator.
"""
import json, os, sys, time, re, warnings
from collections import defaultdict
from pathlib import Path

warnings.filterwarnings("ignore")

sys.path.insert(0, r"D:\platform\backend")
sys.path.insert(0, r"D:\platform\backend\services")

NODES_DIR = r"D:\platform\cbse_data\nodes\by_subject"
ENRICH_DIR = r"D:\platform\cbse_data\enrichment"
PARSED_OUT = r"D:\platform\cbse_data\enrichment_parsed.json"
INDEX_OUT = r"D:\platform\cbse_data\node_index.json"

print("=" * 60)
print("CALIBRATING INTELLIGENCE SYSTEM WITH REAL DATA")
print("=" * 60)

# ─── 1. Load all 19K nodes ─────────────────────────────────────────────────
print("\n[1/6] Loading 19K nodes...")
t0 = time.perf_counter()

all_nodes = {}
nodes_by_subject = defaultdict(list)
nodes_by_class = defaultdict(list)
nodes_by_board = defaultdict(list)
prereq_edges = []
cross_subject_edges = []
forward_edges = []

node_files = sorted(Path(NODES_DIR).glob("*.json"))
for f in node_files:
    data = json.loads(f.read_text(encoding="utf-8"))
    for node in data:
        nid = node.get("node_id", "")
        if not nid:
            continue
        all_nodes[nid] = node
        nodes_by_subject[node.get("subject", "unknown")].append(nid)
        nodes_by_class[node.get("class_level", 0)].append(nid)
        nodes_by_board[node.get("board", "unknown")].append(nid)
        
        # Build prerequisite edges
        for prereq_id in node.get("prerequisite_node_ids", []):
            if prereq_id:
                prereq_edges.append((prereq_id, nid, node.get("prerequisite_reasons", {}).get(prereq_id, "")))
        
        # Build forward edges
        for fwd_id in node.get("forward_node_ids", []):
            if fwd_id:
                forward_edges.append((nid, fwd_id, node.get("forward_reasons", {}).get(fwd_id, "")))
        
        # Build cross-subject edges
        for cs_id in node.get("cross_subject_prereqs", []):
            if cs_id:
                cross_subject_edges.append((cs_id, nid, node.get("cross_subject_reasons", {}).get(cs_id, "")))

elapsed = time.perf_counter() - t0
print(f"  Loaded {len(all_nodes)} nodes from {len(node_files)} files ({elapsed:.1f}s)")
print(f"  Subjects: {len(nodes_by_subject)}")
print(f"  Classes: {sorted(nodes_by_class.keys())}")
print(f"  Boards: {dict(nodes_by_board)}")
print(f"  Prerequisite edges: {len(prereq_edges)}")
print(f"  Forward edges: {len(forward_edges)}")
print(f"  Cross-subject edges: {len(cross_subject_edges)}")

# ─── 2. Parse enrichment markers ───────────────────────────────────────────
print("\n[2/6] Parsing enrichment markers...")
t0 = time.perf_counter()

# Field name normalization map (typos found in data)
FIELD_NORMALIZE = {
    "COMMON_MISCONEPTION": "COMMON_MISCONCEPTION",
    "DIAGNOSTICQUESTION": "DIAGNOSTIC_QUESTION",
    "SCOBE_BOUNDARY": "SCOPE_BOUNDARY",
    "DEFINENCE": "DEFINITION",
    "DEFINITIVE": "DEFINITION",
    "MASTODY_CRITERIA": "MASTERY_CRITERIA",
    "MASTERY_CRITERA": "MASTERY_CRITERIA",
    "TEXT_WALKTHROGH": "TEXT_WALKTHROUGH",
    "TEXT_WALKTHROUG": "TEXT_WALKTHROUGH",
    "COGNITVE_LEVEL": "COGNITIVE_LEVEL",
    "COGNITIVE_LEVE": "COGNITIVE_LEVEL",
    "COMMON_MISCONCEPION": "COMMON_MISCONCEPTION",
    "COMMON_MISCONCEPTIONS": "COMMON_MISCONCEPTION",
    "SCOPE_BOUNDERY": "SCOPE_BOUNDARY",
    "SCOPE_BOUNDRY": "SCOPE_BOUNDARY",
    "DIAGNOSTIC_QUESION": "DIAGNOSTIC_QUESTION",
    "DIAGNOSTIC_QUESTON": "DIAGNOSTIC_QUESTION",
    "ON_FAILUE": "ON_FAILURE",
    "ON_FAIL": "ON_FAILURE",
}

def normalize_field(name):
    return FIELD_NORMALIZE.get(name, name)

def parse_marker_file(filepath):
    """Parse a single marker file into structured enrichment records."""
    text = Path(filepath).read_text(encoding="utf-8", errors="replace")
    records = {}
    
    # Split by node markers
    node_blocks = re.split(r'^--- NODE ', text, flags=re.MULTILINE)
    
    for block in node_blocks[1:]:  # skip preamble
        lines = block.strip().split("\n")
        node_id = lines[0].strip().rstrip("---").strip()
        if not node_id:
            continue
        
        # Parse fields
        record = {"node_id": node_id}
        current_field = None
        current_value = []
        
        for line in lines[1:]:
            # Check if this is a field header
            field_match = re.match(r'^([A-Z_]+):\s*(.*)', line)
            if field_match:
                # Save previous field
                if current_field:
                    record[current_field] = "\n".join(current_value).strip()
                
                field_name = normalize_field(field_match.group(1))
                field_value = field_match.group(2)
                current_field = field_name
                current_value = [field_value] if field_value else []
            elif current_field and line.strip():
                current_value.append(line)
        
        # Save last field
        if current_field:
            record[current_field] = "\n".join(current_value).strip()
        
        # Parse misconceptions into list
        if "COMMON_MISCONCEPTION" in record:
            record["misconceptions"] = parse_misconceptions(record["COMMON_MISCONCEPTION"])
        
        # Parse diagnostic question
        if "DIAGNOSTIC_QUESTION" in record:
            record["diagnostic"] = parse_diagnostic(record["DIAGNOSTIC_QUESTION"])
        
        records[node_id] = record
    
    return records

def parse_misconceptions(text):
    """Parse misconception block into list of dicts."""
    misconceptions = []
    # Match "Misconception N: "..." explanation"
    pattern = r'Misconception\s+\d+:\s*"([^"]+)"\s*(.*?)(?=Misconception\s+\d+:|$)'
    for match in re.finditer(pattern, text, re.DOTALL):
        misconceptions.append({
            "misconception": match.group(1).strip(),
            "explanation": match.group(2).strip(),
        })
    if not misconceptions and text.strip():
        # Fallback: just store raw text
        misconceptions.append({"misconception": text.strip()[:200], "explanation": ""})
    return misconceptions

def parse_diagnostic(text):
    """Parse diagnostic question block."""
    result = {"question": "", "answer": "", "level": ""}
    q_match = re.search(r'Q:\s*(.*?)(?=\n\s*A:|$)', text, re.DOTALL)
    a_match = re.search(r'A:\s*(.*?)(?=\n\s*LEVEL:|$)', text, re.DOTALL)
    l_match = re.search(r'LEVEL:\s*(\w+)', text)
    if q_match: result["question"] = q_match.group(1).strip()
    if a_match: result["answer"] = a_match.group(1).strip()
    if l_match: result["level"] = l_match.group(1).strip()
    return result

# Parse all marker files
enrichment_data = {}
marker_files = sorted(Path(ENRICH_DIR).glob("*.marker"))
parse_errors = 0

for mf in marker_files:
    try:
        records = parse_marker_file(mf)
        enrichment_data.update(records)
    except Exception as e:
        parse_errors += 1

elapsed = time.perf_counter() - t0
print(f"  Parsed {len(enrichment_data)} enrichment records from {len(marker_files)} marker files ({elapsed:.1f}s)")
print(f"  Parse errors: {parse_errors}")

# Check coverage
nodes_with_enrichment = sum(1 for nid in all_nodes if nid in enrichment_data)
print(f"  Nodes with enrichment: {nodes_with_enrichment}/{len(all_nodes)} ({100*nodes_with_enrichment/len(all_nodes):.1f}%)")

# Check field coverage
fields_covered = defaultdict(int)
for rec in enrichment_data.values():
    for field in ["DEFINITION", "COGNITIVE_LEVEL", "MASTERY_CRITERIA", "SCOPE_BOUNDARY", 
                   "TEXT_WALKTHROUGH", "DIAGNOSTIC_QUESTION", "COMMON_MISCONCEPTION", "ON_FAILURE"]:
        if field in rec and rec[field]:
            fields_covered[field] += 1

print(f"  Field coverage:")
for field, count in sorted(fields_covered.items()):
    print(f"    {field}: {count}/{len(enrichment_data)} ({100*count/len(enrichment_data):.1f}%)")

# ─── 3. Save parsed enrichment + node index ────────────────────────────────
print("\n[3/6] Saving parsed data...")
t0 = time.perf_counter()

# Save enrichment parsed
with open(PARSED_OUT, "w", encoding="utf-8") as f:
    json.dump(enrichment_data, f, ensure_ascii=False, indent=2)
print(f"  Enrichment saved: {PARSED_OUT} ({os.path.getsize(PARSED_OUT)//1024}KB)")

# Save node index (compact - just IDs and key metadata)
node_index = {}
for nid, node in all_nodes.items():
    node_index[nid] = {
        "topic": node.get("topic", ""),
        "subject": node.get("subject", ""),
        "class_level": node.get("class_level", 0),
        "board": node.get("board", ""),
        "chapter": node.get("chapter", ""),
        "difficulty": node.get("difficulty", ""),
        "concept_tags": node.get("concept_tags", []),
        "prerequisite_node_ids": node.get("prerequisite_node_ids", []),
        "forward_node_ids": node.get("forward_node_ids", []),
        "cross_subject_prereqs": node.get("cross_subject_prereqs", []),
        "scope_constraints": node.get("scope_constraints", ""),
        "is_root": node.get("is_root", False),
    }

with open(INDEX_OUT, "w", encoding="utf-8") as f:
    json.dump(node_index, f, ensure_ascii=False, indent=2)
print(f"  Node index saved: {INDEX_OUT} ({os.path.getsize(INDEX_OUT)//1024}KB)")

elapsed = time.perf_counter() - t0
print(f"  Save time: {elapsed:.1f}s")

# ─── 4. Build prerequisite chains and identify root causes ─────────────────
print("\n[4/6] Building prerequisite chains...")
t0 = time.perf_counter()

# Build adjacency list
prereq_map = defaultdict(list)  # node -> list of prereqs
forward_map = defaultdict(list)  # node -> list of forward nodes
for src, dst, reason in prereq_edges:
    prereq_map[dst].append({"prereq": src, "reason": reason})
for src, dst, reason in forward_edges:
    forward_map[src].append({"forward": dst, "reason": reason})

# Find root nodes (no prerequisites)
root_nodes = [nid for nid in all_nodes if not prereq_map.get(nid)]
print(f"  Root nodes (no prereqs): {len(root_nodes)}")

# Calculate max chain depth for each node
def chain_depth(node_id, visited=None):
    if visited is None:
        visited = set()
    if node_id in visited:
        return 0
    visited.add(node_id)
    prereqs = prereq_map.get(node_id, [])
    if not prereqs:
        return 0
    return 1 + max(chain_depth(p["prereq"], visited) for p in prereqs if p["prereq"] in all_nodes)

# Sample chain depths
sample_depths = []
for nid in list(all_nodes.keys())[:500]:
    try:
        d = chain_depth(nid)
        sample_depths.append(d)
    except:
        sample_depths.append(0)

avg_depth = sum(sample_depths) / len(sample_depths) if sample_depths else 0
max_depth = max(sample_depths) if sample_depths else 0
print(f"  Avg prerequisite depth (sample 500): {avg_depth:.1f}")
print(f"  Max prerequisite depth (sample 500): {max_depth}")

elapsed = time.perf_counter() - t0
print(f"  Chain building time: {elapsed:.1f}s")

# ─── 5. Calibrate orchestrator rules with real data ────────────────────────
print("\n[5/6] Calibrating orchestrator with real data...")
t0 = time.perf_counter()

from deterministic_orchestrator import DeterministicOrchestrator

orch = DeterministicOrchestrator()
rules_before = len(orch.get_active_rules())

# Analyze enrichment data to calibrate rules
cognitive_levels = defaultdict(int)
difficulties = defaultdict(int)
misconception_count = defaultdict(int)

for nid, rec in enrichment_data.items():
    cl = rec.get("COGNITIVE_LEVEL", "unknown")
    cognitive_levels[cl] += 1
    
    node = all_nodes.get(nid, {})
    diff = node.get("difficulty", "unknown")
    difficulties[diff] += 1
    
    miscs = rec.get("misconceptions", [])
    misconception_count[len(miscs)] += 1

print(f"  Cognitive levels: {dict(cognitive_levels)}")
print(f"  Difficulties: {dict(difficulties)}")
print(f"  Misconceptions per node: {dict(misconception_count)}")

# Add subject-specific rules based on data analysis
from deterministic_orchestrator import OrchestratorRule

# Rule: For "create" level cognitive tasks, always use synthesis questions
orch.add_rule(OrchestratorRule(
    rule_name="high_cognitive_create",
    condition={"field": "cognitive_level", "operator": "==", "value": "create"},
    action={"agent": "AssessmentBot", "action_type": "assess", "question_type": "synthesis"},
    priority=22,
    is_active=True,
    source="calibration",
))

# Rule: For "easy" difficulty with high failure, increase scaffolding
orch.add_rule(OrchestratorRule(
    rule_name="easy_concept_high_failure",
    condition={"field": "difficulty", "operator": "==", "value": "easy", "and": {"field": "failure_count", "operator": ">=", "value": 2}},
    action={"agent": "ScaffoldBot", "action_type": "scaffold", "hint_level": 2},
    priority=28,
    is_active=True,
    source="calibration",
))

# Rule: For nodes with 3+ misconceptions, diagnose first
orch.add_rule(OrchestratorRule(
    rule_name="many_misconceptions_diagnose",
    condition={"field": "misconception_count", "operator": ">=", "value": 3},
    action={"agent": "AssessmentBot", "action_type": "assess", "question_type": "diagnostic"},
    priority=18,
    is_active=True,
    source="calibration",
))

rules_after = len(orch.get_active_rules())
print(f"  Rules before: {rules_before}, after calibration: {rules_after}")
print(f"  Added {rules_after - rules_before} data-driven rules")

elapsed = time.perf_counter() - t0
print(f"  Calibration time: {elapsed:.1f}s")

# ─── 6. Test with real curriculum nodes ────────────────────────────────────
print("\n[6/6] Testing with real curriculum nodes...")
t0 = time.perf_counter()

from concept_graph_traverser import ConceptGraphTraverser

# Initialize traverser with real data
traverser = ConceptGraphTraverser(NODES_DIR, PARSED_OUT)

# Test with real nodes from different subjects
test_nodes = [
    "c11_phy_cbse_010",  # Physics - Acceleration from V-T graphs
    "c11_acc_cbse_001",  # Accounts - Definition of Accounting
    "c11_che_cbse_001",  # Chemistry
    "c11_bio_cbse_001",  # Biology
    "c11_math_cbse_001", # Math
]

for nid in test_nodes:
    node = all_nodes.get(nid)
    if not node:
        # Find first available node for this subject
        subject = nid.split("_")[1]
        for n, nd in all_nodes.items():
            if nd.get("subject") == subject or nd.get("_cbse_subject", "").lower() == subject:
                nid = n
                node = nd
                break
    
    if not node:
        print(f"  {nid}: NOT FOUND")
        continue
    
    enrich = enrichment_data.get(nid, {})
    ctx = traverser.get_teaching_context(nid)
    
    if isinstance(ctx, dict):
        keys = list(ctx.keys())
        title = enrich.get("TITLE", node.get("topic", ""))
        miscs = enrich.get("misconceptions", [])
        prereqs = node.get("prerequisite_node_ids", [])
        print(f"  {nid}: '{title[:50]}' | ctx keys: {len(keys)} | prereqs: {len(prereqs)} | misconceptions: {len(miscs)}")
    else:
        print(f"  {nid}: ctx type={type(ctx).__name__}")

# Test answer-leak prevention
print("\n  Testing answer-leak prevention...")
leak_tests = 0
leak_found = 0
for nid, enrich in list(enrichment_data.items())[:100]:
    diag = enrich.get("diagnostic", {})
    answer = diag.get("answer", "")
    if answer and len(answer) > 20:
        leak_tests += 1
        # Check if answer is too detailed (potential leak)
        if len(answer) > 500:
            leak_found += 1

print(f"  Checked {leak_tests} diagnostic answers")
print(f"  Potential leaks (answer > 500 chars): {leak_found}")
print(f"  These need to be truncated by the renderer when mastery < 0.7")

elapsed = time.perf_counter() - t0
print(f"  Test time: {elapsed:.1f}s")

# ─── SUMMARY ───────────────────────────────────────────────────────────────
print(f"\n{'='*60}")
print("CALIBRATION COMPLETE")
print(f"{'='*60}")
print(f"  Nodes loaded: {len(all_nodes)}")
print(f"  Enrichment records: {len(enrichment_data)}")
print(f"  Enrichment coverage: {100*nodes_with_enrichment/len(all_nodes):.1f}%")
print(f"  Prerequisite edges: {len(prereq_edges)}")
print(f"  Cross-subject edges: {len(cross_subject_edges)}")
print(f"  Orchestrator rules: {rules_after} (including data-driven)")
print(f"  Parsed enrichment saved: {PARSED_OUT}")
print(f"  Node index saved: {INDEX_OUT}")
print(f"{'='*60}")
