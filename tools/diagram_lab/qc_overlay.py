#!/usr/bin/env python
# QC overlay: draws each part's hotspot circle + id onto the source image -> <slug>_qc.png
import sys, re, os
from PIL import Image, ImageDraw, ImageFont

def parts(md):
    out = []
    for m in re.finditer(r'- id: (\S+) \| label: [^|]+ \| x: ([\d.]+) \| y: ([\d.]+) \| r: ([\d.]+)', md):
        out.append((m.group(1), float(m.group(2)), float(m.group(3)), float(m.group(4))))
    return out

def main(mdp):
    md = open(mdp, encoding='utf8').read()
    img_m = re.search(r'^## image\s*\n(\S+)', md, re.M) or re.search(r'(?:^|\n)img?:\s*(\S+)', md)
    # fallbacks: look for a media/image reference line
    if not img_m:
        for pat in [r'image:\s*(\S+)', r'src:\s*(\S+)', r'^> image:\s*(\S+)']:
            img_m = re.search(pat, md, re.M)
            if img_m: break
    img_name = img_m.group(1).strip() if img_m else os.path.basename(mdp).replace('.md','') + '.png'
    img_dir = 'D:/platform/assets/diagram_lab/img'
    cand = os.path.join(img_dir, img_name)
    if not os.path.exists(cand):
        for ext in ('.png','.jpg','.jpeg','.svg','.webp'):
            base = os.path.join(img_dir, os.path.splitext(img_name)[0] + ext)
            if os.path.exists(base): cand = base; break
            base = os.path.join(img_dir, os.path.basename(mdp).replace('.md','') + ext)
            if os.path.exists(base): cand = base; break
    if not os.path.exists(cand):
        print(f'NOIMG {mdp} -> {img_name}'); return 1
    im = Image.open(cand).convert('RGB')
    W, H = im.size
    d = ImageDraw.Draw(im)
    try: font = ImageFont.truetype('arial.ttf', max(14, W//60))
    except Exception: font = ImageFont.load_default()
    for i,(pid,x,y,r) in enumerate(parts(md)):
        cx, cy, rr = x*W, y*H, r*W
        d.ellipse([cx-rr, cy-rr, cx+rr, cy+rr], outline=(255,40,40), width=max(2,W//400))
        d.ellipse([cx-3, cy-3, cx+3, cy+3], fill=(255,255,0))
        d.text((cx+rr*0.3, cy-rr-18), f'{i}:{pid}', fill=(255,255,0), font=font, stroke_width=2, stroke_fill=(0,0,0))
    out = mdp.replace('.md','_qc.png')
    im.save(out)
    print(f'OK {os.path.basename(out)} {W}x{H} {len(parts(md))} parts')
    return 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
