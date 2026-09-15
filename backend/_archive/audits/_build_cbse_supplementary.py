"""
Create CBSE curriculum blueprint and simulation mappings.
Only creates NEW files in cbse_data/ — does not touch existing data.
"""
import json
from pathlib import Path
from collections import defaultdict

CBSE_DATA = Path(r"D:\platform\cbse_data")
CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")

# ─── 1. Exam blueprint (CBSE 2025-26 marking scheme) ───
blueprint = {
    "source": "CBSE 2025-26 Marking Scheme",
    "question_types": {
        "MCQ": {"marks": 1, "time_sec": 60},
        "short_answer_2": {"marks": 2, "time_sec": 120},
        "short_answer_3": {"marks": 3, "time_sec": 180, "breakdown": {"content": 2, "expression": 1}},
        "long_answer_5": {"marks": 5, "time_sec": 300},
        "long_answer_6": {"marks": 6, "time_sec": 360, "breakdown": {"content": 3, "expression": 2, "accuracy": 1}},
        "extract_based": {"marks": 3, "time_sec": 180},
        "competency_based": {"marks": 3, "time_sec": 240},
    },
    "class_patterns": {
        "6-8": {"MCQ": "20%", "short_answer_2": "30%", "short_answer_3": "30%", "long_answer_5": "20%"},
        "9-10": {"MCQ": "20%", "short_answer_2": "20%", "short_answer_3": "30%", "long_answer_5": "20%", "competency_based": "10%"},
        "11-12": {"MCQ": "15%", "short_answer_2": "15%", "short_answer_3": "25%", "long_answer_5": "20%", "long_answer_6": "15%", "competency_based": "10%"},
    },
    "blooms_levels": ["Remember", "Understand", "Apply", "Analyse", "Evaluate", "Create"],
    "difficulty_levels": ["easy", "medium", "hard"],
}

bp_path = CBSE_DATA / "curriculum" / "blueprint" / "cbse_2025_26_blueprint.json"
with open(bp_path, "w", encoding="utf-8") as f:
    json.dump(blueprint, f, indent=2, ensure_ascii=False)
print(f"Blueprint: {bp_path}")

# ─── 2. Simulation mapping (node → simulation component) ───
# Check what simulations exist
sim_dir = Path(r"D:\platform\frontend\components\simulations")
sim_files = {}
if sim_dir.exists():
    for f in sim_dir.rglob("*.tsx"):
        name = f.stem
        # Parse class from filename like C10_Biology...
        if name.startswith("C") and "_" in name:
            parts = name.split("_")
            try:
                cls = int(parts[0][1:])
                subj = parts[1] if len(parts) > 1 else "unknown"
                key = f"class_{cls}_{subj.lower()}"
                if key not in sim_files:
                    sim_files[key] = []
                sim_files[key].append(name)
            except:
                pass

sim_mapping = {
    "total_simulations": sum(len(v) for v in sim_files.values()),
    "by_class_subject": sim_files,
    "mapping_rules": {
        "match_by": "class + subject",
        "fallback": "closest class simulation",
        "notes": "Simulations are React components in frontend/components/simulations/"
    }
}

sim_path = CBSE_DATA / "simulations" / "mapping" / "sim_mapping.json"
with open(sim_path, "w", encoding="utf-8") as f:
    json.dump(sim_mapping, f, indent=2, ensure_ascii=False)
print(f"Simulation mapping: {sim_path} ({sim_mapping['total_simulations']} sims found)")

# ─── 3. Subject → CISCE subject mapping ───
subject_map = {
    "maths": {"cbse": "Mathematics", "cisce": "maths", "cisce_alt": "appmath"},
    "physics": {"cbse": "Science (Physics)", "cisce": "physics"},
    "chemistry": {"cbse": "Science (Chemistry)", "cisce": "chemistry"},
    "biology": {"cbse": "Science (Biology)", "cisce": "biology"},
    "science": {"cbse": "Science", "cisce": "physics/chemistry/biology (split)"},
    "English Literature": {"cbse": "English", "cisce": "english"},
    "Hindi": {"cbse": "Hindi", "cisce": "hindi"},
    "history_civics": {"cbse": "Social Science", "cisce": "history_civics"},
    "hist": {"cbse": "History", "cisce": "hist"},
    "geography": {"cbse": "Geography", "cisce": "geography"},
    "accounts": {"cbse": "Accountancy", "cisce": "accounts"},
    "economics": {"cbse": "Economics", "cisce": "economics"},
    "business_studies": {"cbse": "Business Studies", "cisce": "business_studies"},
    "computer_science": {"cbse": "Computer Science", "cisce": "computer_science"},
    "ai": {"cbse": "Artificial Intelligence", "cisce": "computer_science"},
    "applied_maths": {"cbse": "Applied Mathematics", "cisce": "appmath"},
    "biotech": {"cbse": "Biotechnology", "cisce": "biotech"},
    "home_science": {"cbse": "Home Science", "cisce": "home_science"},
    "legal_studies": {"cbse": "Legal Studies", "cisce": "legal_studies"},
    "political_science": {"cbse": "Political Science", "cisce": "political_science"},
    "psychology": {"cbse": "Psychology", "cisce": "psychology"},
    "sociology": {"cbse": "Sociology", "cisce": "sociology"},
}

