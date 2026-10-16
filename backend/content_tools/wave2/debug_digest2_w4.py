import sys, os, hashlib
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, ".")
from delatex_w4 import (delatex_body, DOLLAR_RE, _dollar_ok, split_sections,
                        DELIM_RE, PROSE_HEADS, PROSE_FIXED, SURVIVOR_RE)

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
fn = "c11_math_cbse_13_003.md"
text = open(os.path.join(corpus, fn), encoding="utf-8", errors="replace").read()
preamble, parts = split_sections(text)
prose_idx = [i for i, p in enumerate(parts)
             if p[1] in PROSE_FIXED or p[1].startswith(PROSE_HEADS)]
dirty = [i for i in prose_idx if DELIM_RE.search(parts[i][2]) or DOLLAR_RE.search(parts[i][2])]
new_parts = [list(p) for p in parts]
edited = set()
for i in dirty:
    body = parts[i][2]
    new_body, _ = delatex_body(body)
    masked = DOLLAR_RE.sub(lambda mm: "" if not _dollar_ok(mm.group(1)) else "  ", new_body)
    if SURVIVOR_RE.search(masked):
        continue
    if new_body != body:
        new_parts[i][2] = new_body
        edited.add(parts[i][1])
new_text = "".join([preamble] + [p[0] + p[2] for p in new_parts])
npreamble, nparts = split_sections(new_text)

def contrib(header, name, body, edited):
    h = hashlib.sha256()
    h.update(header.encode("utf-8"))
    if name not in edited:
        h.update(body.encode("utf-8"))
    return h.hexdigest()[:12], (header if name in edited else header + body)

for k in range(max(len(parts), len(nparts))):
    p1 = parts[k] if k < len(parts) else None
    p2 = nparts[k] if k < len(nparts) else None
    c1 = contrib(*p1, edited) if p1 else "MISSING"
    c2 = contrib(*p2, edited) if p2 else "MISSING"
    if c1[0] != c2[0]:
        print(f"delta at [{k}] {p1[1]}:")
        print("  pre :", repr(c1[1])[:160])
        print("  post:", repr(c2[1])[:160])
