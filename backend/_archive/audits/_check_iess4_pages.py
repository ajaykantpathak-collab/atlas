import fitz
from pathlib import Path

base = Path(r"D:\node_generator\ncert-mcp\data\raw\ncert_pdfs\grade_9\Civics")
for name in ["iess401.pdf", "iess402.pdf", "iess403.pdf", "iess404.pdf", "iess405.pdf"]:
    p = base / name
    doc = fitz.open(str(p))
    pages = len(doc)
    # Try to get any text from first/last page (even from images, sometimes there's a tiny bit)
    first_text = doc[0].get_text().strip()[:200] if pages > 0 else ""
    doc.close()
    print(f"{name}: {pages} pages, first text: {first_text!r}")
