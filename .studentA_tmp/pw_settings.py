import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]; failing=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:130]}') if m.type=='error' else None)
    page.on('response', lambda r: failing.append(f'{r.status} {r.request.method} {r.url.replace("http://localhost","")[:80]}') if r.status>=400 else None)
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(4000)
    page.goto('http://localhost/settings', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(5000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('SETTINGS PAGE: ' + body[:1300])
    note('failing: ' + ' || '.join(failing[:8]))
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_settings.png', full_page=True)
    ctx.close(); b.close()
