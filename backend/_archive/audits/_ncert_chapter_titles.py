"""Build NCERT book chapter index: grade → subject → chapter_file → title.
Then load our CISCE nodes and match by subject+class to find coverage gaps.
"""
import re
from pathlib import Path
from collections import defaultdict

TEXT_CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")
PDF_DIR = Path(r"D:\node_generator\ncert-mcp\data\raw\ncert_pdfs")

# Grade letter mapping (from pipeline.py)
GRADE_LETTERS = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5,
    'f': 6, 'g': 7, 'h': 8, 'i': 9, 'j': 10,
    'k': 11, 'l': 12,
}

# Build index from PDF folder structure: grade_X/Subject_Name/chapter.pdf
book_index = defaultdict(lambda: defaultdict(list))  # grade → subject → [(file, title)]

for grade_dir in sorted(PDF_DIR.iterdir()):
    if not grade_dir.is_dir() or not grade_dir.name.startswith("grade_"):
        continue
    grade_num = int(grade_dir.name.split("_")[1])
    for subj_dir in sorted(grade_dir.iterdir()):
        if not subj_dir.is_dir():
            continue
        subj_name = subj_dir.name
        for pdf in sorted(subj_dir.glob("*.pdf")):
            cache_file = TEXT_CACHE / f"{pdf.stem}.txt"
            if not cache_file.exists():
                continue
            # Read first few lines to get chapter title
            try:
                lines = cache_file.read_text(encoding="utf-8", errors="replace").split("\n")
                # Find first meaningful line (chapter title)
                title = ""
                for line in lines[:15]:
                    line = line.strip()
                    if len(line) > 3 and not line.startswith("Reprint") and not line.startswith("CHAPTER"):
                        title = line
                        break
                book_index[grade_num][subj_name].append({
                    "file": pdf.stem,
                    "title": title[:80],
                    "size": cache_file.stat().st_size,
                })
            except:
                book_index[grade_num][subj_name].append({
                    "file": pdf.stem,
                    "title": "(error)",
                    "size": 0,
                })

# Print summary
print("=== NCERT BOOK INDEX ===")
total_chapters = 0
for grade in sorted(book_index.keys()):
    subjects = book_index[grade]
    grade_total = sum(len(chs) for chs in subjects.values())
    total_chapters += grade_total
    print(f"\nGrade {grade} ({grade_total} chapters):")
    for subj, chapters in sorted(subjects.items()):
        print(f"  {subj}: {len(chapters)} chapters")
        for ch in chapters[:3]:
            print(f"    {ch['file']}: {ch['title']} ({ch['size']//1024}KB)")
        if len(chapters) > 3:
            print(f"    ... +{len(chapters)-3} more")

print(f"\nTOTAL: {total_chapters} book chapters across all grades")

# Save index
import json
out = Path(r"D:\platform\backend\_ncert_book_index.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump({str(k): dict(v) for k, v in book_index.items()}, f, indent=2, ensure_ascii=False)
print(f"\nIndex saved to {out}")
