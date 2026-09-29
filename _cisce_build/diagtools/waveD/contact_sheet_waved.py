#!/usr/bin/env python3
"""waveD contact sheets — eyeball gate. staging -> sheets/ (isolated waveD dirs)."""
from __future__ import annotations
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).parent
STAGING = HERE / "staging"
OUT = HERE / "sheets"
COLS, ROWS = 2, 2
CELL_W, CELL_H = 720, 560
LABEL_H = 34


def load_font():
    for name in ("arial.ttf", "segoeui.ttf", "DejaVuSans.ttf"):
        try:
            return ImageFont.truetype(name, 22)
        except OSError:
            continue
    return ImageFont.load_default()


def main() -> None:
    import re, sys
    only = _re = sys.argv[1] if len(sys.argv) > 1 else None
    OUT.mkdir(exist_ok=True)
    font = load_font()
    files = sorted(f for f in STAGING.iterdir()
                   if f.suffix.lower() in (".png", ".jpg", ".jpeg", ".svg")
                   and (not only or re.match(only, f.name)))
    cells = []
    for f in files:
        if f.suffix.lower() == ".svg":
            preview = STAGING / ("_prev_" + f.stem + ".png")
            if not preview.exists():
                import subprocess
                r = subprocess.run(
                    ["magick", "-background", "white", str(f),
                     "-resize", "720x", str(preview)], capture_output=True)
                if r.returncode != 0 or not preview.exists():
                    continue
            src = preview
        else:
            src = f
        try:
            img = Image.open(src)
        except OSError:
            continue
        cells.append((f.name, img))
    per = COLS * ROWS
    n_sheets = (len(cells) + per - 1) // per
    mapping = {}
    for s in range(n_sheets):
        sheet = Image.new("RGB", (COLS * CELL_W, ROWS * (CELL_H + LABEL_H)), (16, 16, 20))
        draw = ImageDraw.Draw(sheet)
        chunk = cells[s * per:(s + 1) * per]
        for idx, (name, img) in enumerate(chunk):
            cx, cy = idx % COLS, idx // COLS
            x0, y0 = cx * CELL_W, cy * (CELL_H + LABEL_H)
            draw.rectangle([x0, y0, x0 + CELL_W, y0 + LABEL_H], fill=(30, 30, 40))
            draw.text((x0 + 10, y0 + 5), name, fill=(250, 220, 130), font=font)
            img = img.convert("RGBA")
            img.thumbnail((CELL_W - 8, CELL_H - 8))
            # composite onto WHITE (wave-B relay): convert("RGB") flattens
            # transparent-SVG thumbs to black rectangles -> wrongful rejects
            bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
            img = Image.alpha_composite(bg, img).convert("RGB")
            sheet.paste(img, (x0 + 4, y0 + LABEL_H + 4))
            mapping[name] = s + 1
        out = OUT / ("sheet_%02d.png" % (s + 1))
        sheet.save(out)
        print(str(out))
    with (OUT / "mapping.json").open("w", encoding="utf-8") as fh:
        json.dump(mapping, fh, indent=1)
    print("%d candidates -> %d sheets" % (len(cells), n_sheets))


if __name__ == "__main__":
    main()
