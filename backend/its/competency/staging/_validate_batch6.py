"""_validate_batch6.py -- gate-check batch 6 staged catalogs."""
import json
import sys
from pathlib import Path

ROOT = Path(r"D:\platform")
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "backend" / "tools"))
from bulk_catalog_generator import validate_catalog  # noqa: E402

STAGING = ROOT / "backend" / "its" / "competency" / "staging"
CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache_new")


def main(patterns):
    files = []
    for pat in patterns:
        files.extend(sorted(STAGING.glob(pat)))
    if not files:
        print("no files matched")
        return
    ok_n = 0
    for f in files:
        cat = json.loads(f.read_text(encoding="utf-8"))
        src = CACHE / (cat.get("source_file", "").replace("\\", "/").split("/")[-1])
        if not src.exists():
            print(f"{f.name}: SOURCE MISSING {src}")
            continue
        ok, problems = validate_catalog(cat, src.read_text(encoding="utf-8", errors="ignore"))
        nconcepts = len(cat.get("concepts", []))
        nqps = min((len(c.get("question_patterns", [])) for c in cat["concepts"]), default=0)
        ncompute = sum(1 for c in cat["concepts"] if c.get("solution_type") == "compute")
        status = "OK" if ok else "FAIL"
        ok_n += ok
        print(f"{f.name}: {status} concepts={nconcepts} min_qp={nqps} compute={ncompute} {problems if problems else ''}")
    print(f"\n{ok_n}/{len(files)} passed")


if __name__ == "__main__":
    main(sys.argv[1:] or ["catalog_class12_*.json"])
