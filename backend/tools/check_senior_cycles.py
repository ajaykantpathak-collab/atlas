"""Re-derive c11/c12 PREREQUISITE_OF edges from md truth and count remaining SCCs."""
import os
import re
from collections import defaultdict

MD = r"C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache"
SECTIONS = ("PREREQUISITE_NODE_IDS",)

edges = defaultdict(set)
nodes = set()
parsed = 0
for fname in sorted(os.listdir(MD)):
    if not (fname.startswith("c11_") or fname.startswith("c12_")) or not fname.endswith(".md"):
        continue
    nodes.add(fname[:-3])
    src = fname[:-3]
    try:
        text = open(os.path.join(MD, fname), encoding="utf-8", errors="ignore").read()
    except OSError:
        continue
    parsed += 1
    m = re.search(r"## PREREQUISITE_NODE_IDS\s*\n([^\n]*)", text)
    if not m:
        continue
    for tok in m.group(1).split(","):
        tgt = tok.strip()
        if tgt and tgt in nodes | set():
            edges[src].add(tgt)

# Tarjan SCC (iterative)
index_counter = [0]
stack, index, lowlink, on_stack = [], {}, {}, set()
sccs = []
for v in list(nodes):
    if v in index:
        continue
    work = [(v, iter(edges.get(v, ())))]
    index[v] = lowlink[v] = index_counter[0]
    index_counter[0] += 1
    stack.append(v)
    on_stack.add(v)
    while work:
        node, it = work[-1]
        advanced = False
        for w in it:
            if w not in nodes:
                continue
            if w not in index:
                index[w] = lowlink[w] = index_counter[0]
                index_counter[0] += 1
                stack.append(w)
                on_stack.add(w)
                work.append((w, iter(edges.get(w, ()))))
                advanced = True
                break
            elif w in on_stack:
                lowlink[node] = min(lowlink[node], index[w])
        if advanced:
            continue
        work.pop()
        if lowlink[node] == index[node]:
            comp = []
            while True:
                w = stack.pop()
                on_stack.discard(w)
                comp.append(w)
                if w == node:
                    break
            if len(comp) > 1:
                sccs.append(comp)

print("c11/c12 files parsed:", parsed)
print("remaining multi-node SCCs:", len(sccs))
print("nodes inside cycles:", sum(len(c) for c in sccs))
for comp in sccs[:8]:
    print("  ", len(comp), ":", sorted(comp)[:6])
