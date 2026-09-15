import sys; sys.path.insert(0, '.')
from cbse_coverage_pipeline import get_chapters_for_grade, SKIP_SUBJECTS, SKIP_CBSE_FOLDERS, CBSE_TO_CISCE_SUBJECT
print('SKIP_SUBJECTS:', SKIP_SUBJECTS)
print('SKIP_CBSE_FOLDERS:', SKIP_CBSE_FOLDERS)
print('Hindi mapping:', CBSE_TO_CISCE_SUBJECT.get('Hindi'))
chapters = get_chapters_for_grade(12)
hindi = [c for c in chapters if 'hindi' in (c['cisce_subject'] or '').lower() or 'Hindi' in c['cbse_subject']]
print(f'Hindi found: {len(hindi)}')
for h in hindi[:3]:
    print(f"  {h['file']}: cisce={h['cisce_subject']}, cbse={h['cbse_subject']}")
# Check what happened to Hindi folder
print("\nAll subjects found:")
subjects = set(c['cbse_subject'] for c in chapters)
print(sorted(subjects))
