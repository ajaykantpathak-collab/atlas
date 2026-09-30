import fitz, os, glob

OUT = 'ncert_books/text_cache_new'
done = 0
for pdf in glob.glob('ncert_books/**/*.pdf', recursive=True):
    parts = pdf.replace(os.sep, '/').split('/')
    cls = next((p for p in parts if p.startswith('class_') or p.startswith('applied')), 'misc')
    book = next((p for p in parts if '/' + p + '/' in pdf and p != 'ncert_books' and not p.endswith('.pdf')), '')
    base = os.path.basename(pdf).replace('.pdf', '')
    outdir = os.path.join(OUT, cls, book or 'misc')
    os.makedirs(outdir, exist_ok=True)
    txt_path = os.path.join(outdir, base + '.txt')
    if os.path.exists(txt_path):
        continue
    try:
        doc = fitz.open(pdf)
        text = '\n\n'.join(f'--- page {i+1} ---\n' + pg.get_text() for i, pg in enumerate(doc))
        doc.close()
        open(txt_path, 'w', encoding='utf-8').write(text)
        done += 1
    except Exception as e:
        print('FAIL', base, e)
print('extracted', done, 'chapters ->', OUT)
