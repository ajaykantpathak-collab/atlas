#!/usr/bin/env python3
"""Atlas store branding generator — icon 512x512 + feature graphic 1024x500
+ screenshot framing for the Google Play listing.

Brand: gold-on-dark, star glyph, dark #0a0a12 base, gold #d4af37 accent.
All raster work is supersampled (2x/4x) and downscaled with LANCZOS so the
star edges and text are clean at final size.

Run:  python make_branding.py            (icon + feature graphic + verify)
      python make_branding.py frames     (+ frame the raw screenshots)
"""
from __future__ import annotations

import math
import os
import random
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, ".."))

DARK = (10, 10, 18)          # #0a0a12
GOLD = (212, 175, 55)        # #d4af37
GOLD_HI = (240, 217, 140)    # lighter gold for the star core
WHITE = (245, 245, 248)
SUBTLE = (168, 174, 196)     # subtitle grey-blue

F_SEGOE_B = r"C:\Windows\Fonts\segoeuib.ttf"   # Segoe UI Bold
F_SEGOE_SB = r"C:\Windows\Fonts\seguisb.ttf"   # Segoe UI Semibold


# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #
def star_pts(cx: float, cy: float, r_out: float, r_in: float | None = None):
    """Four-pointed star (the Atlas glyph)."""
    if r_in is None:
        r_in = r_out * 0.26
    pts = []
    for i in range(4):
        a = math.pi / 2 * i - math.pi / 2          # top, right, bottom, left
        pts.append((cx + r_out * math.cos(a), cy + r_out * math.sin(a)))
        a2 = a + math.pi / 4
        pts.append((cx + r_in * math.cos(a2), cy + r_in * math.sin(a2)))
    return pts


def draw_star(layer: ImageDraw.ImageDraw, cx, cy, r_out, fill,
              r_in=None, core=None):
    """Star with optional lighter inner core star."""
    layer.polygon(star_pts(cx, cy, r_out, r_in), fill=fill)
    if core is not None:
        layer.polygon(star_pts(cx, cy, r_out * 0.55, (r_in or r_out * 0.26) * 0.55),
                      fill=core)


def glow_star(img: Image.Image, cx, cy, r_out, color, blur, alpha=160):
    """Soft radial glow behind a star: blurred star shape on its own layer."""
    lay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    d.polygon(star_pts(cx, cy, r_out), fill=color + (alpha,))
    lay = lay.filter(ImageFilter.GaussianBlur(blur))
    img.alpha_composite(lay)


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def fit_text(draw, text, fpath, max_w, start_size):
    """Largest font size <= start_size whose rendered width fits max_w."""
    size = start_size
    while size > 10:
        f = font(fpath, size)
        if draw.textlength(text, font=f) <= max_w:
            return f, size
        size -= 2
    return font(fpath, 10), 10


# --------------------------------------------------------------------------- #
# app icon 512x512
# --------------------------------------------------------------------------- #
def make_icon():
    S = 4                                   # supersample factor
    W = 512 * S
    img = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # rounded-square base with a faint radial lift in the middle
    base = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    db = ImageDraw.Draw(base)
    rad = int(W * 0.21)
    db.rounded_rectangle([0, 0, W - 1, W - 1], radius=rad, fill=DARK + (255,))
    lift = Image.new("L", (W, W), 0)
    dl = ImageDraw.Draw(lift)
    dl.ellipse([W * 0.14, W * 0.10, W * 0.86, W * 0.82], fill=26)
    lift = lift.filter(ImageFilter.GaussianBlur(W * 0.10))
    tint = Image.new("RGBA", (W, W), (36, 36, 60, 255))
    base.paste(tint, (0, 0), lift)
    img.alpha_composite(base)

    cx, cy = W / 2, W / 2
    r_out = W * 0.30

    # glow layers: wide soft, then tighter
    glow_star(img, cx, cy, r_out * 1.15, GOLD, blur=W * 0.075, alpha=90)
    glow_star(img, cx, cy, r_out * 0.95, GOLD, blur=W * 0.035, alpha=110)

    # crisp star, two-tone
    d = ImageDraw.Draw(img)
    draw_star(d, cx, cy, r_out, GOLD + (255,), r_in=r_out * 0.24,
              core=GOLD_HI + (255,))

    img = img.resize((512, 512), Image.LANCZOS)
    path = os.path.join(OUT, "icon-512.png")
    img.save(path, "PNG", optimize=True)
    return path


