"""Quick test on the 6 files that produced 0 nodes."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from backend.content_parsers.enrichment_parser import parse_file

files = [
    r"D:\cisce\cs\enrichment\c2_cs_enrichment_part7.marker",
    r"D:\cisce\physics\enrichment\c6_physics_enrichment_part37.marker",
    r"D:\cisce\physics\enrichment\c7_physics_enrichment_part36.marker",
    r"D:\cisce\physics\enrichment\c8_physics_enrichment_part36.marker",
    r"D:\cisce\physics\enrichment\c8_physics_enrichment_part37.marker",
    r"D:\cisce\physics\enrichment\c10_physics_enrichment_part43.marker",
]

for f in files:
    path = Path(f)
    records = parse_file(path)
    name = path.name
    print(f"{name}: {len(records)} nodes")
    if records:
        first = records[0]
        nid = first['node_id']
        title = first['title']
        print(f"  First: {nid} - {title}")
    else:
        content = path.read_text(encoding="utf-8-sig")
        lines = content.split("\n")
        first_line = lines[0][:80]
        print(f"  Lines: {len(lines)}, first: {repr(first_line)}")
        if "\\n" in content[:200]:
            print("  ISSUE: literal backslash-n characters (file is one line)")
