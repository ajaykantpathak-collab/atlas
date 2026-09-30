import fitz, os, re, glob, sys

OUT = 'ncert_books/text_cache_new/diagrams'
os.makedirs(OUT, exist_ok=True)

def extract(pdf_path, tag):
    doc = fitz.open(pdf_path)
    n = 0
    for pno in range(doc.page_count):
        pg = doc[pno]
        d = pg.get_text('dict')
        blocks = [b for b in d['blocks'] if b['type'] == 0]
        for b in blocks:
            text = ' '.join(s['text'] for l in b.get('lines', []) for s in l.get('spans', []))
            m = re.search(r'(Figure|Fig\.?)\s*(\d+\.\d+)', text)
            if not m:
                continue
            cap = b['bbox']
            # figure sits ABOVE the caption: from prev block bottom to caption top
            prev_bottom = 40
            for ob in blocks:
                if ob is b:
                    continue
                oy1 = ob['bbox'][3]
                if oy1 <= cap[1] - 2 and oy1 > prev_bottom:
                    prev_bottom = oy1
            clip = fitz.Rect(30, prev_bottom + 2, pg.rect.width - 30, cap[1] - 1)
            if clip.height < 80 or clip.height > 560:
                continue
            pix = pg.get_pixmap(clip=clip, dpi=150)
            name = f'{tag}_fig{m.group(2).replace(".", "_")}_p{pno}.png'
            pix.save(f'{OUT}/{name}')
            n += 1
    doc.close()
    return n

if __name__ == '__main__':
    tot = 0
    for pdf in sys.argv[1:]:
        base = os.path.basename(pdf).replace('.pdf', '')
        tag = base
        n = extract(pdf, tag)
        print(tag, '->', n)
        tot += n
    print('total:', tot)
