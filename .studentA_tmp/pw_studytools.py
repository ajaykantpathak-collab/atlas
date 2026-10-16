import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(4000)
    page.goto('http://localhost/study-tools', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(4000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('STUDY-TOOLS PAGE: ' + body[:1000])
    # collect tool links
    hrefs = page.evaluate("() => Array.from(document.querySelectorAll('a[href]')).map(a=>a.getAttribute('href')).filter(h=>h.includes('tool')||h.includes('calc')||h.includes('flash')||h.includes('note')||h.includes('plan')||h.includes('solver'))")
    note('tool hrefs: ' + json.dumps(hrefs[:15]))
    allhrefs = page.evaluate("() => Array.from(document.querySelectorAll('a[href]')).map(a=>a.getAttribute('href'))")
    note('ALL hrefs on page: ' + json.dumps(sorted(set(allhrefs))[:40]))
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_studytools.png', full_page=True)
    ctx.close(); b.close()
