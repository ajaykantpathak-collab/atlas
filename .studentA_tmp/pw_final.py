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
    # 1. real UI login
    page.goto('http://localhost/login', wait_until='networkidle', timeout=45000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    btn = page.locator('button[type="submit"], button:has-text("Log In"), button:has-text("Sign In")').first
    btn.click()
    page.wait_for_timeout(6000)
    tok = page.evaluate("() => Object.keys(localStorage).map(k=>k+'='+(localStorage[k]||'').slice(0,25)).join('; ')")
    note('after login url=' + page.url)
    note('localStorage: ' + tok[:300])
    page.screenshot(path=r'D:/platform/.studentA_tmp/shot_login_result.png')
    # 2. sweep pages
    for route in ['/dashboard','/progress','/achievements','/my-world']:
        console.clear()
        try:
            page.goto(f'http://localhost{route}', wait_until='networkidle', timeout=45000)
            page.wait_for_timeout(3500)
            body = page.inner_text('body')
            errs = [c for c in console if c.startswith('error') or c.startswith('PAGEERROR')]
            note(f'== {route}: len={len(body)} errors={len(errs)}')
            note('   text: ' + re.sub(r'\s+',' ',body)[:300])
            for e in errs[:4]: note('   ! ' + e)
            page.screenshot(path=rf'D:/platform/.studentA_tmp/shot_route{route.replace("/","_")}.png', full_page=False)
        except Exception as e:
            note(f'== {route}: EXCEPTION {str(e)[:150]}')
    ctx.close(); b.close()
