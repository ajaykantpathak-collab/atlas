"""Preview full-section before/after for random converted files."""
import sys, os, json, random
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from delatex_w4 import delatex_body
from scan_depth_v2 import parse_sections

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
manifest = [json.loads(l) for l in open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "delatex_manifest.jsonl"), encoding="utf-8")]
dry = [m for m in manifest if m.get("dry")]
random.seed(11)
for m in random.sample(dry, 3):
    fn = m["file"]
    text = open(os.path.join(corpus, fn), encoding="utf-8", errors="replace").read()
    secs = parse_sections(text)
    print(f"\n############ {fn} edited={m['edited']}")
    for sec in m["edited"][:2]:
        new, n = delatex_body(secs[sec])
        print(f"--- {sec} ({n} groups) ---")
        print("BEFORE:", secs[sec][:600].replace("\n", " | "))
        print("AFTER :", new[:600].replace("\n", " | "))
