"""Convert doodle card PNGs to WebP 720x900 (~100KB/card target).

Batch helper for export_doodle_cards.mjs --format webp: reads a manifest of
absolute PNG paths (one per line), LANCZOS-downscales each 1080x1350 render
to 720x900 (4:5 preserved, supersampled text stays crisp), writes
<stem>.webp next to it (quality 82, method 4), and deletes the source PNG.

Also usable standalone with --dir + --match for a whole shelf:
  python convert_doodle_webp.py --dir public/doodle_cards/class6 \
      --match "_(icse|isc)_\\d+_\\d+\\.png$"
The --match guard exists so a shelf shared with CBSE can never have its
CBSE PNGs touched (CBSE ids carry no board token).
"""
import argparse
import os
import re
import sys

from PIL import Image

WIDTH = 720
HEIGHT = 900
QUALITY = 82


def convert(png_path, delete_src=True):
    webp_path = os.path.splitext(png_path)[0] + ".webp"
    im = Image.open(png_path)
    if im.size != (WIDTH, HEIGHT):
        im = im.resize((WIDTH, HEIGHT), Image.LANCZOS)
    if im.mode not in ("RGB", "L"):
        im = im.convert("RGB")
    im.save(webp_path, "WEBP", quality=QUALITY, method=4)
    if delete_src:
        os.remove(png_path)
    return webp_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", help="file with one absolute PNG path per line")
    ap.add_argument("--dir", help="convert every --match PNG under this dir")
    ap.add_argument("--match", default=r"_(icse|isc)_\d+_\d+\.png$",
                    help="safety regex a filename must match (default: CISCE "
                         "board tokens only — CBSE cards are never touched)")
    ap.add_argument("--keep-src", action="store_true")
    args = ap.parse_args()

    files = []
    if args.manifest:
        with open(args.manifest, encoding="utf-8") as fh:
            files = [ln.strip() for ln in fh if ln.strip()]
    elif args.dir:
        guard = re.compile(args.match)
        files = [os.path.join(args.dir, f) for f in sorted(os.listdir(args.dir))
                 if f.lower().endswith(".png") and guard.search(f)]
    else:
        ap.error("need --manifest or --dir")

    guard = re.compile(args.match)
    skipped_guard = 0
    total_in = 0
    for p in files:
        if not os.path.isfile(p):
            continue
        if not guard.search(os.path.basename(p)):
            skipped_guard += 1
            continue
        convert(p, delete_src=not args.keep_src)
        total_in += 1
    print(f"converted {total_in} pngs -> webp {WIDTH}x{HEIGHT} q{QUALITY} "
          f"(guard-skipped {skipped_guard}, keep-src={args.keep_src})")


if __name__ == "__main__":
    main()
