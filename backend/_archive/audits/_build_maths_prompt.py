"""Build and show the pilot prompt for maths subject - review before running."""
import json
from pathlib import Path

data = json.loads(Path(r"D:\platform\backend\_pilot_maths_data.json").read_text(encoding="utf-8"))
cbse_nodes = data["cbse"]
cisce_nodes = data["cisce"]

# Build CBSE node list (compact)
cbse_list = []
for n in cbse_nodes:
    cbse_list.append(f"  {n['node_id']} | class {n['class_level']} | {n['topic']}")
cbse_text = "\n".join(cbse_list)

# Build CISCE topic list (with syllabus context)
cisce_list = []
for n in cisce_nodes:
    syllabus = n["syllabus"][:200] if n["syllabus"] else ""
    cisce_list.append(f"  {n['node_id']} | class {n['class']} | {n['title']}\n    Syllabus: {syllabus}")
cisce_text = "\n".join(cisce_list)

prompt = f"""You are an educational curriculum expert building a unified K-12 knowledge graph
that merges CBSE and CISCE (ICSE/ISC) board curricula for Mathematics.

I'm giving you:
1. CBSE MATHS NODES — already generated, granular atomic nodes (20-field format)
2. CISCE MATHS TOPICS — coarse syllabus topics with descriptions (class 6-12)

YOUR JOB — produce a unified node list with THREE categories:

═══════════════════════════════════════════════════════════════
CATEGORY A — "both": CISCE topics that ARE covered by existing CBSE nodes
═══════════════════════════════════════════════════════════════
For each CISCE topic, find the matching CBSE node(s).
Output: cisce_node_id → [list of matching cbse_node_ids]
These CBSE nodes serve BOTH boards. No new nodes needed.

═══════════════════════════════════════════════════════════════
CATEGORY B — "CBSE": CBSE nodes that DON'T match any CISCE topic
═══════════════════════════════════════════════════════════════
These are CBSE-only nodes. They stay as-is. Just list the node_ids.
No new nodes needed.

═══════════════════════════════════════════════════════════════
CATEGORY C — "CISCE": CISCE topics with NO matching CBSE node
═══════════════════════════════════════════════════════════════
These are CISCE-only topics. Generate FULL atomic nodes for each,
in the SAME granular format as CBSE nodes. Break down coarse CISCE
topics into atomic sub-nodes where appropriate (e.g., "Operations on
large numbers" → separate nodes for addition, subtraction, multiplication,
division of large numbers).

Each new CISCE node must have ALL 20 fields:
- node_id: c{{class}}_math_cisce_{{seq}} (e.g., c6_math_cisce_001)
- topic: Clear atomic topic title
- content_snippet: 2-3 sentence description
- subject: maths
- class_level: {{class}}
- board: CISCE
- chapter: descriptive chapter name
- chapter_name: same as chapter
- difficulty: easy|medium|hard
- estimated_time: minutes
- is_root: true|false
- concept_tags: [tag1, tag2, tag3]
- scope_constraints: [what to focus on]
- prerequisite_node_ids: [list of node IDs]
- prerequisite_reasons: {{"node_id": "why"}}
- forward_node_ids: [list]
- forward_reasons: {{"node_id": "why"}}
- cross_subject_prereqs: [list]
- cross_subject_reasons: {{"node_id": "why"}}
- source_file: cisce_class{{class}}_maths.json

═══════════════════════════════════════════════════════════════
OUTPUT FORMAT — Markdown
═══════════════════════════════════════════════════════════════

## CATEGORY A: BOTH (CISCE → CBSE mapping)

- cisce_node_id: c6_math_001 → cbse: [c6_math_cbse_001, c6_math_cbse_002]
- cisce_node_id: c6_math_002 → cbse: [c6_math_cbse_010]
...

## CATEGORY B: CBSE ONLY

- c6_math_cbse_003
- c6_math_cbse_007
...

## CATEGORY C: CISCE ONLY (new full nodes)

## NODE: c6_math_cisce_001

- **topic**: ...
- **content_snippet**: ...
- **subject**: maths
- **class_level**: 6
- **board**: CISCE
- **chapter**: ...
- **chapter_name**: ...
- **difficulty**: ...
- **estimated_time**: ...
- **is_root**: ...
- **concept_tags**: [...]
- **scope_constraints**: [...]
- **prerequisite_node_ids**: [...]
- **prerequisite_reasons**: {{...}}
- **forward_node_ids**: [...]
- **forward_reasons**: {{...}}
- **cross_subject_prereqs**: [...]
- **cross_subject_reasons**: {{...}}
- **source_file**: cisce_class6_maths.json

## NODE: c6_math_cisce_002
...

═══════════════════════════════════════════════════════════════
IMPORTANT RULES
═══════════════════════════════════════════════════════════════
- Match topics by CONCEPT, not by exact wording (e.g., "Place value"
  matches "Place value system and face value")
- A single CISCE topic may map to MULTIPLE CBSE nodes (coarse → granular)
- A single CBSE node may serve MULTIPLE CISCE topics
- Only put a CISCE topic in Category C if NO CBSE node covers it
- Be generous with matching — if the concept is substantially the same,
  it's a match, not a new node
- For Category C, break coarse CISCE topics into atomic nodes matching
  CBSE granularity (one concept per node)
- Keep class levels appropriate — a Class 6 CISCE topic matches Class 6
  CBSE nodes (or adjacent classes if the concept is the same)

═══════════════════════════════════════════════════════════════
CBSE MATHS NODES ({len(cbse_nodes)} nodes):
═══════════════════════════════════════════════════════════════

{cbse_text}

═══════════════════════════════════════════════════════════════
CISCE MATHS TOPICS ({len(cisce_nodes)} topics, class 6-12):
═══════════════════════════════════════════════════════════════

{cisce_text}
"""

# Save prompt
out = Path(r"D:\platform\backend\_pilot_maths_prompt.txt")
out.write_text(prompt, encoding="utf-8")
print(f"Prompt saved to {out}")
print(f"Prompt length: {len(prompt)} chars (~{len(prompt)//4} tokens)")
print(f"CBSE nodes: {len(cbse_nodes)}")
print(f"CISCE topics: {len(cisce_nodes)}")
print()
print("=== FIRST 3000 CHARS OF PROMPT ===")
print(prompt[:3000])
