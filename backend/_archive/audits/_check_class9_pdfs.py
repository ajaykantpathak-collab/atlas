from pathlib import Path
base = Path(r"D:\node_generator\ncert-mcp\data\raw\ncert_pdfs\grade_9\Civics")
for name in ["iess403.pdf", "iess404.pdf", "iess405.pdf"]:
    p = base / name
    print(name, p.stat().st_size, "bytes")
    # Try pdfplumber
    try:
        import pdfplumber
        with pdfplumber.open(p) as pdf:
            print(f"  pdfplumber: {len(pdf.pages)} pages")
            for i, page in enumerate(pdf.pages[:3]):
                t = page.extract_text() or ""
                print(f"  page {i+1}: {len(t)} chars, first 100: {t[:100]!r}")
    except Exception as e:
        print(f"  pdfplumber error: {e}")
    # Try fitz
    try:
        import fitz
        doc = fitz.open(str(p))
        print(f"  fitz: {len(doc)} pages")
        for i in range(min(3, len(doc))):
            t = doc[i].get_text()
            print(f"  page {i+1}: {len(t)} chars, first 100: {t[:100]!r}")
        # Check for images
        img_count = 0
        for i in range(len(doc)):
            img_count += len(doc[i].get_images())
        print(f"  images across all pages: {img_count}")
        doc.close()
    except Exception as e:
        print(f"  fitz error: {e}")