# --------------------------------------------------------------------------- #
# feature graphic 1024x500
# --------------------------------------------------------------------------- #
def make_feature():
    S = 2
    W, H = 1024 * S, 500 * S
    rng = random.Random(20261003)           # deterministic

    # --- cosmos gradient (vertical: #0a0a12 -> #0d0d1c -> #161431) ---
    base = Image.new("RGB", (1, H))
    stops = [(0.0, DARK), (0.55, (13, 13, 28)), (1.0, (22, 20, 49))]
    px = base.load()
    for y in range(H):
        t = y / (H - 1)
        for i in range(len(stops) - 1):
            t0, c0 = stops[i]
            t1, c1 = stops[i + 1]
            if t0 <= t <= t1:
                k = (t - t0) / (t1 - t0)
                col = tuple(round(c0[j] + (c1[j] - c0[j]) * k) for j in range(3))
                px[0, y] = col
                break
    img = base.resize((W, H)).convert("RGBA")

    # --- nebula washes (indigo/violet blurs) ---
    neb = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dn = ImageDraw.Draw(neb)
    dn.ellipse([W * 0.55, -H * 0.45, W * 1.25, H * 0.55], fill=(40, 36, 92, 80))
    dn.ellipse([-W * 0.30, H * 0.45, W * 0.35, H * 1.35], fill=(52, 28, 84, 60))
    neb = neb.filter(ImageFilter.GaussianBlur(W * 0.09))
    img.alpha_composite(neb)

    # --- starfield ---
    st = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ds = ImageDraw.Draw(st)
    for _ in range(170):
        x, y = rng.uniform(0, W), rng.uniform(0, H)
        r = rng.uniform(1.0, 3.2)
        a = rng.randint(50, 200)
        ds.ellipse([x - r, y - r, x + r, y + r], fill=(235, 238, 250, a))
    # a handful of gold sparkles
    for _ in range(9):
        x, y = rng.uniform(W * 0.06, W * 0.94), rng.uniform(H * 0.08, H * 0.92)
        draw_star(ds, x, y, rng.uniform(7, 15), GOLD + (rng.randint(120, 200),))
    st = st.filter(ImageFilter.GaussianBlur(0.6))
    img.alpha_composite(st)

    d = ImageDraw.Draw(img)

    # --- content (kept inside the central safe area) ---
    cx, cy = W / 2, H * 0.27
    r_out = H * 0.155
    glow_star(img, cx, cy, r_out * 1.25, GOLD, blur=W * 0.030, alpha=90)
    d = ImageDraw.Draw(img)
    draw_star(d, cx, cy, r_out, GOLD + (255,), r_in=r_out * 0.24,
              core=GOLD_HI + (255,))

    title = "Atlas — Learn smarter"
    f_title, tsz = fit_text(d, title, F_SEGOE_B, W * 0.78, 34 * S)
    tw = d.textlength(title, font=f_title)
    ty = H * 0.475
    # two-tone: "Atlas" gold, rest white
    atlas = "Atlas — "
    f_atlas = f_title
    aw = d.textlength(atlas, font=f_atlas)
    x0 = (W - tw) / 2
    d.text((x0, ty), atlas, font=f_atlas, fill=GOLD + (255,))
    d.text((x0 + aw, ty), "Learn smarter", font=f_title, fill=WHITE + (255,))

    sub = "Classes 6–12  ·  CBSE + CISCE  ·  Free to start"
    f_sub, _ = fit_text(d, sub, F_SEGOE_SB, W * 0.70, 15 * S)
    sw = d.textlength(sub, font=f_sub)
    d.text(((W - sw) / 2, ty + tsz * 1.55), sub, font=f_sub, fill=SUBTLE + (255,))

    img = img.resize((1024, 500), Image.LANCZOS).convert("RGB")
    path = os.path.join(OUT, "feature-graphic-1024x500.png")
    img.save(path, "PNG", optimize=True)
    return path


