import fitz, os, re, json, glob, collections

catalog = collections.defaultdict(list)
for pdf in glob.glob('ncert_books/**/*.pdf', recursive=True):
    parts = pdf.replace(os.sep, '/').split('/')
    cls = next((p for p in parts if p.startswith('class_') or p.startswith('applied')), '?')
    book = next((p for p in parts if '/' + p + '/' in pdf and p != 'ncert_books' and not p.endswith('.pdf')), '')
    base = os.path.basename(pdf).replace('.pdf', '')
    try:
        doc = fitz.open(pdf)
    except Exception:
        continue
    figs = []
    for pno in range(min(doc.page_count, 45)):
        text = doc[pno].get_text()
        for m in re.finditer(r'(?:Figure|Fig\.?|Activity)\s*(\d+\.?\d*)\s+([A-Z][^\n\.]{4,70})', text):
            figs.append((m.group(1), re.sub(r'\s+', ' ', m.group(2)).strip()))
    if figs:
        key = f'{cls}/{book or base[:6]}'
        catalog[key].extend(figs)
    doc.close()

total = sum(len(v) for v in catalog.values())
print('TOTAL figure references found:', total)
by_cls = collections.Counter()
for k, v in catalog.items():
    by_cls[k.split('/')[0]] += len(v)
for c in sorted(by_cls):
    print(f'  {c}: {by_cls[c]}')
# dedupe near-identical captions within a book
uniq = collections.Counter()
for k, v in catalog.items():
    caps = {re.sub(r'\W+', '', cap.lower())[:40] for _, cap in v}
    uniq[k.split('/')[0]] += len(caps)
print('unique captions per class:', dict(sorted(uniq.items())))
print('UNIQUE total:', sum(uniq.values()))
json.dump({k: v for k, v in catalog.items()}, open('ncert_books/text_cache_new/figure_catalog_full.json', 'w'), indent=1)
print('saved')
