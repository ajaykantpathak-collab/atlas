import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':900})
    page = ctx.new_page()
    console=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:160]}'))
    page.on('pageerror', lambda e: console.append(f'PAGEERROR:{str(e)[:250]}'))
    pending=[]
    page.on('request', lambda r: pending.append(r.url) if r.resource_type in ('xhr','fetch') else None)
    # login
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click()
    page.wait_for_timeout(4000)
    page.goto('http://localhost/my-world', wait_until='domcontentloaded', timeout=30000)
    page.wait_for_timeout(15000)
    body = page.inner_text('body')
    errs = [c for c in console if c.startswith('error') or c.startswith('PAGEERROR')]
    note('MY-WORLD len=' + str(len(body)) + ' errors=' + str(len(errs)))
    note('text: ' + re.sub(r'\s+',' ',body)[:600])
    for e in errs[:6]: note('! ' + e)
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_myworld.png', full_page=False)
    ctx.close(); b.close()
