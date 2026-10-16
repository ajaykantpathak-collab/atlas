"""Dead-link audit: collect every rendered <a href> on main layouts, then probe each."""
import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
import urllib.request

PAGES = ['/','/dashboard','/learn','/practice','/diagnostic','/progress','/sims-v2','/study-tools','/my-world','/exam','/achievements','/explore']
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(4000)
    all_links = {}
    for route in PAGES:
        try:
            page.goto(f'http://localhost{route}', wait_until='domcontentloaded', timeout=30000)
            page.wait_for_timeout(2500)
            hrefs = page.evaluate("() => Array.from(document.querySelectorAll('a[href]')).map(a=>a.getAttribute('href'))")
            for h in hrefs:
                if h and not h.startswith('#') and not h.startswith('javascript'):
                    all_links.setdefault(h, set()).add(route)
        except Exception as e:
            pass
    ctx.close(); b.close()
print(f'total unique links: {len(all_links)}')
# probe each
bad = []
for h in sorted(all_links):
    url = 'http://localhost' + h if h.startswith('/') else h
    try:
        # use HEAD-ish GET with redirect follow
        req = urllib.request.Request(url, method='GET')
        with urllib.request.urlopen(req, timeout=20) as resp:
            code = resp.status
    except urllib.error.HTTPError as e:
        code = e.code
    except Exception as e:
        code = f'ERR {str(e)[:40]}'
    if code != 200:
        bad.append((h, code, sorted(all_links[h])[:3]))
print('--- BROKEN LINKS ---')
for h, code, src in bad:
    print(f'{code} {h}  (linked from {src})')
json.dump({'all': {k: sorted(v) for k,v in all_links.items()}, 'bad': bad},
          open(r'D:/platform/.studentA_tmp/linkaudit.json','w'), indent=1)
