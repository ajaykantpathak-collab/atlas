# Find Class 9 PDFs with no text cache
from pathlib import Path
PDF_DIR = Path(r"D:\node_generator\ncert-mcp\data\raw\ncert_pdfs")
TEXT_CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")
SKIP_CBSE_FOLDERS = {
    "Fine_Art", "Knowledge_Traditions_Practices_of_India", "Skill_Education",
    "Arts", "Health_and_Physical_Education", "Physical_Education_and_Well_Being",
    "Entrepreneurship",
}
grade_dir = PDF_DIR / "grade_9"
seen = set()
missing = []
for subj_dir in sorted(grade_dir.iterdir()):
    if not subj_dir.is_dir():
        continue
    if subj_dir.name in SKIP_CBSE_FOLDERS:
        continue
    for pdf in sorted(subj_dir.glob("*.pdf")):
        if pdf.stem in seen:
            continue
        seen.add(pdf.stem)
        cache_file = TEXT_CACHE / f"{pdf.stem}.txt"
        if not cache_file.exists():
            missing.append((pdf.stem, subj_dir.name, str(pdf)))
print(f"Class 9 missing text cache: {len(missing)}")
for stem, folder, path in missing:
    print(f"  {stem}  folder={folder}  pdf={path}")
