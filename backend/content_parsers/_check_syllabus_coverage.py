"""Check syllabus coverage for Classes 1-10.

For each class+subject that has a syllabus file:
1. Extract the syllabus topics/sections
2. Compare against the topic mapping
3. Report any syllabus topics that have NO corresponding mapping topic
4. Report any syllabus topics that have no enrichment nodes at all

This catches the case where enrichment data is missing entire syllabus sections.
"""
import json
import os
import re
from collections import defaultdict

# Load enrichment nodes by class+subject
enrichment_by_cs = defaultdict(list)
with open(r"D:\platform\parsed_output\enrichment.jsonl", encoding="utf-8-sig") as f:
    for line in f:
        r = json.loads(line)
        cls = r.get("class_level")
        subj = r.get("subject")
        nid = r.get("node_id")
        title = r.get("title", "")
        if cls and subj and nid:
            enrichment_by_cs[(cls, subj)].append((nid, title))

# Load all topic mappings
mappings = {}
for class_num in range(1, 11):
    topic_file = rf"D:\platform\parsed_output\class{class_num}_topic_mapping.json"
    if os.path.exists(topic_file):
        with open(topic_file, encoding="utf-8-sig") as f:
            mappings[class_num] = json.load(f)

# Find all syllabus files
import subprocess
result = subprocess.run(
    ["powershell", "-Command",
     "Get-ChildItem -Path 'D:\\cisce' -Filter '*syllabus*' -Recurse -File | Select-Object -ExpandProperty FullName"],
    capture_output=True, text=True
)
syllabus_files = [f.strip() for f in result.stdout.strip().split("\n") if f.strip()]

print(f"Found {len(syllabus_files)} syllabus files")
print()

# Parse syllabus files to extract topics
def parse_syllabus_topics(filepath):
    """Extract topic sections from a syllabus marker file."""
    topics = []
    try:
        with open(filepath, encoding="utf-8-sig") as f:
            content = f.read()
        # Look for === SECTION NAME === patterns
        for match in re.finditer(r'===\s*(.+?)\s*===', content):
            topic_name = match.group(1).strip()
            # Skip metadata sections
            if topic_name.upper() in ['EXAM STRUCTURE', 'SECTION A', 'SECTION B',
                                       'TOPIC WEIGHTAGE', 'TIME MANAGEMENT',
                                       'SYLLABUS', 'EXAM STRUCTURE']:
                continue
            topics.append(topic_name)
    except Exception as e:
        pass
    return topics

# Group syllabus files by class+subject
syllabus_by_cs = defaultdict(list)
for sf in syllabus_files:
    # Extract class and subject from path or filename
    # Patterns: c10_syllabus_sections.marker, c10_chem_syllabus_sections.marker, etc.
    fname = os.path.basename(sf)
    # Try to extract class number
    cls_match = re.search(r'c(\d+)', fname)
    if not cls_match:
        continue
    cls = int(cls_match.group(1))
    
    # Try to extract subject from path
    path_parts = sf.lower().split(os.sep)
    # Subject is usually the directory before syllabus_sections
    subj = None
    for i, part in enumerate(path_parts):
        if part == "syllabus_sections" and i > 0:
            subj = path_parts[i-1]
            break
    
    if not subj:
        # Try to extract from filename
        # c10_chem_syllabus_sections.marker -> chem
        subj_match = re.match(rf'c{cls}_(\w+)_syllabus', fname)
        if subj_match:
            subj = subj_match.group(1)
    
    if subj:
        syllabus_by_cs[(cls, subj)].append(sf)

print(f"{'='*80}")
print(f"SYLLABUS COVERAGE CHECK: Classes 1-10")
print(f"{'='*80}")

missing_coverage = []

