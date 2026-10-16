"""Second exact-replacement pass for the remaining phrase in c12_ip_cbse_06_010."""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
fn = "c12_ip_cbse_06_010.md"
path = os.path.join(CORPUS, fn)
text = open(path, encoding="utf-8").read()
before = 'Re-read the "Variable Binding vs Value Mutation" section in the NCERT Class 12 IP textbook'
after = 'Re-read the section on name binding versus value mutation in the NCERT Class 12 IP textbook'
assert text.count(before) == 1, text.count(before)
new_text = text.replace(before, after)
assert "variable binding" not in new_text.lower()
with open(path, "w", encoding="utf-8", newline="") as f:
    f.write(new_text)
with open(os.path.join(HERE, "delatex_manifest.jsonl"), "a", encoding="utf-8") as m:
    m.write(json.dumps({"file": fn, "edited": ["slop_phrase_fix_2"], "mode": "exact_replace"},
                       ensure_ascii=False) + "\n")
print("fixed occurrence 2")
