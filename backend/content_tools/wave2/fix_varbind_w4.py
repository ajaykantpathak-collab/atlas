"""Exact-replacement hand fixes for the two 'variable binding' phrases."""
import json, os, shutil, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from delatex_w4 import split_sections

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
BACKUP = os.path.join(HERE, "backups_w4")

FIXES = {
    "c11_cs_cbse_06_004.md": [
        ("explaining variable binding", "explaining how variables bind to values"),
    ],
    "c12_ip_cbse_06_010.md": [
        ("confusing **variable binding** (the name-to-memory-address link) with **value mutability**",
         "confusing **name binding** (the name-to-memory-address link) with **value mutability**"),
    ],
}

manifest = open(os.path.join(HERE, "delatex_manifest.jsonl"), "a", encoding="utf-8")
ok = 0
for fn, fixes in FIXES.items():
    path = os.path.join(CORPUS, fn)
    text = open(path, encoding="utf-8").read()
    bak = os.path.join(BACKUP, fn)
    if not os.path.exists(bak):
        shutil.copy2(path, bak)
    new_text = text
    missed = [b for b, _ in fixes if new_text.count(b) != 1]
    if missed:
        print(f"FAIL {fn}: not found exactly once:", missed)
        continue
    for b, a in fixes:
        new_text = new_text.replace(b, a)
    assert "variable binding" not in new_text.lower()
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(new_text)
    manifest.write(json.dumps({"file": fn, "edited": ["slop_phrase_fix"], "mode": "exact_replace"},
                              ensure_ascii=False) + "\n")
    ok += 1
manifest.close()
print(f"fixed={ok}")
