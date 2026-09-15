"""Re-extract text from PDFs for the 18 missing chapters."""
import fitz  # PyMuPDF
from pathlib import Path

PDF_DIR = Path(r"D:\node_generator\ncert-mcp\data\raw\ncert_pdfs")
TEXT_CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")

# Map chapter codes to PDF paths
missing = {
    # grade 6 Social_Science (history_civics)
    "fess101": "grade_6/Social_Science/fess101.pdf",
    "fess102": "grade_6/Social_Science/fess102.pdf",
    "fess103": "grade_6/Social_Science/fess103.pdf",
    "fess104": "grade_6/Social_Science/fess104.pdf",
    "fess105": "grade_6/Social_Science/fess105.pdf",
    "fess106": "grade_6/Social_Science/fess106.pdf",
    "fess107": "grade_6/Social_Science/fess107.pdf",
    "fess108": "grade_6/Social_Science/fess108.pdf",
    "fess109": "grade_6/Social_Science/fess109.pdf",
    "fess110": "grade_6/Social_Science/fess110.pdf",
    "fess111": "grade_6/Social_Science/fess111.pdf",
    # grade 11 Geography
    "kegy101": "grade_11/Geography/kegy101.pdf",
    "kegy102": "grade_11/Geography/kegy102.pdf",
    "kegy103": "grade_11/Geography/kegy103.pdf",
    "kegy105": "grade_11/Geography/kegy105.pdf",
    "kegy106": "grade_11/Geography/kegy106.pdf",
    "kegy107": "grade_11/Geography/kegy107.pdf",
    # grade 11 English
    "keww101": "grade_11/English/keww101.pdf",
}

for code, rel_path in missing.items():
    pdf_path = PDF_DIR / rel_path
    cache_path = TEXT_CACHE / f"{code}.txt"
    
    if not pdf_path.exists():
        print(f"  {code}: PDF NOT FOUND at {pdf_path}")
        continue
    
    try:
        doc = fitz.open(str(pdf_path))
        text_parts = []
        for page_num in range(len(doc)):
            page = doc[page_num]
            text = page.get_text("text")
            if text.strip():
                text_parts.append(text.strip())
        doc.close()
        
        full_text = "\n\n".join(text_parts)
        
        # Write to cache (overwrite the broken extraction)
        cache_path.write_text(full_text, encoding="utf-8")
        print(f"  {code}: extracted {len(full_text)} chars from {len(text_parts)} pages")
    except Exception as e:
        print(f"  {code}: ERROR - {e}")

print("\nDone! Re-extraction complete.")
