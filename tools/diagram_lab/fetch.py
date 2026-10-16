"""diagram_lab fetcher — Wikimedia Commons asset fetch per topic.

For each figure topic (from NCERT captions), searches Commons, picks the best
licensed image (PD > CC0 > CC-BY > CC-BY-SA, prefer SVG), downloads it, and
records attribution in assets.json for the credit line.

Usage:
  python fetch.py --topics topics.md --out <img_dir> [--limit N]
topics.md lines:  <slug> | <search query> | <subject>
"""
import os, sys, json, time, argparse, urllib.parse, urllib.request, re

API = 'https://commons.wikimedia.org/w/api.php'
UA = {'User-Agent': 'AtlasCBSE-diagramlab/1.0 (educational)'}
OK_LIC = ['public domain', 'cc0', 'cc by', 'cc-by', 'cc by-sa', 'cc-by-sa', 'cc by-sa 3.0',
          'cc by-sa 4.0', 'cc by 3.0', 'cc by 4.0', 'cc by 2.0', 'cc by-sa 2.0']
BAD = re.compile(r'(map|logo|seal|coat|flag|portrait|photo of|person|stamp|coin|poster|'
                 r'screenshot|film|movie|album|book cover|newspaper)', re.I)
GOOD_HINTS = re.compile(r'(diagram|schema|schematic|labeled|labelled|illustration|'
                        r'cross.?section|structure|anatomy|svg)', re.I)


def api(params, tries=4):
    url = API + '?' + urllib.parse.urlencode({**params, 'format': 'json'})
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            if e.code == 429 and i < tries - 1:
                time.sleep(4 * (i + 1)); continue
            raise
    return {}


def pick_image(query):
    """Search Commons, return (title, url, license, artist) of best candidate."""
    res = api({'action': 'query', 'list': 'search', 'srsearch': query,
               'srnamespace': 6, 'srlimit': 12, 'formatversion': 2})
    cands = [r['title'] for r in res.get('query', {}).get('search', [])]
    if not cands:
        return None
    # filter junk by title
    cands = [t for t in cands if not BAD.search(t)]
    if not cands:
        return None
    info = api({'action': 'query', 'titles': '|'.join(cands[:10]),
                'prop': 'imageinfo', 'iiprop': 'url|size|extmetadata', 'formatversion': 2})
    best, best_score = None, -1
    for p in info.get('query', {}).get('pages', []):
        ii = (p.get('imageinfo') or [{}])[0]
        meta = ii.get('extmetadata', {})
        lic = (meta.get('LicenseShortName', {}).get('value') or '').lower()
        if not any(l in lic for l in OK_LIC):
            continue
        url = ii.get('url', '').split('?')[0]  # strip utm tracking params
        w, h = ii.get('width', 0), ii.get('height', 0)
        if w < 250 or h < 200:
            continue
        # only real image files — skip book scans / documents
        if not re.search(r'\.(svg|png|jpe?g)$', url, re.I):
            continue
        score = 0
        if url.lower().endswith('.svg'): score += 3
        if 'public domain' in lic or 'cc0' in lic: score += 3
        if GOOD_HINTS.search(p['title']): score += 2
        # title-keyword overlap with the query
        title_words = set(re.findall(r'[a-z]+', p['title'].lower()))
        q_words = set(re.findall(r'[a-z]+', query.lower())) - {'diagram', 'labeled', 'the', 'of', 'a'}
        score += min(4, len(title_words & q_words))
        if w >= 800: score += 1
        if score > best_score:
            best_score = score
            best = (p['title'], url, meta.get('LicenseShortName', {}).get('value', ''),
                    re.sub(r'<[^>]+>', '', meta.get('Artist', {}).get('value', 'Wikimedia Commons'))[:80])
    return best


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--topics', required=True)
    ap.add_argument('--out', required=True)
    ap.add_argument('--limit', type=int, default=0)
    a = ap.parse_args()

    rows = []
    for line in open(a.topics, encoding='utf-8'):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        slug, q, *rest = [x.strip() for x in line.split('|')]
        rows.append((slug, q, rest[0] if rest else 'other'))
    if a.limit:
        rows = rows[:a.limit]
    os.makedirs(a.out, exist_ok=True)
    assets_path = os.path.join(a.out, 'assets.json')
    assets = json.load(open(assets_path)) if os.path.exists(assets_path) else {}

    for i, (slug, q, subj) in enumerate(rows):
        if slug in assets:
            continue
        try:
            hit = pick_image(q)
        except Exception as e:
            print(f'[{i+1}] ERR {slug}: {e}'); continue
        if not hit:
            print(f'[{i+1}] MISS {slug} ({q})'); assets[slug] = {'miss': q}; continue
        title, url, lic, artist = hit
        ext = '.svg' if url.lower().endswith('.svg') else '.png' if url.lower().endswith('.png') else '.jpg'
        dest = os.path.join(a.out, slug + ext)
        try:
            req = urllib.request.Request(url, headers=UA)
            data = urllib.request.urlopen(req, timeout=60).read()
            open(dest, 'wb').write(data)
        except Exception as e:
            print(f'[{i+1}] DL-FAIL {slug}: {e}'); continue
        assets[slug] = {'file': os.path.basename(dest), 'src': title, 'license': lic,
                        'artist': artist, 'subject': subj, 'query': q}
        print(f'[{i+1}] OK {slug} <- {title} [{lic}]')
        time.sleep(1.8)
        json.dump(assets, open(assets_path, 'w'), indent=1)

    json.dump(assets, open(assets_path, 'w'), indent=1)
    got = sum(1 for v in assets.values() if 'file' in v)
    print(f'done — {got}/{len(rows)} fetched, {len(rows)-got} misses')


if __name__ == '__main__':
    main()
