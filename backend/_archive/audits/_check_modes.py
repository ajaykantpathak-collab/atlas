import sys; sys.path.insert(0, '.')
from cbse_coverage_pipeline import get_chapters_for_grade, DIFFERENT_CONTENT_SUBJECTS
chapters = get_chapters_for_grade(12)
for ch in chapters[:5]:
    subj = ch['cisce_subject'] or 'unknown'
    mode = 'cbse_only (diff content)' if subj in DIFFERENT_CONTENT_SUBJECTS else 'overlap'
    print(f"  {ch['file']}: {subj} -> {mode}")
print("...")
hindi = [c for c in chapters if c['cisce_subject'] == 'hindi']
eng = [c for c in chapters if c['cisce_subject'] in ('english_core','english_elective','English Literature','English Language')]
print(f"Hindi chapters: {len(hindi)} -> cbse_only mode")
print(f"English chapters: {len(eng)} -> cbse_only mode")
other = [c for c in chapters if c['cisce_subject'] not in DIFFERENT_CONTENT_SUBJECTS and c['cisce_subject'] not in ('hindi',)]
print(f"Overlap chapters: {len(other)} -> coverage+verification mode")
