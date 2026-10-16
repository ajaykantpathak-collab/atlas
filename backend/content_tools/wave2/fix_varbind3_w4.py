"""Sequential exact-replacement fixes for both phrases in c12_ip_cbse_06_010."""
import json, os, shutil
HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
fn = "c12_ip_cbse_06_010.md"
path = os.path.join(CORPUS, fn)
text = open(path, encoding="utf-8").read()
BAK = os.path.join(HERE, "backups_w4", fn)
if not os.path.exists(BAK):
    shutil.copy2(path, BAK)

fixes = [
    ("confusing **variable binding** (the name-to-memory-address link) with **value mutability**",
     "confusing **name binding** (the name-to-memory-address link) with **value mutability**"),
    ('Re-read the "Variable Binding vs Value Mutation" section in the NCERT Class 12 IP textbook',
     'Re-read the section on name binding versus value mutation in the NCERT Class 12 IP textbook'),
]
new_text = text
for b, a in fixes:
    assert new_text.count(b) == 1, (b[:40], new_text.count(b))
    new_text = new_text.replace(b, a)
assert new_text.lower().count("variable binding") == 0
with open(path, "w", encoding="utf-8", newline="") as f:
    f.write(new_text)
with open(os.path.join(HERE, "delatex_manifest.jsonl"), "a", encoding="utf-8") as m:
    m.write(json.dumps({"file": fn, "edited": ["slop_phrase_fix_both"], "mode": "exact_replace"},
                       ensure_ascii=False) + "\n")
print("both occurrences fixed")
