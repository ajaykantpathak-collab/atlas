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
print("dirty:", [parts[i][1] for i in dirty])

new_parts = [list(p) for p in parts]
edited = set()
for i in dirty:
    body = parts[i][2]
    new_body, _ = delatex_body(body)
    masked = DOLLAR_RE.sub(lambda mm: "" if not _dollar_ok(mm.group(1)) else "  ", new_body)
    if SURVIVOR_RE.search(masked):
        print("survivor in", parts[i][1])
        continue
    if new_body != body:
        new_parts[i][2] = new_body
        edited.add(parts[i][1])
print("edited:", sorted(edited))

def digest_except(preamble, parts, edited):
    h = hashlib.sha256()
    h.update(preamble.encode("utf-8"))
    for header, name, body in parts:
        h.update(header.encode("utf-8"))
        if name not in edited:
            h.update(body.encode("utf-8"))
    return h.hexdigest()

pre = digest_except(preamble, parts, edited)
new_text = "".join([preamble] + [p[0] + p[2] for p in new_parts])
npreamble, nparts = split_sections(new_text)
post = digest_except(npreamble, nparts, edited)
print("pre==post:", pre == post)
print("npreamble==preamble:", npreamble == preamble)
print("n parts:", len(parts), len(nparts))
old_names = [p[1] for p in parts]
new_names = [p[1] for p in nparts]
if old_names != new_names:
    print("SECTION NAMES DIFFER:")
    for a, b in zip(old_names + [""] * 9, new_names + [""] * 9):
        if a != b:
            print("  ", a, "!=", b)
else:
    for (h1, n1, b1), (h2, n2, b2) in zip(parts, nparts):
        if n1 in edited:
            continue
        if b1 != b2 or h1 != h2:
            print("DIFF in", n1)
            print("  old:", repr(b1[:120]))
            print("  new:", repr(b2[:120]))
