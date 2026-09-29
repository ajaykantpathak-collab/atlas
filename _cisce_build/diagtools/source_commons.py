#!/usr/bin/env python3
"""source_commons.py — Wikimedia Commons sourcing per DIAGRAM_SPEC.md v2 §4.

For each curated node query (search_terms.json):
  1. Commons API generator=search, namespace 6 (File:), imageinfo with
     extmetadata (license/artist/credit) and iiurlwidth=1000.
  2. Filter: allowed license (PD/CC0/CC BY/CC BY-SA, never NC/ND/UNKNOWN),
     mime svg/png/jpeg, raster width >= 700 (SVG exempt).
  3. Download the top N candidates (SVG originals preferred) to staging/.
Writes staging/manifest.json: node_id -> candidate list with url, thumb,
license, artist, credit, descriptionurl, mime, size.

Usage: python source_commons.py [--per-node 2] [--only node_id ...]
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

API = "https://commons.wikimedia.org/w/api.php"
UA = ("AtlasCBSEDiagramPilot/1.0 (educational platform; local build) "
      "python-urllib")
HERE = Path(__file__).parent
STAGING = HERE / "staging"

ALLOWED_LICENSE_RE = re.compile(
    r"(public domain|cc0|cc[- ]by(?!.*(?:nc|nd))|cc[- ]by-sa(?!.*(?:nc|nd)))",
    re.IGNORECASE,
)
ALLOWED_MIME = {"image/svg+xml", "image/png", "image/jpeg"}


def api(params: dict, tries: int = 4) -> dict:
    qs = urllib.parse.urlencode(params)
    last = None
    for i in range(tries):
        req = urllib.request.Request("%s?%s" % (API, qs), headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=30) as fh:
                return json.loads(fh.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            last = exc
            if exc.code == 429 and i < tries - 1:
                time.sleep(8 * (i + 1))          # back off hard on 429
                continue
            raise
    raise last


def html_clean(s: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()


def search_candidates(query: str, per_node: int) -> list:
    data = api({
        "action": "query", "format": "json",
        "generator": "search", "gsrsearch": query, "gsrnamespace": 6,
        "gsrlimit": 12,
        "prop": "imageinfo",
        "iiprop": "url|size|mime|extmetadata",
        "iiurlwidth": 1000,
    })
    pages = (data.get("query") or {}).get("pages") or {}
    ranked = sorted(pages.values(), key=lambda p: p.get("index", 99))
    out = []
    for page in ranked:
        ii = (page.get("imageinfo") or [{}])[0]
        mime = ii.get("mime", "")
        if mime not in ALLOWED_MIME:
            continue
        em = ii.get("extmetadata") or {}
        lic = html_clean((em.get("LicenseShortName") or {}).get("value", ""))
        if not lic or not ALLOWED_LICENSE_RE.search(lic):
            continue
        if re.search(r"(nc|nd)", lic, re.IGNORECASE):
            continue
        w = ii.get("width", 0)
        if mime != "image/svg+xml" and w and w < 700:
            continue
        artist = html_clean(((em.get("Artist") or {}).get("value", "")))
        credit = html_clean(((em.get("Credit") or {}).get("value", "")))[:120]
        out.append({
            "title": page.get("title", ""),
            "mime": mime,
            "width": w,
            "url": ii.get("url"),
            "thumburl": ii.get("thumburl"),
            "license": lic,
            "artist": artist[:200],
            "credit": credit,
            "descriptionurl": ii.get("descriptionurl", ""),
        })
        if len(out) >= per_node:
            break
    return out


def download(url: str, dest: Path) -> bool:
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as fh, \
                    dest.open("wb") as out:
                while True:
                    chunk = fh.read(65536)
                    if not chunk:
                        break
                    out.write(chunk)
            return dest.stat().st_size > 1024
        except Exception as exc:                 # noqa: BLE001 — log and retry
            print("   download failed: %s (%s)" % (dest.name, exc),
                  file=sys.stderr)
            if isinstance(exc, urllib.error.HTTPError) and exc.code == 429 \
                    and attempt < 2:
                time.sleep(25 * (attempt + 1))
                continue
            return False
    return False


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--per-node", type=int, default=2)
    ap.add_argument("--only", nargs="*", default=None,
                    help="restrict to these node ids")
    ap.add_argument("--sleep", type=float, default=1.2)
    args = ap.parse_args()

    terms = json.loads((HERE / "search_terms.json").read_text(encoding="utf-8"))
    if args.only:
        terms = {k: v for k, v in terms.items() if k in set(args.only)}
    STAGING.mkdir(exist_ok=True)

    manifest_path = STAGING / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) \
        if manifest_path.exists() else {}
    # failed (empty) searches are NOT results — drop them so they retry
    manifest = {k: v for k, v in manifest.items() if v}

    done = 0
    for node_id, query in sorted(terms.items()):
        key = "q:" + query
        cands = manifest.get(key)
        if cands is None:
            try:
                cands = search_candidates(query, args.per_node)
            except Exception as exc:             # noqa: BLE001
                print("SEARCH FAIL %s: %s" % (node_id, exc), file=sys.stderr)
                cands = []
            if not cands:
                # fallback: drop trailing words until something matches
                words = query.split()
                while not cands and len(words) > 1:
                    words = words[:-1]
                    shorter = " ".join(words)
                    try:
                        cands = search_candidates(shorter, args.per_node)
                    except Exception as exc:     # noqa: BLE001
                        print("FALLBACK FAIL %s: %s" % (node_id, exc),
                              file=sys.stderr)
                        break
                    time.sleep(args.sleep)
            if cands:
                manifest[key] = cands
            time.sleep(args.sleep)
        got = []
        for i, cand in enumerate(cands):
            ext = ".svg" if cand["mime"] == "image/svg+xml" else (
                ".jpg" if cand["mime"] == "image/jpeg" else ".png")
            fname = "%s__%d%s" % (node_id, i, ext)
            dest = STAGING / fname
            url = cand["url"]
            # cap giant rasters at the 1000px thumb
            if cand["mime"] != "image/svg+xml" and (cand["width"] or 0) > 1600 \
                    and cand.get("thumburl"):
                url = cand["thumburl"]
            if not dest.exists():
                if not download(url, dest):
                    continue
                time.sleep(0.4)
            cand = dict(cand, staging_file=fname)
            got.append(cand)
        if got:
            manifest[key] = cands
        print("%-24s %-46s -> %d candidate(s)" % (node_id, query[:46], len(got)))
        done += 1

    manifest_path.write_text(json.dumps(manifest, indent=1), encoding="utf-8")
    print("done: %d nodes staged, manifest -> %s" % (done, manifest_path))
    return 0


if __name__ == "__main__":
    sys.exit(main())
