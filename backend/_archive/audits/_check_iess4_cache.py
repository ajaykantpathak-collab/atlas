from pathlib import Path
TEXT_CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")
# Check existing iess4xx cache files (Class 9 Civics)
iess4 = sorted(TEXT_CACHE.glob("iess4*.txt"))
print(f"Existing iess4xx cache files: {len(iess4)}")
for f in iess4:
    print(f"  {f.name}  {f.stat().st_size} bytes")
# Also check iess3xx (might be from avallark)
iess3 = sorted(TEXT_CACHE.glob("iess3*.txt"))
print(f"\nExisting iess3xx cache files: {len(iess3)}")
for f in iess3:
    print(f"  {f.name}  {f.stat().st_size} bytes")
# Check if avallark civics PDF already downloaded
avallark = Path(r"D:\node_generator\ncert-mcp\data\raw\ncert_pdfs\grade_9\Civics\Civics_Text\9th-Democratic-Politics.pdf")
print(f"\nAvallark Civics PDF exists: {avallark.exists()}")
if avallark.exists():
    print(f"  Size: {avallark.stat().st_size} bytes")
# Check all grade_9 Civics PDFs
civics_dir = Path(r"D:\node_generator\ncert-mcp\data\raw\ncert_pdfs\grade_9\Civics")
print(f"\nAll grade_9/Civics subdirs:")
for d in sorted(civics_dir.iterdir()):
    if d.is_dir():
        pdfs = list(d.glob("*.pdf"))
        print(f"  {d.name}: {len(pdfs)} PDFs")
        for p in sorted(pdfs)[:5]:
            print(f"    {p.name} ({p.stat().st_size//1024}KB)")
# Also check top-level Civics PDFs
top_pdfs = sorted(civics_dir.glob("*.pdf"))
print(f"\nTop-level grade_9/Civics PDFs: {len(top_pdfs)}")
for p in top_pdfs:
    cache = TEXT_CACHE / f"{p.stem}.txt"
    has_cache = "YES" if cache.exists() else "NO"
    print(f"  {p.name} ({p.stat().st_size//1024}KB) cache={has_cache}")
