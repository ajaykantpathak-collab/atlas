import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:150]}'))
    page.on('pageerror', lambda e: console.append(f'PAGEERROR:{str(e)[:200]}'))

    # A) login demo, note identity
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(4000)
    note('demo login -> ' + page.url)
    page.goto('http://localhost/dashboard', wait_until='domcontentloaded', timeout=30000); page.wait_for_timeout(4000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    m = re.search(r'(Total XP [\d,]+|LV ?\d+|Good evening,? \w+)', body)
    note('demo dashboard: ' + (m.group(0) if m else body[:120]))
    # find logout control
    page.screenshot(path=r'D:/platform/.studentA_tmp/auth_demo_dash.png')

    # B) logout via API + UI: find logout button
    page.goto('http://localhost/dashboard', wait_until='domcontentloaded'); page.wait_for_timeout(2500)
    try:
        page.get_by_text(re.compile('log ?out|sign ?out', re.I)).first.click(timeout=4000)
        page.wait_for_timeout(3000)
        note('after logout click url: ' + page.url)
    except Exception as e:
        note('logout control not found in body: ' + str(e)[:100])
        # try /logout route
        page.goto('http://localhost/logout', wait_until='domcontentloaded'); page.wait_for_timeout(2500)
        note('after /logout url: ' + page.url)
    ls = page.evaluate("() => Object.keys(localStorage).join(',')")
    note('localStorage keys after logout: ' + ls)
    # back button to dashboard
    page.goto('http://localhost/dashboard', wait_until='domcontentloaded'); page.wait_for_timeout(3500)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('dashboard after logout: ' + body[:260])
    page.screenshot(path=r'D:/platform/.studentA_tmp/auth_after_logout.png')

    # C) login as c6 student — identity switch
    page.goto('http://localhost/login', wait_until='domcontentloaded'); page.wait_for_timeout(1500)
    page.fill('input[type="email"]', 'student.a.c6@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(4000)
    note('c6 login -> ' + page.url)
    page.goto('http://localhost/dashboard', wait_until='domcontentloaded'); page.wait_for_timeout(4000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    m = re.search(r'(Good evening,? \w+|Total XP [\d,]+|LV ?\d+|CLASS \d+)', body)
    note('c6 dashboard identity: ' + (m.group(0) if m else body[:150]))
    page.screenshot(path=r'D:/platform/.studentA_tmp/auth_c6_dash.png')

    # D) expired-token behavior: corrupt dream-auth token, load dashboard
    page.evaluate("() => { const k='dream-auth'; const v=JSON.parse(localStorage.getItem(k)); if(v && v.state){ v.state.token='abc.def.gh'; localStorage.setItem(k, JSON.stringify(v)); } }")
    page.goto('http://localhost/dashboard', wait_until='domcontentloaded'); page.wait_for_timeout(5000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('dashboard with corrupted token: ' + body[:300])
    errs = [c for c in console if c.startswith('error') or c.startswith('PAGEERROR')]
    note('errors: ' + ' || '.join(errs[:10]))
    page.screenshot(path=r'D:/platform/.studentA_tmp/auth_corrupt_token.png')
    ctx.close(); b.close()
