"""Full audit: what subjects exist in corpus vs what got mapped, for classes 9-12."""
import json
import os
from pathlib import Path
from collections import defaultdict

FILE_MAPPINGS_DIR = r"D:\platform\parsed_output\file_mappings"
HEADERS_FILE = r"D:\platform\parsed_output\file_headers.jsonl"
TOPIC_MAPPINGS = {
    9: r"D:\platform\parsed_output\class9_topic_mapping.json",
    10: r"D:\platform\parsed_output\class10_topic_mapping.json",
    11: r"D:\platform\parsed_output\class11_topic_mapping.json",
    12: r"D:\platform\parsed_output\class12_topic_mapping.json",
}

# 1. Count files per class/subject from headers
files_by_cs = defaultdict(int)
with open(HEADERS_FILE, encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        try:
            rec = json.loads(line)
        except:
            continue
        cls = rec.get("class")
        subj = rec.get("subject")
        if cls and subj and cls in [9, 10, 11, 12]:
            files_by_cs[(cls, subj)] += 1

# 2. Check what topic mappings exist
topic_subjects = {}
for cls, path in TOPIC_MAPPINGS.items():
    if not os.path.exists(path):
        topic_subjects[cls] = set()
        continue
    d = json.load(open(path, encoding="utf-8"))
    # keys are like "9_bio", "10_maths", etc
    subjects = set()
    for key in d:
        if key.startswith(f"{cls}_"):
            subjects.add(key.replace(f"{cls}_", ""))
    topic_subjects[cls] = subjects

# 3. Check what file mappings exist
file_mapping_subjects = defaultdict(set)
file_mapping_counts = defaultdict(int)
if os.path.exists(FILE_MAPPINGS_DIR):
    for fname in os.listdir(FILE_MAPPINGS_DIR):
        if not fname.endswith("_file_mapping.jsonl"):
            continue
        # parse: 9_bio_file_mapping.jsonl -> class=9, subj=bio
        parts = fname.replace("_file_mapping.jsonl", "").split("_", 1)
        if len(parts) != 2:
            continue
        cls = int(parts[0])
        subj = parts[1]
        file_mapping_subjects[cls].add(subj)
        fpath = os.path.join(FILE_MAPPINGS_DIR, fname)
        with open(fpath, encoding="utf-8") as f:
            count = sum(1 for line in f if line.strip())
        file_mapping_counts[(cls, subj)] = count

# 4. Report
print("=" * 80)
print("FULL AUDIT: Classes 9-12 file mapping coverage")
print("=" * 80)

for cls in [9, 10, 11, 12]:
    print(f"\n{'='*60}")
    print(f"CLASS {cls}")
    print(f"{'='*60}")
    
    # Subjects in corpus (from headers)
    corpus_subjects = sorted({s for (c, s) in files_by_cs if c == cls})
    # Subjects with topic mappings
    t_subjects = topic_subjects.get(cls, set())
    # Subjects with file mappings
    f_subjects = file_mapping_subjects.get(cls, set())
    
    print(f"\nSubjects in corpus (file_headers): {len(corpus_subjects)}")
    print(f"Subjects with topic mappings:      {len(t_subjects)}")
    print(f"Subjects with file mappings:       {len(f_subjects)}")
    
    print(f"\n{'Subject':<20} {'Corpus Files':>12} {'Topic Map':>10} {'File Map':>10} {'Mapped Files':>13} {'Status':>10}")
    print("-" * 75)
    
    all_subjects = sorted(set(corpus_subjects) | t_subjects | f_subjects)
    for subj in all_subjects:
        corpus_count = files_by_cs.get((cls, subj), 0)
        has_topic = "YES" if subj in t_subjects else "NO"
        has_file = "YES" if subj in f_subjects else "NO"
        mapped_count = file_mapping_counts.get((cls, subj), 0)
        
        if has_file == "YES" and corpus_count > 0:
            if mapped_count == corpus_count:
                status = "OK"
            elif mapped_count < corpus_count:
                status = f"PARTIAL"
            else:
                status = "OVER"
        elif has_file == "YES":
            status = "MAPPED"
        elif has_topic == "YES":
            status = "NO FILEMAP"
        else:
            status = "SKIPPED"
        
        print(f"{subj:<20} {corpus_count:>12} {has_topic:>10} {has_file:>10} {mapped_count:>13} {status:>10}")

# 5. Summary of skipped/missing
print(f"\n{'='*60}")
print("SKIPPED SUBJECTS (in corpus but no topic mapping AND no file mapping)")
print(f"{'='*60}")
for cls in [9, 10, 11, 12]:
    corpus_subjects = {s for (c, s) in files_by_cs if c == cls}
    t_subjects = topic_subjects.get(cls, set())
    f_subjects = file_mapping_subjects.get(cls, set())
    skipped = corpus_subjects - t_subjects - f_subjects
    if skipped:
        print(f"  Class {cls}: {sorted(skipped)}")
    else:
        print(f"  Class {cls}: (none)")
