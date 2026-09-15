"""Check what directory types the 'no refs' files fall into."""
import json
import re
import os
from collections import defaultdict, Counter

# Load topic mappings
node_to_topic = {}
for cls in range(9, 13):
    path = rf"D:\platform\parsed_output\class{cls}_topic_mapping.json"
    with open(path, encoding="utf-8-sig") as f:
        mapping = json.load(f)
    for key, m in mapping.items():
        subj = m["subject"]
        for t in m["topics"]:
            for nid in t["nodes"]:
                node_to_topic[nid] = (cls, subj, t["topic_num"], t["topic_name"])

node_pattern = re.compile(r'c(\d+)_(\w+)_(\d+)')

# Broad/class-level directory types - these cover all topics, shouldn't be topic-mapped
BROAD_DIRTYPES = {
    "blueprint", "mock_papers", "past_papers", "exam_guidance", "exam_technique",
    "exam_day_guide", "exam_survival", "night_before", "glossary", "formula_bank",
    "formula_derivations", "formula_decision", "statistical_tables", "calculator_guide",
    "syllabus_sections", "learning_outcomes", "90_tracker", "evidence",
    "pp_text", "pp_comments", "ppa_text", "self_assessment_checklists",
    "crossword_puzzles", "quiz_games", "story_bank", "timeline_bank",
    "crash_course", "night_before", "prerequisite_check", "self_check",
    "why_this_matters", "learning_path", "document_templates",
    "data_analysis_templates", "accounting_formats", "safety_reference",
    "lab_techniques", "practical", "practical_text", "fieldwork_guide",
    "location_knowledge", "map_work", "derivation_technique",
    "graph_construction_practice", "olympiad_physics", "current_connections",
    "business_case_bank", "reaction_bank",
}

# Subject-level directory types - cover all topics within a subject
SUBJECT_DIRTYPES = {
    "question_bank", "question_bank_answers", "question_bank_clean",
    "question_papers", "question_papers_clean", "revision_sheets",
    "summaries", "practice", "practice_tests", "worked_examples",
    "drill_banks", "diagnostic_questions", "diagnostics",
    "teaching", "model_answers", "spiral_review", "board_style_questions",
    "cross_topic_connections", "high_yield_guides", "infographic_summaries",
    "mind_maps", "quick_revision_cards", "real_world_applications",
    "silly_mistakes", "shortcuts", "solution_templates", "starter_questions",
    "mnemonics_bank", "misconceptions", "remediation", "case_studies",
    "alternative_explanations", "concept_connection", "concept_builder",
    "step_by_step_teach", "simple_english_guide", "difficulty_ladder",
    "graph_templates", "comparative_frameworks", "calculation_templates",
    "doubt_clearing", "srs_flashcards", "diagrams",
}

no_refs_by_dirtype = defaultdict(lambda: defaultdict(int))
no_refs_files = []

for cls in range(9, 13):
    with open(r"D:\platform\parsed_output\file_headers.jsonl", encoding="utf-8-sig") as f:
        for line in f:
            r = json.loads(line)
            if r.get("class_from_filename") != cls:
                continue

            fp = r.get("file_path", "")
            subj = r.get("subject_dir") or "unknown"

            # Extract dirtype
            parts = fp.replace("\\", "/").split("/")
            dirtype = parts[-2] if len(parts) >= 2 else "unknown"

            if not os.path.exists(fp):
                no_refs_by_dirtype[cls]["FILE_NOT_FOUND"] += 1
                continue

            try:
                with open(fp, encoding="utf-8-sig", errors="ignore") as cf:
                    content = cf.read()[:50000]
            except:
                no_refs_by_dirtype[cls]["READ_ERROR"] += 1
                continue

            found_nodes = set()
            for match in node_pattern.finditer(content):
                found_nodes.add(match.group(0))

            if not found_nodes:
                no_refs_by_dirtype[cls][dirtype] += 1
                no_refs_files.append((cls, subj, dirtype, fp))

print(f"{'='*70}")
print(f"NO-REFS FILES BY DIRECTORY TYPE")
print(f"{'='*70}")

all_dirtypes = Counter()
for cls in range(9, 13):
    for dt, count in no_refs_by_dirtype[cls].items():
        all_dirtypes[dt] += count

broad_count = sum(c for dt, c in all_dirtypes.items() if dt in BROAD_DIRTYPES)
subject_count = sum(c for dt, c in all_dirtypes.items() if dt in SUBJECT_DIRTYPES)
unknown_count = sum(c for dt, c in all_dirtypes.items() if dt not in BROAD_DIRTYPES and dt not in SUBJECT_DIRTYPES and dt not in ("FILE_NOT_FOUND", "READ_ERROR"))

print(f"\nBroad/class-level (auto-classify): {broad_count}")
print(f"Subject-level (auto-classify): {subject_count}")
print(f"Unknown/needs reasoning: {unknown_count}")
print(f"File not found/read error: {all_dirtypes.get('FILE_NOT_FOUND', 0) + all_dirtypes.get('READ_ERROR', 0)}")

print(f"\n{'='*70}")
print(f"DETAIL BY DIRTYPE")
print(f"{'='*70}")
for dt, count in all_dirtypes.most_common():
    category = "BROAD" if dt in BROAD_DIRTYPES else ("SUBJECT" if dt in SUBJECT_DIRTYPES else "UNKNOWN")
    print(f"  {dt:40s} {count:4d}  [{category}]")

print(f"\n{'='*70}")
print(f"UNKNOWN DIRTYPE FILES (need subagents)")
print(f"{'='*70}")
unknown_files = [(cls, subj, dt, fp) for cls, subj, dt, fp in no_refs_files if dt not in BROAD_DIRTYPES and dt not in SUBJECT_DIRTYPES]
print(f"Total unknown files: {len(unknown_files)}")
if unknown_files:
    # Group by class
    by_class = defaultdict(list)
    for cls, subj, dt, fp in unknown_files:
        by_class[cls].append((subj, dt, fp))
    for cls in sorted(by_class.keys()):
        print(f"  Class {cls}: {len(by_class[cls])} files")
        for subj, dt, fp in by_class[cls][:5]:
            print(f"    {subj}/{dt}: {os.path.basename(fp)}")
        if len(by_class[cls]) > 5:
            print(f"    ... +{len(by_class[cls])-5} more")
