"""
Create markdown content files for CBSE nodes.
Mirrors the CISCE organized/ structure so the app can read both boards.
Only creates NEW files in cbse_data/content/markdown/ — does not touch existing data.
"""
import json
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
CBSE_DATA = Path(r"D:\platform\cbse_data")

# Subject → short code for directory naming
SUBJECT_CODES = {
    "maths": "math",
    "physics": "phy",
    "chemistry": "chem",
    "biology": "bio",
    "science": "sci",
    "English Literature": "eng",
    "Hindi": "hindi",
    "history_civics": "histciv",
    "hist": "hist",
    "geography": "geo",
    "accounts": "acc",
    "economics": "econ",
    "business_studies": "bs",
    "computer_science": "cs",
    "ai": "ai",
    "applied_maths": "appmath",
    "biotech": "biotech",
    "home_science": "home",
    "legal_studies": "legal",
    "political_science": "pol",
    "psychology": "psy",
    "sociology": "soc",
}

# Load all nodes and create markdown files
count = 0
by_subj_class = defaultdict(list)

for result_file in CBSE_OUTPUT.glob("*_result.json"):
    if result_file.stat().st_size < 500:
        continue
    try:
        data = json.loads(result_file.read_text(encoding="utf-8"))
        grade = data.get("grade", "?")
        subject = data.get("subject", "unknown")
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                by_subj_class[(subject, str(grade))].append(node)
    except:
        pass

print(f"Loaded nodes for {len(by_subj_class)} subject+class combinations")

# Create markdown files
for (subject, grade), nodes in by_subj_class.items():
    subj_code = SUBJECT_CODES.get(subject, subject[:6].replace(" ", "_"))
    class_dir = CBSE_DATA / "content" / "markdown" / subj_code / f"class{grade}"
    class_dir.mkdir(parents=True, exist_ok=True)

    for node in nodes:
        node_id = node.get("node_id", "")
        if not node_id:
            continue

        md_path = class_dir / f"{node_id}.md"

        # Build markdown content
        lines = [f"# {node.get('topic', node_id)}", ""]

        if node.get("content_snippet"):
            lines.append(node["content_snippet"])
            lines.append("")

        fields = [
            ("Subject", "subject"),
            ("Class Level", "class_level"),
            ("Board", "board"),
            ("Chapter", "chapter"),
            ("Difficulty", "difficulty"),
            ("Estimated Time", "estimated_time"),
        ]

        for label, key in fields:
            val = node.get(key, "")
            if val:
                lines.append(f"**{label}**: {val}")

        lines.append("")

        if node.get("concept_tags"):
            tags = node["concept_tags"]
            if isinstance(tags, str):
                tags = [t.strip() for t in tags.strip("[]").split(",")]
            lines.append(f"**Concept Tags**: {', '.join(str(t) for t in tags)}")

        if node.get("scope_constraints"):
            constraints = node["scope_constraints"]
            if isinstance(constraints, str):
                constraints = [c.strip() for c in constraints.strip("[]").split(",")]
            lines.append(f"**Scope**: {', '.join(str(c) for c in constraints)}")

        lines.append("")

        if node.get("prerequisite_node_ids"):
            prereqs = node["prerequisite_node_ids"]
            if isinstance(prereqs, str):
                prereqs = [p.strip() for p in prereqs.strip("[]").split(",")]
            lines.append(f"**Prerequisites**: {', '.join(str(p) for p in prereqs)}")

        if node.get("forward_node_ids"):
            forwards = node["forward_node_ids"]
            if isinstance(forwards, str):
                forwards = [f.strip() for f in forwards.strip("[]").split(",")]
            lines.append(f"**Leads To**: {', '.join(str(f) for f in forwards)}")

        lines.append("")
        lines.append(f"**Source**: {node.get('source_file', 'CBSE')}")
        lines.append(f"**Node ID**: {node_id}")

        md_path.write_text("\n".join(lines), encoding="utf-8")
        count += 1

print(f"\nCreated {count} markdown files in {CBSE_DATA / 'content' / 'markdown'}")

# Count by subject
subj_counts = defaultdict(int)
for (subject, grade), nodes in by_subj_class.items():
    subj_counts[subject] += len(nodes)

print("\nBy subject:")
for subj in sorted(subj_counts.keys()):
    print(f"  {subj}: {subj_counts[subj]} files")