for class_num in range(1, 11):
    if class_num not in mappings:
        continue
    
    mapping = mappings[class_num]
    
    # Get all subjects for this class from the mapping
    mapping_subjects = {m["subject"] for m in mapping.values()}
    
    # Get all subjects from enrichment
    enrichment_subjects = {subj for (cls, subj) in enrichment_by_cs.keys() if cls == class_num}
    
    # Get all subjects from syllabus files
    syllabus_subjects = {subj for (cls, subj) in syllabus_by_cs.keys() if cls == class_num}
    
    print(f"\n--- Class {class_num} ---")
    print(f"  Mapping subjects: {sorted(mapping_subjects)}")
    print(f"  Enrichment subjects: {sorted(enrichment_subjects)}")
    print(f"  Syllabus files for: {sorted(syllabus_subjects)}")
    
    # Check each subject with a syllabus file
    for subj in sorted(syllabus_subjects):
        syllabus_files_for_cs = syllabus_by_cs[(class_num, subj)]
        
        # Parse syllabus topics
        all_syllabus_topics = []
        for sf in syllabus_files_for_cs:
            topics = parse_syllabus_topics(sf)
            all_syllabus_topics.extend(topics)
        
        if not all_syllabus_topics:
            # Try reading the file content directly
            for sf in syllabus_files_for_cs:
                try:
                    with open(sf, encoding="utf-8-sig") as f:
                        content = f.read()
                    if content.strip():
                        # Check if it has any structure at all
                        lines = [l.strip() for l in content.split("\n") if l.strip() and not l.startswith("---") and not l.startswith("NODE_ID") and not l.startswith("TITLE") and not l.startswith("CLASS") and not l.startswith("SUBJECT") and not l.startswith("UNIT") and not l.startswith("CHAPTER")]
                        if lines:
                            print(f"\n  {subj}: Syllabus file has {len(lines)} content lines but no === sections")
                            print(f"    File: {sf}")
                            print(f"    First 5 lines: {lines[:5]}")
                except:
                    pass
            continue
        
        # Get mapping topics for this subject
        key = f"{class_num}_{subj}"
        mapping_topics = []
        if key in mapping:
            mapping_topics = [t["topic_name"] for t in mapping[key]["topics"]]
        
        # Get enrichment node titles for this subject
        enrichment_titles = [title for (nid, title) in enrichment_by_cs.get((class_num, subj), [])]
        
        # Try to match syllabus topics to mapping topics
        unmatched_syllabus = []
        for syl_topic in all_syllabus_topics:
            syl_lower = syl_topic.lower()
            matched = False
            
            # Check against mapping topic names
            for map_topic in mapping_topics:
                if syl_lower in map_topic.lower() or map_topic.lower() in syl_lower:
                    matched = True
                    break
                # Check word overlap
                syl_words = set(syl_lower.split())
                map_words = set(map_topic.lower().split())
                overlap = syl_words & map_words
                if len(overlap) >= 2 and len(overlap) / min(len(syl_words), len(map_words)) > 0.4:
                    matched = True
                    break
            
            # Check against enrichment node titles
            if not matched:
                for ent_title in enrichment_titles:
                    if syl_lower in ent_title.lower() or ent_title.lower() in syl_lower:
                        matched = True
                        break
                    syl_words = set(syl_lower.split())
                    ent_words = set(ent_title.lower().split())
                    overlap = syl_words & ent_words
                    if len(overlap) >= 2 and len(overlap) / min(len(syl_words), len(ent_words)) > 0.4:
                        matched = True
                        break
            
            if not matched:
                unmatched_syllabus.append(syl_topic)
        
        if unmatched_syllabus:
            print(f"\n  {subj}: {len(unmatched_syllabus)}/{len(all_syllabus_topics)} syllabus topics NOT found in mapping or enrichment:")
            for t in unmatched_syllabus:
                print(f"    MISSING: {t}")
                missing_coverage.append((class_num, subj, t))
        else:
            print(f"  {subj}: All {len(all_syllabus_topics)} syllabus topics covered")

    # Check subjects with enrichment but NO syllabus file
    no_syllabus = enrichment_subjects - syllabus_subjects
    if no_syllabus:
        print(f"\n  Subjects with enrichment but NO syllabus file: {sorted(no_syllabus)}")
        for subj in sorted(no_syllabus):
            nodes = enrichment_by_cs.get((class_num, subj), [])
            print(f"    {subj}: {len(nodes)} nodes (topics created from node titles)")

print(f"\n{'='*80}")
print(f"SUMMARY: MISSING SYLLABUS COVERAGE")
print(f"{'='*80}")
if missing_coverage:
    print(f"Total missing syllabus topics: {len(missing_coverage)}")
    for cls, subj, topic in missing_coverage:
        print(f"  Class {cls} {subj}: {topic}")
else:
    print("All syllabus topics are covered!")
