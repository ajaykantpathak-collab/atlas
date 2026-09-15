"""gate_check_all.py -- validate every live catalog through the platform gate,
copy gate-passed ones to verified_catalogs/."""
import json, os, sys, shutil

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))

from bulk_catalog_generator import validate_catalog

LIVE = r"backend\its\competency"
VERIFIED = os.path.join(LIVE, "verified_catalogs")
CACHE = r"D:\node_generator\ncert-mcp\data\processed\text_cache"
NEW_CACHE = r"D:\node_generator\ncert-mcp\data\processed\text_cache_new"

os.makedirs(VERIFIED, exist_ok=True)
files = sorted(f for f in os.listdir(LIVE) if f.endswith(".json") and f.startswith("catalog_"))
passed, failed, no_src = 0, 0, 0
fail_detail = []
for f in files:
    path = os.path.join(LIVE, f)
    try:
        cat = json.load(open(path, encoding="utf-8"))
    except Exception:
        failed += 1; continue
    sf = cat.get("source_file", "")
    text = ""
    for base in (NEW_CACHE, CACHE):
        if not sf:
            break
        fp = os.path.join(base, os.path.basename(sf))
        if os.path.exists(fp):
            text = open(fp, encoding="utf-8", errors="ignore").read()
            break
    ok, problems = validate_catalog(cat, text)
    if ok:
        passed += 1
        shutil.copy2(path, os.path.join(VERIFIED, f))
    else:
        failed += 1
        r = problems[0][:60] if problems else "unknown"
        fail_detail.append((f, r))
print(f"GATE PASS: {passed} | GATE FAIL: {failed}")
for f, r in fail_detail[:20]:
    print(f"  FAIL {f}: {r}")
