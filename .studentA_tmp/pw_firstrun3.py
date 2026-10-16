import sys, json, re, time
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
logs=[]
def note(s): print(s); logs.append(s)
EMAIL = f'fresh.run2.{int(time.time())}@dreamapp.in'
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    console=[]; failing=[]
    page.on('console', lambda m: console.append(f'{m.type}:{m.text[:130]}') if m.type=='error' else None)
    page.on('response', lambda r: failing.append(f'{r.status} {r.request.method} {r.url.replace("http://localhost","")[:80]}') if r.status>=400 else None)
    page.goto('http://localhost/signup', wait_until='domcontentloaded', timeout=30000)
    page.wait_for_timeout(1500)
    sel = page.locator('select:visible')
    opts = sel.first.locator('option').all_inner_texts()
    note('class options: ' + ' | '.join(opts[:15]))
    page.locator('input:visible').nth(0).fill('Fresh Runner')
    page.locator('input:visible').nth(1).fill(EMAIL)
    page.locator('input:visible').nth(2).fill('demo123')
    sel.first.select_option(label='Class 6') if 'Class 6' in opts else sel.first.select_option(index=1)
    page.screenshot(path=r'D:/platform/.studentA_tmp/fr2_form.png')
    page.locator('button[type="submit"]').first.click()
    page.wait_for_timeout(9000)
    note('url: ' + page.url)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    note('DASHBOARD LOADED: ' + body[:1100])
    page.screenshot(path=r'D:/platform/.studentA_tmp/fr2_dashboard.png', full_page=True)
    # identity + empty state checks
    for pat in [r'Good (evening|morning|afternoon), \w+', r'CLASS \d+', r'LV \d+', r'Total XP [\d,]+']:
        m = re.search(pat, body)
        note(f'  {pat}: {m.group(0) if m else "NOT FOUND"}')
    note('failing: ' + ' || '.join(failing[:8]))
    note('console: ' + ' || '.join(console[:5]))
    ctx.close(); b.close()
print('EMAIL:', EMAIL)
