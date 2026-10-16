# -*- coding: utf-8 -*-
"""Build the true book skeleton: class -> book -> chapter -> sections."""
import re, os, json

BASE = r"D:\platform\ncert_books\text_cache_new"

BOOK_NAMES = {
    'fecu': 'Science (Curiosity)', 'fees': 'Social Science (Exploring Society)',
    'fegp': 'Mathematics (Ganita Prakash)', 'fepr': 'English (Poorvi)',
    'fhml': 'Hindi (Malhar)',
}

def chapter_title(txt):
    lines = [l.strip() for l in txt.split('\n')]
    lines = [l for l in lines if l and 'page' not in l.lower() and 'Reprint' not in l and len(l) > 2]
    return ' '.join(lines[:3])[:80] if lines else '?'

def sections_of(txt):
    out = []
    for m in re.finditer(r'^\s*(\d+\.\d+(?:\.\d+)?)\s*[\t ]+([^\n]{4,70})', txt, re.M):
        n, t = m.group(1), re.sub(r'\s+', ' ', m.group(2)).strip()
        # skip units/measurements and bare numbers
        if re.match(r'^[\d.]+\s*(g|kg|mg|cm|mm|km|L|mL|s|°|%)', t): continue
        if len(t) < 4: continue
        out.append((n, t[:60]))
    return out

result = {}
for cls in sorted(os.listdir(BASE)):
    cdir = os.path.join(BASE, cls, 'misc')
    if not os.path.isdir(cdir): continue
    books = {}
    for fn in sorted(os.listdir(cdir)):
        if not fn.endswith('.txt'): continue
        code = re.sub(r'\d+\.txt$', '', fn)
        m = re.search(r'(\d+)\.txt$', fn)
        if not m: continue
        num = int(m.group(1))
        ch = num % 100
        if ch == 0 or num % 100 == 99:  # ps/gl front matter
            pass
        txt = open(os.path.join(cdir, fn), encoding='utf-8', errors='ignore').read()
        entry = books.setdefault(code, {})
        if ch not in entry or 'ps' in fn or 'gl' in fn:
            entry[ch] = {'file': fn, 'title': chapter_title(txt),
                         'sections': sections_of(txt)}
    result[cls] = books

json.dump(result, open('book_skeleton.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for cls, books in result.items():
    print(f"\n=== {cls} ===")
    for code, chs in sorted(books.items()):
        tot = sum(len(v['sections']) for v in chs.values())
        print(f" {code} ({BOOK_NAMES.get(code,'?')}): {len(chs)} ch, {tot} sections")
