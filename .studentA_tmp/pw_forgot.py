import sys, re
sys.path.insert(0, r'D:/platform/.studentA_tmp')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    ctx = b.new_context(viewport={'width':1366,'height':950})
    page = ctx.new_page()
    reqs=[]
    page.on('request', lambda r: reqs.append(f'{r.method} {r.url[:80]}') if '/api/' in r.url else None)
    resp=[]
    page.on('response', lambda r: resp.append(f'{r.status} {r.url[:80]}') if '/api/' in r.url else None)
    page.goto('http://localhost:3001/login', wait_until='domcontentloaded', timeout=120000)
    page.wait_for_timeout(2500)
    page.get_by_text(re.compile('Forgot password', re.I)).first.click()
    page.wait_for_timeout(3000)
    body = re.sub(r'\s+',' ', page.inner_text('body'))
    print('FORGOT VIEW:', body[:400])
    print('API calls:', reqs[:6], '| responses:', resp[:6])
    page.screenshot(path=r'D:/platform/.studentA_tmp/prod_forgot.png')
    ctx.close(); b.close()
