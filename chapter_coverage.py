# -*- coding: utf-8 -*-
"""Book-chapter coverage diff: for every class, every book chapter ->
covered / missing in corpus. Hindi books checked by chapter-group count."""
import re, os, json, glob
from collections import defaultdict

BOOKS = r"D:\platform\ncert_books\text_cache_new"
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"

BOOK_SUBJECT = {  # book prefix -> likely corpus subject code (for Hindi deva check)
}

STOP = set('the of and in on a an to for is are with by from at as or it its what who how when where why do does chapter page reprint edition first your you we our us let this that these those each every can will may'.split())

def title_of(txt, take=5):
    lines = [l.strip() for l in txt.split('\n')]
    lines = [l for l in lines if l and '---' not in l and 'Reprint' not in l
             and len(l) > 2 and not l.replace('.','').isdigit()]
    return ' '.join(lines[:take])[:100]

def keywords(title):
    words = re.findall(r"[A-Za-z][a-zA-Z']{4,}", title)
    return [w.lower() for w in words if w.lower() not in STOP][:5]

# per-class corpus: filename -> body text (lowercase)
corpus = defaultdict(list)
for fn in glob.glob(os.path.join(CORPUS, 'c*_*.md')):
    m = re.match(r'(c\d+)_', os.path.basename(fn))
    if not m: continue
    corpus[m.group(1)].append(fn)

bodies = {}
for cls, files in corpus.items():
    txts = []
    for fn in files:
        try:
            txts.append(open(fn, encoding='utf-8', errors='ignore').read().lower())
        except: pass
    bodies[cls] = txts

# Hindi corpus chapter groups per class (filename chapter slots)
hin_groups = defaultdict(set)
for fn in glob.glob(os.path.join(CORPUS, 'c*_hin_*.md')):
    m = re.match(r'(c\d+)_hin_.*?(\d+)_\d+\.md', os.path.basename(fn))
    if m: hin_groups[m.group(1)].add(int(m.group(2)))

result = {}
for cls_dir in sorted(os.listdir(BOOKS)):
    cm = re.match(r'class_(\d+)', cls_dir)
    if not cm: continue
    cls = 'c' + cm.group(1)
    misc = os.path.join(BOOKS, cls_dir, 'misc')
    if not os.path.isdir(misc): continue
    cls_bodies = bodies.get(cls, [])
    books = defaultdict(list)
    for fn in sorted(os.listdir(misc)):
        if not fn.endswith('.txt'): continue
        num = re.search(r'(\d+)\.txt$', fn)
        code = re.sub(r'\d+\.txt$', '', fn)
        if not num or code.endswith(('ps','gl','gll','pr')) or fn.endswith(('ps.txt','gl.txt')): continue
        ch = int(num.group(1)) % 100
        txt = open(os.path.join(misc, fn), encoding='utf-8', errors='ignore').read()
        books[code].append((ch, fn, txt))

    cls_res = {}
    for code, chs in books.items():
        miss, cov, thin = [], [], []
        is_deva_book = any(re.search(r'[ऀ-ॿ]', t) for _,_,t in chs[:3])
        for ch, fn, txt in sorted(chs):
            title = title_of(txt)
            if is_deva_book:
                # corpus hin files are Devanagari; book txt may be too (fhml)
                # match by devanagari keywords if possible, else chapter-group heuristic
                deva_words = re.findall(r'[ऀ-ॿ]{4,}', title)
                hit = 0
                if deva_words:
                    kw = deva_words[:3]
                    hit = sum(1 for b in cls_bodies if any(k in b for k in kw))
                if hit > 0 or (cls in hin_groups and len(hin_groups[cls]) >= 8):
                    cov.append(f"ch{ch} {title[:50]}")
                else:
                    miss.append(f"ch{ch} {title[:50]}")
            else:
                kw = keywords(title)
                if not kw: cov.append(f"ch{ch} {title[:50]} [no-kw]"); continue
                hits = sum(1 for b in cls_bodies if sum(1 for k in kw[:4] if k in b) >= 2)
                (cov if hits >= 3 else thin if hits >= 1 else miss).append(f"ch{ch} {title[:60]}")
        cls_res[code] = {'covered': len(cov), 'thin': len(thin), 'missing': len(miss), 'missing_list': miss}
    result[cls] = cls_res
    print(f"\n===== {cls} =====")
    for code, r in sorted(cls_res.items()):
        print(f"  {code}: {r['covered']} covered, {r['thin']} thin, {r['missing']} MISSING")
        for e in r['missing_list'][:10]: print(f"     MISS {e}")

json.dump(result, open('chapter_coverage.json','w'), indent=1)
