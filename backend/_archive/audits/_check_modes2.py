import sys; sys.path.insert(0, '.')
from cbse_coverage_pipeline import get_chapters_for_grade, DIFFERENT_CONTENT_SUBJECTS
chapters = get_chapters_for_grade(12)

cbse_only = []
overlap = []
for ch in chapters:
    subj = ch['cisce_subject'] or 'unknown'
    if subj in DIFFERENT_CONTENT_SUBJECTS:
        cbse_only.append(ch)
    else:
        overlap.append(ch)

print(f"Total chapters: {len(chapters)}")
print(f"CBSE-only mode (generate from scratch): {len(cbse_only)}")
print(f"Overlap mode (coverage + verification): {len(overlap)}")
print()

# Group cbse_only by subject
from collections import Counter
cbse_subjects = Counter(c['cisce_subject'] for c in cbse_only)
print("CBSE-only subjects:")
for subj, count in cbse_subjects.most_common():
    print(f"  {subj}: {count} chapters")

print()
overlap_subjects = Counter(c['cisce_subject'] for c in overlap)
print("Overlap subjects:")
for subj, count in overlap_subjects.most_common():
    print(f"  {subj}: {count} chapters")