map_path = CBSE_DATA / "cross_board" / "mappings" / "subject_mapping.json"
with open(map_path, "w", encoding="utf-8") as f:
    json.dump(subject_map, f, indent=2, ensure_ascii=False)
print(f"Subject mapping: {map_path}")

# ─── 4. Node-to-simulation topic mapping (by subject) ───
# Map CBSE subjects to simulation directories
sim_topic_map = {
    "physics": ["mechanics", "electricity", "optics", "waves", "thermodynamics"],
    "chemistry": ["reactions", "mole_concept", "periodic_table", "organic"],
    "biology": ["cell", "genetics", "ecology", "human_body"],
    "maths": ["geometry", "algebra", "trigonometry", "calculus", "statistics"],
    "geography": ["maps", "landforms", "climate"],
    "history_civics": ["historical_events", "civics"],
}

# ─── 5. Create README for the data structure ───
readme = """# CBSE Data Directory

This directory contains the organized CBSE curriculum data for the learning platform.

## Structure

### nodes/
- `index/master_index.json` — All 21,320 CBSE nodes (compact: node_id, topic, class, subject, chapter)
- `index/coverage_summary.json` — Node counts per class+subject
- `by_class/class_XX.json` — All nodes for a specific class
- `by_subject/SUBJECT.json` — All nodes for a specific subject (all classes)

### questions/
- `by_class/` — Question banks organized by class (to be populated)
- `by_subject/` — Question banks organized by subject (to be populated)

### solvers/
- Step-by-step solver solutions per node (to be populated)

### diagnostics/
- Pre-tests / diagnostic assessments per class+subject (to be populated)

### practice/
- `worksheets/` — Practice worksheets (to be populated)
- `question_papers/` — Sample question papers (to be populated)

### tutoring/
- `hints/` — Socratic tutoring hints per node (to be populated)
- `misconceptions/` — Common misconceptions per topic (to be populated)

### analytics/
- `mastery/` — Mastery tracking templates (to be populated)
- `irt_params/` — IRT parameters per question (to be populated)

### simulations/
- `mapping/sim_mapping.json` — Maps class+subject to simulation components

### curriculum/
- `syllabus/` — Official CBSE syllabus documents (to be populated)
- `blueprint/cbse_2025_26_blueprint.json` — CBSE 2025-26 marking scheme

### content/
- `markdown/` — Markdown content per node (like organized/ for CISCE)
- `diagrams/diagrams_index.json` — 5,402 SVG diagrams from nodes

### cross_board/
- `mappings/subject_mapping.json` — CBSE ↔ CISCE subject name mapping
- `cisce_only/` — CISCE-only nodes (from merge process)
- `shared/` — Nodes shared between both boards

## Student Flow

1. **Select class + subject** → loads nodes from `nodes/by_class/`
2. **Diagnostic test** → from `diagnostics/` → assesses current level
3. **Question generation** → from `questions/` + live generators
4. **Answer evaluation** → solver + evaluator
5. **Tutoring** → Socratic hints from `tutoring/hints/`
6. **Mastery update** → tracked in `analytics/mastery/`
7. **Simulation** → launched from `simulations/mapping/`

## Data Safety

- This directory only contains NEW files generated from CBSE pipeline output
- Existing CISCE data in `D:\\platform\\organized` and `D:\\platform\\content` is untouched
- Cross-board merge results go in `cross_board/`
"""

readme_path = CBSE_DATA / "README.md"
readme_path.write_text(readme, encoding="utf-8")
print(f"README: {readme_path}")

print(f"\n=== DONE: CBSE data structure created ===")
print(f"  Location: {CBSE_DATA}")
print(f"  Nodes indexed: 21,320")
print(f"  Diagrams indexed: 5,402")
print(f"  Simulations mapped: {sim_mapping['total_simulations']}")
