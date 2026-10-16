"""W4 probe: exact shapes of prose-hygiene failures in the c11/c12 lane."""
import json, os, re, sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
ID_RE = re.compile(r"\bc\d+_[a-z0-9]+_[a-z0-9_]*", re.I)
LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{|\$[^$]+\$")
BANNED = ["Lane C", "variable binding", "This node covers", "TBD", "placeholder", "Lorem"]

recs = [json.loads(l) for l in open(os.path.join(HERE, "w4_lane_scores.jsonl"), encoding="utf-8")]
files = [r["file"] for r in recs if not r["parked"]]

id_shape = Counter()
id_section = Counter()
paren_variants = Counter()
slop_hits = Counter()
latex_tok = Counter()
latex_examples = []
bare_examples = []

for fn in files:
    text = open(os.path.join(CORPUS, fn), encoding="utf-8", errors="replace").read()
    secs = parse_sections(text)
    for k, body in secs.items():
        is_prose = (k in ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")
                    or k.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_")))
        if not is_prose:
            continue
        low = body.lower()
        for b in BANNED:
            if b.lower() in low:
                slop_hits[(b, k)] += 1
        for m in LATEX_RE.finditer(body):
            latex_tok[m.group(0)[:24]] += 1
            if len(latex_examples) < 12:
                latex_examples.append((fn, k, body[max(0, m.start()-50):m.end()+60].replace("\n", " ")))
        for m in ID_RE.finditer(body):
            id_section[k] += 1
            s, e = m.start(), m.end()
            before = body[max(0, s-1):s]
            after = body[e:e+1]
            if before == "(" and after in ")\n ,;:.":
                id_shape["(id) paren"] += 1
            elif body[max(0, s-1)] == "(" :
                id_shape["(id ... paren-open"] += 1
                if len(paren_variants) < 25 or True:
                    paren_variants[body[max(0, s-40):min(len(body), e+60)].replace("\n", " ")] += 1
            elif after == ":":
                id_shape["id: colon"] += 1
                if len(bare_examples) < 15:
                    bare_examples.append((fn, k, body[max(0, s-60):min(len(body), e+60)].replace("\n", " ")))
            else:
                id_shape["bare/other"] += 1
                if len(bare_examples) < 15:
                    pass

print("id refs by shape:", dict(id_shape))
print("\nid refs by prose section:", dict(id_section.most_common()))
print("\nparen-open variants (sample):")
for v, c in list(paren_variants.items())[:15]:
    print(f"  [{c}] ...{v}...")
print("\ncolon examples:")
for fn, k, ex in bare_examples[:12]:
    print(f"  [{k}] {fn}: ...{ex}...")
print("\nslop (string, section):", dict(slop_hits.most_common()))
print("\nlatex tokens:", dict(latex_tok.most_common(10)))
print("\nlatex examples:")
for fn, k, ex in latex_examples[:10]:
    print(f"  [{k}] {fn}: ...{ex}...")
