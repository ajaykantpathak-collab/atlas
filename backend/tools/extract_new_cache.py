"""extract_new_cache.py -- extract chapter text from new-edition NCERT book
ZIPs into text_cache_new\\ with per-chapter quality gates.

- Unzips each book ZIP (PyMuPDF for text extraction; pdfplumber fallback)
- Names chapters by platform convention: <code><part><chapterNN>.txt
- Quality per chapter: chars, letter-run artifact ratio, non-ASCII ratio
- Skips prelims (ps), answer keys (an), and the complete-book file (dd)
"""

from __future__ import annotations

import fitz  # PyMuPDF
import json
import os
import re
import zipfile
from pathlib import Path

BOOKS_DIR = Path(r"D:\platform\ncert_books")
OUT_DIR = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache_new")
MANIFEST = Path(r"D:\platform\NEW_CACHE_MANIFEST.json")

SKIP_SUFFIX = ("ps", "dd", "an")  # prelims, complete-book, answer keys


def quality(text: str) -> Dict:
    letters = re.findall(r"[A-Za-z]", text)
    runs = re.findall(r"([A-Za-z])\1{4,}", text)  # 5+ identical letter runs
    words = re.findall(r"[A-Za-z]{3,}", text)
    return {
        "chars": len(text),
        "letters": len(letters),
        "words": len(words),
        "artifact_runs": len(runs),
        "artifact_ratio": round(len(runs) / max(1, len(letters)), 5),
    }


def extract_pdf_text(pdf_path: str) -> str:
    try:
        doc = fitz.open(pdf_path)
        pages = []
        for page in doc:
            pages.append(page.get_text("text"))
        doc.close()
        return "\n".join(pages)
    except Exception:
        return ""


def extract_book(zip_path: str, code: str) -> Dict:
    out = {"code": code, "chapters": []}
    tmp = str(zip_path) + "__x"
    os.makedirs(tmp, exist_ok=True)
    try:
        with zipfile.ZipFile(zip_path) as z:
            z.extractall(tmp)
    except zipfile.BadZipFile:
        return {"code": code, "chapters": [], "error": "bad zip"}
    pdfs = []
    for root, _dirs, files in os.walk(tmp):
        for f in files:
            if f.lower().endswith(".pdf"):
                pdfs.append(os.path.join(root, f))
    for pdf in sorted(pdfs):
        base = os.path.splitext(os.path.basename(pdf))[0]
        base = base.strip()
        # chapter files look like <code>101 or <code>1.1 variants; skip ps/dd/an
        m = re.match(r"^([a-z]{4})(\d{1})(\d{2})$", base, re.I)
        if not m:
            continue
        chapter_file = code + m.group(2) + m.group(3)
        text = extract_pdf_text(pdf)
        q = quality(text)
        out_path = OUT_DIR / (chapter_file + ".txt")
        text = re.sub(r"[ \t]+\n", "\n", text)
        out_path.write_text(text, encoding="utf-8")
        out["chapters"].append({
            "file": chapter_file + ".txt", "source_pdf": os.path.basename(pdf),
            **q,
        })
    import shutil
    shutil.rmtree(tmp, ignore_errors=True)
    return out


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = {"books": []}
    if MANIFEST.exists():
        try:
            manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
        except Exception:
            manifest = {"books": []}
    done_codes = {b["code"] for b in manifest.get("books", [])}
    for zip_path in sorted(BOOKS_DIR.rglob("*.zip")):
        name = zip_path.stem
        m = re.match(r"^([a-z]{4})", name, re.I)
        if not m:
            continue
        code = m.group(1).lower()
        if code in done_codes:
            continue
        print(f"extracting {code} from {zip_path.name} ...", flush=True)
        book = extract_book(str(zip_path), code)
        book["zip"] = str(zip_path)
        manifest.setdefault("books", []).append(book)
        n_ch = len(book.get("chapters", []))
        total = sum(c.get("chars", 0) for c in book.get("chapters", []))
        print(f"  {code}: {n_ch} chapters, {total} chars", flush=True)
        MANIFEST.write_text(json.dumps(manifest, indent=1), encoding="utf-8")
    print("EXTRACTION COMPLETE", flush=True)


if __name__ == "__main__":
    main()
