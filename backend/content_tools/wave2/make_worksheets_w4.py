"""Build authoring worksheets for R1 (short/filler defs), R2 tierA (walk<150), R3."""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections, wc

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
LATEX_D = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{")

r1 = json.load(open(os.path.join(HERE, "worklist_r1.json"), encoding="utf-8"))
r2a = json.load(open(os.path.join(HERE, "worklist_r2_tierA.json"), encoding="utf-8"))
r3 = json.load(open(os.path.join(HERE, "worklist_r3.json"), encoding="utf-8"))

ws1 = open(os.path.join(HERE, "ws_r1.jsonl"), "w", encoding="utf-8")
for item in r1:
    fn = item["file"]
    text = open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read()
    s = parse_sections(text)
    ws1.write(json.dumps({
        "file": fn, "subject": item["subject"], "cause": item["cause"],
        "def_words": item["def_words"],
        "definition": s.get("DEFINITION", ""),
        "walk_head": s.get("WALKTHROUGH", "")[:300],
        "title_hint": s.get("SCOPE_BOUNDARY", "")[:200],
    }, ensure_ascii=False) + "\n")
ws1.close()

ws2 = open(os.path.join(HERE, "ws_r2a.jsonl"), "w", encoding="utf-8")
for item in r2a:
    fn = item["file"]
    text = open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read()
    s = parse_sections(text)
    ws2.write(json.dumps({
        "file": fn, "subject": item["subject"], "walk_words": item["walk_words"],
        "definition": s.get("DEFINITION", "")[:400],
        "walkthrough": s.get("WALKTHROUGH", ""),
        "scope": s.get("SCOPE_BOUNDARY", "")[:250],
    }, ensure_ascii=False) + "\n")
ws2.close()

ws3 = open(os.path.join(HERE, "ws_r3.jsonl"), "w", encoding="utf-8")
for item in r3:
    fn = item["file"]
    text = open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read()
    s = parse_sections(text)
    ws3.write(json.dumps({
        "file": fn, "eli5_words": item["eli5_words"],
        "eli5": s.get("ELI5", ""), "definition": s.get("DEFINITION", "")[:300],
    }, ensure_ascii=False) + "\n")
ws3.close()
print("worksheets written: ws_r1", len(r1), "| ws_r2a", len(r2a), "| ws_r3", len(r3))
