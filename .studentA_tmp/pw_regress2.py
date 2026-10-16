import sys, json, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]; failing=[]; posts=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:140]}') if m.type=='error' else None)
    page.on('response', lambda r: (failing.append(f'{r.status} {r.request.method} {r.url.replace("http://localhost","")[:90]}') if r.status>=400 else None))
    page.on('request', lambda r: posts.append(f'{r.method} {r.url.replace("http://localhost","")[:90]}') if '/api/practice' in r.url else None)
    page.goto('http://localhost/login', wait_until='domcontentloaded', timeout=30000)
    page.fill('input[type="email"]', 'demo@dreamapp.in')
    page.fill('input[type="password"]', 'demo123')
    page.locator('button[type="submit"]').first.click(); page.wait_for_timeout(4000)
    page.goto('http://localhost/practice', wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(4000)
    page.get_by_text(re.compile('Start Practice', re.I)).first.click()
    page.wait_for_timeout(15000)  # long wait
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('PRACTICE AFTER 15s: ' + body[:350])
    note('practice API calls: ' + ' || '.join(posts[:8]))
    note('failing: ' + ' || '.join(failing[:8]))
    note('console errors: ' + ' || '.join(console[:5]))
    inps = page.locator('input:visible, textarea:visible').count()
    note(f'inputs: {inps}')
    page.screenshot(path=r'D:/platform/.studentA_tmp/regress_practice2.png', full_page=False)
    ctx.close(); b.close()
