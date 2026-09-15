"""Check new subjects are picked up by pipeline."""
from cbse_coverage_pipeline import get_chapters_for_grade

for g in [9, 10, 11, 12]:
    chapters = get_chapters_for_grade(g)
    new = [c for c in chapters if c["cbse_subject"] in ("Artificial_Intelligence", "Applied_Mathematics", "Legal_Studies")]
    if new:
        print(f"Grade {g}:")
        for c in new:
            size = c["size"] / 1024
            print(f"  {c['file']} - {c['cbse_subject']} - {size:.0f} KB")
