# Audit NCERT PDFs and text cache coverage by grade.
# READ-ONLY: only counts and reports, does not modify anything.
from pathlib import Path
from collections import defaultdict

PDF_DIR = Path(r"D:\node_generator\ncert-mcp\data\raw\ncert_pdfs")
TEXT_CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")

SKIP_CBSE_FOLDERS = {
    "Fine_Art", "Knowledge_Traditions_Practices_of_India", "Skill_Education",
    "Arts", "Health_and_Physical_Education", "Physical_Education_and_Well_Being",
    "Entrepreneurship",
}

total_pdfs = 0
total_excluded = 0
total_no_cache = 0
total_included = 0

print("=" * 80)
print("NCERT PDF AUDIT BY GRADE")
print("=" * 80)
print(f"{'Grade':<10}{'PDFs':<8}{'Excluded':<10}{'NoCache':<8}{'Included':<10}")
print("-" * 80)

grand_pdfs = 0
grand_excluded = 0
grand_no_cache = 0
grand_included = 0

for g in range(1, 13):
    grade_dir = PDF_DIR / f"grade_{g}"
    if not grade_dir.exists():
        print(f"  Grade {g:<4} (no directory)")
        continue
    pdfs = 0
    excluded = 0
    no_cache = 0
    included = 0
    seen = set()
    by_folder = defaultdict(int)
    by_excluded_folder = defaultdict(int)
    for subj_dir in sorted(grade_dir.iterdir()):
        if not subj_dir.is_dir():
            continue
        folder_pdfs = list(subj_dir.glob("*.pdf"))
        if subj_dir.name in SKIP_CBSE_FOLDERS:
            excluded += len(folder_pdfs)
            by_excluded_folder[subj_dir.name] += len(folder_pdfs)
            continue
        for pdf in folder_pdfs:
            if pdf.stem in seen:
                continue
            seen.add(pdf.stem)
            pdfs += 1
            cache_file = TEXT_CACHE / f"{pdf.stem}.txt"
            if not cache_file.exists():
                no_cache += 1
            else:
                included += 1
            by_folder[subj_dir.name] += 1
    grand_pdfs += pdfs
    grand_excluded += excluded
    grand_no_cache += no_cache
    grand_included += included
    print(f"  Grade {g:<4}{pdfs:<8}{excluded:<10}{no_cache:<8}{included:<10}")
    if by_excluded_folder:
        for f, n in sorted(by_excluded_folder.items()):
            print(f"           excluded: {f} = {n}")
    if by_folder:
        folders_str = ", ".join(f"{f}={n}" for f, n in sorted(by_folder.items()))
        print(f"           folders: {folders_str}")

print("-" * 80)
print(f"  TOTAL   {grand_pdfs:<8}{grand_excluded:<10}{grand_no_cache:<8}{grand_included:<10}")
print()
print(f"Text cache files total: {len(list(TEXT_CACHE.glob('*.txt')))}")
