# -*- coding: utf-8 -*-
"""Cross-class placement audit.
For each corpus file: extract topic keywords from DEFINITION,
score against each class's book texts (title + section headings).
Flag nodes whose best-matching book is a different class."""
import re, os, glob, json
from collections import defaultdict

BOOKS = r"D:\platform\ncert_books\text_cache_new"
CORPUS = r"D:\platform\deploy\content\enhananced_nodes_md".replace("enhananced","enhanced")

STOP = set('the of and in on a an to for is are with by from at as or it its what who how when where why do does can will may this that these those each every any all more most some such other than then into over under between about after before during through within their there here been being have has had were was were not but if our your you we he she they them his her my'.split())

def words(text, minlen=5):
    return set(w for w in re.findall(r"[a-z']{5,}", text.lower()) if w not in STOP)

# per-class book keyword universe + per-chapter keyword sets
class_words = {}   # cls -> set of content words in all its books
class_books = {}   # cls -> {chapter_file: (title, wordset)}
for cls_dir in sorted(os.listdir(BOOKS)):
    cm = re.match(r'class_(\d+)', cls_dir)
    if not cm: continue
    cls = 'c' + cm.group(1)
    misc = os.path.join(BOOKS, cls_dir, 'misc')
    if not os.path.isdir(misc): continue
    chs = {}
    allw = set()
    for fn in sorted(os.listdir(misc)):
        if not fn.endswith('.txt'): continue
        code = re.sub(r'\d+\.txt$', '', fn)
        m = re.search(r'(\d+)\.txt$', fn)
        if not m or code.endswith(('ps','gl','pr')) or fn.endswith(('ps.txt','gl.txt')): continue
        ch = int(m.group(1)) % 100
        txt = open(os.path.join(misc, fn), encoding='utf-8', errors='ignore').read()
        # title = first lines; head = first 4000 chars for keywords
        lines = [l.strip() for l in txt.split('\n') if l.strip() and '---' not in l and 'Reprint' not in l]
        title = ' '.join(lines[:4])[:80]
        w = words(txt[:8000])
        chs[f"{code}{ch}"] = (title, w)
        allw |= w
    class_words[cls] = allw
    class_books[cls] = chs

CLASSES = sorted(class_words)
print("classes:", CLASSES, "| corpus loading...")

# corpus per file: node_id -> def words
nodes = {}
for fn in glob.glob(os.path.join(CORPUS, 'c*_*.md')):
    base = os.path.basename(fn)[:-3]
    m = re.match(r'(c\d+)_', base)
    if not m: continue
    try: txt = open(fn, encoding='utf-8', errors='ignore').read()
    except: continue
    dm = re.search(r'##\s*DEFINITION\s*\n(.{20,500})', txt)
    em = re.search(r'##\s*ELI5\s*\n(.{20,400})', txt)
    topic = (dm.group(1) if dm else '') + ' ' + (em.group(1) if em else '')
    nodes[base] = (m.group(1), words(topic))

print(f"nodes: {len(nodes)}")

# score each node against each class's book words
mismatch = []   # (node, own_class, best_class, own_hits, best_hits)
for nid, (own, ws) in nodes.items():
    if not ws: continue
    scores = {c: len(ws & class_words[c]) for c in CLASSES}
    best = max(scores, key=scores.get)
    if best != own and scores[best] >= 3 and scores[best] > scores[own] + 1:
        mismatch.append((nid, own, best, scores[own], scores[best]))

print(f"\n=== MISFILED nodes (content matches another class better) ===")
bycls = defaultdict(list)
for row in mismatch: bycls[row[1]].append(row)
for c in sorted(bycls):
    print(f"\n{c}: {len(bycls[c])} misfiled")
    for nid, own, best, s_own, s_best in bycls[c][:15]:
        print(f"   {nid}  own={s_own} hits -> {best}={s_best}")

json.dump({'misfiled': mismatch}, open('audit_placement.json','w'), indent=1)