# --------------------------------------------------------------------------- #
# screenshot framing (1000x2000, 1:2 — inside Play's 2:1 limit)
# --------------------------------------------------------------------------- #
SHOTS = [
    ("shot-1-home-raw.png",      "screenshot-1-home.png",      "Your learning home"),
    ("shot-2-dashboard-raw.png", "screenshot-2-dashboard.png", "Track your mastery"),
    ("shot-3-lab-raw.png",       "screenshot-3-lab.png",       "Solve with a step-by-step tutor"),
    ("shot-4-games-raw.png",     "screenshot-4-games.png",     "Learn through games"),
]


def rounded(im: Image.Image, radius: int) -> Image.Image:
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, im.size[0] - 1, im.size[1] - 1],
                                           radius=radius, fill=255)
    out = Image.new("RGBA", im.size, (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)
    return out


def frame_screenshots():
    made = []
    for raw_name, out_name, caption in SHOTS:
        raw_path = os.path.join(OUT, "screenshots", raw_name)
        if not os.path.exists(raw_path):
            raise SystemExit(f"missing raw capture: {raw_path} (run capture_screens.js first)")
        raw = Image.open(raw_path).convert("RGB")     # 780x1688

        CW, CH = 1000, 2000
        canvas = Image.new("RGB", (CW, CH), (9, 9, 16))
        draw = ImageDraw.Draw(canvas)

        # caption row: star + text, centered
        f_cap = font(F_SEGOE_SB, 40)
        tw = draw.textlength(caption, font=f_cap)
        star_r = 16
        gap = 18
        total = star_r * 2 + gap + tw
        sx = (CW - total) / 2 + star_r
        cy_cap = 96
        draw_star(draw, sx, cy_cap, star_r, GOLD)
        draw.text((sx + star_r + gap, cy_cap), caption, font=f_cap,
                  fill=WHITE, anchor="lm")

        # device frame with the capture inside
        ix, iy = (CW - raw.width) // 2, 190
        draw.rounded_rectangle([ix - 10, iy - 10, ix + raw.width + 9, iy + raw.height + 9],
                               radius=44, outline=(48, 48, 68), width=4)
        draw.rounded_rectangle([ix - 4, iy - 4, ix + raw.width + 3, iy + raw.height + 3],
                               radius=40, outline=GOLD + (0,) if False else (212, 175, 55),
                               width=1)
        canvas.paste(rounded(raw, 36), (ix, iy), rounded(raw, 36))

        out = os.path.join(OUT, "screenshots", out_name)
        canvas.save(out, "PNG", optimize=True)
        made.append(out)
    return made


# --------------------------------------------------------------------------- #
def verify(paths):
    ok = True
    for p in paths:
        with Image.open(p) as im:
            im.verify()
        with Image.open(p) as im:
            print(f"  {os.path.relpath(p, OUT):45s} {im.format} {im.size} "
                  f"{os.path.getsize(p) // 1024} KB")
            if p.endswith("icon-512.png") and im.size != (512, 512):
                ok = False
            if p.endswith("feature-graphic") and im.size != (1024, 500):
                ok = False
    return ok


if __name__ == "__main__":
    paths = [make_icon(), make_feature()]
    if "frames" in sys.argv:
        paths += frame_screenshots()
    print("generated:")
    sys.exit(0 if verify(paths) else 1)
