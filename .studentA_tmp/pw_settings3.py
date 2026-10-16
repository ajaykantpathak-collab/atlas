import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    posts=[]
    page.on('request', lambda r: posts.append(f'{r.method} {r.url.replace("http://localhost","")[:70]}') if r.method in ('POST','PUT','PATCH') else None)
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(4000)
    page.goto('http://localhost/settings', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(4000)
    page.get_by_text(re.compile('^Notifications$', re.I)).first.click(); page.wait_for_timeout(1500)
    # find toggles (switch role buttons or checkbox)
    sw = page.locator('[role="switch"]:visible, button[aria-checked]:visible, input[type=checkbox]:visible')
    n = sw.count()
    note(f'toggles found: {n}')
    if n:
        before = sw.nth(0).get_attribute('aria-checked')
        sw.nth(0).click(); page.wait_for_timeout(1500)
        after = sw.nth(0).get_attribute('aria-checked')
        note(f'toggle[0] before={before} after={after} | POSTs: {posts[-3:]}')
        page.reload(wait_until='domcontentloaded'); page.wait_for_timeout(4000)
        page.get_by_text(re.compile('^Notifications$', re.I)).first.click(); page.wait_for_timeout(1500)
        sw2 = page.locator('[role="switch"]:visible, button[aria-checked]:visible, input[type=checkbox]:visible')
        now = sw2.nth(0).get_attribute('aria-checked') if sw2.count() else 'none'
        note(f'toggle[0] after reload: {now} (persisted={now==after})')
        page.screenshot(path=r'D:/platform/.studentA_tmp/shot_settings_toggles.png')
    # Appearance tab check
    page.get_by_text(re.compile('^Appearance$', re.I)).first.click(); page.wait_for_timeout(1500)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    m = re.search(r'Appearance (.{0,250})', body)
    note('APPEARANCE TAB: ' + (m.group(1) if m else body[:200]))
    ctx.close(); b.close()
